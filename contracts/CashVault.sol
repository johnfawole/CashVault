// the idea of the contract is that users should be able to:

// * lockup funds for up to 12 months
// * automatically save money
// * save money on the go
// to be deployed on Scroll


pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CashVault {
    IERC20 public token;

    struct Lockup {
        uint256 amount;
        uint256 unlockTime;
    }

    struct AutomaticSaving {
        uint256 amount;
        uint256 interval;
        uint256 lastSaved;
    }

    mapping(address => Lockup) public lockups;
    mapping(address => AutomaticSaving) public automaticSavings;
    mapping(address => uint256) public onTheGoSavings;

    event LockedUp(address indexed user, uint256 amount, uint256 unlockTime);
    event SavedOnTheGo(address indexed user, uint256 amount);
    event AutomaticSavingSet(address indexed user, uint256 amount, uint256 interval);
    event AutomaticSaved(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    constructor(IERC20 _token) {
        token = _token;
    }

    function lockupFunds(uint256 amount, uint256 months) external {
        require(months > 0 && months <= 12, "Lockup period must be between 1 and 12 months");

        uint256 unlockTime = block.timestamp + (months * 30 days);
        lockups[msg.sender] = Lockup(amount, unlockTime);

        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");

        emit LockedUp(msg.sender, amount, unlockTime);
    }

    function saveOnTheGo(uint256 amount) external {
        onTheGoSavings[msg.sender] += amount;

        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");

        emit SavedOnTheGo(msg.sender, amount);
    }

    function handleAutomaticSaving(uint256 amount, uint256 interval) external {
        require(interval == 1 days || interval == 7 days || interval == 30 days, "Invalid interval");

        AutomaticSaving storage saving = automaticSavings[msg.sender];

        if (saving.amount == 0) {
            automaticSavings[msg.sender] = AutomaticSaving(amount, interval, block.timestamp);
            emit AutomaticSavingSet(msg.sender, amount, interval);
        } else {
            require(block.timestamp >= saving.lastSaved + saving.interval, "Too early to save");

            saving.lastSaved = block.timestamp;
            require(token.transferFrom(msg.sender, address(this), saving.amount), "Token transfer failed");

            emit AutomaticSaved(msg.sender, saving.amount);
        }
    }

    function withdrawLockedFunds() external {
        uint256 totalAmount = 0;

        // Withdraw locked funds
        Lockup storage lockup = lockups[msg.sender];
        if (block.timestamp >= lockup.unlockTime && lockup.amount > 0) {
            totalAmount += lockup.amount;
            lockup.amount = 0;
        }

        // Withdraw on-the-go savings
        if (onTheGoSavings[msg.sender] > 0) {
            totalAmount += onTheGoSavings[msg.sender];
            onTheGoSavings[msg.sender] = 0;
        }

        // Withdraw automatic savings
        AutomaticSaving storage saving = automaticSavings[msg.sender];
        if (saving.amount > 0) {
            totalAmount += saving.amount;
            saving.amount = 0;
        }

        require(totalAmount > 0, "No funds to withdraw");

        require(token.transfer(msg.sender, totalAmount), "Token transfer failed");

        emit Withdrawn(msg.sender, totalAmount);
    }
}