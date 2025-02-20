// the idea of the contract is that users should be able to:

// * lockup funds for up to 12 months
// * automatically save money
// * save money on the go
// to be deployed on Scroll



pragma solidity 0.8.28;

contract CashVault {

    struct Lockup {
        uint256 amount;
        uint256 unlockTime;
    }

    struct AutomaticSaving {
        uint256 amount;
        uint256 interval;
        uint256 lastSaved;
    }

    mapping (address => Lockup) public lockups;
    mapping (address => AutomaticSaving) public automaticSavings;
    mapping (address => uint256) public onTheGoSavings;
   
    event LockedUp(address indexed user, uint256 amount, uint256 unlockTime);
    event SavedOnTheGo(address indexed user, uint256 amount);
    event AutomaticSavingSet(address indexed user, uint256 amount, uint256 interval);
    event AutomaticSaved(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    
    function lockupFunds(uint256 amount, uint256 months) external payable {
        require(months > 0 && months <= 12, "Lockup period must be betweetn  and 12");
        require(msg.value == amount, "amount mismatch");

        uint256 unlockTime = block.timestamp + (months * 30 days);
        lockups[msg.sender] = Lockup(amount, unlockTime);

        emit LockedUp(user, amount, unlockTime);
    }

    function saveOnTheGo(uint256 amount) external payable {
        require(msg.valule == amount, "amount mismatch");

        onTheGoSavings[msg.sender] += amount;

        emit SavedOnTheGo(user, amount);
    }

    function handleAutomaticSaving(uint256 amount, uint256 interval) external payable {
        require(interval == 1 days || interval == 7 days || interval = 30 days, "invalid interval");

        AutomaticSaving storage saving = automaticSavings[msg.sender];

        if (saving.amount == 0) {
            automaticSavings[msg.sender] = AutomaticSaving(amount, interval, block.timestamp);
            emit AutomaticSavingSet(msg.sender, amount, interval);
        } else {
            require(block.timestamp >= saving.lastSaved + saving.interval, "Too early");
            require(msg.value == saving.amount, "amount mismatch");

            saving.lastSaved = block.timestamp;
            emit AutomaticSaved(msg.sender, saving.amount);
        }

    }

            function withdrawLockedFunds() external {
            uint256 totalAmount = 0;

            Lockup storage lockup = lockups[msg.sender];
            if(block.timestamp >= lockup.unlockTime && lockup.amount > 0) {
                totalAmount += lockup.amount;
                lockup.amount = 0;
            }

            if (onTheGoSavings[msg.sender] > 0) {
                totalAmount += onTheGoSavings[msg.sender];
                onTheGoSavings[msg.sender] = 0;
            }

            require(totalAmount > 0, "No funds to withdraw");
            payable(msg.sender).transfer(totalAmount);
            emit Withdrawn(msg.sender, totalAmount);
        }
}

