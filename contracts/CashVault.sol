// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

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

    mapping(address => Lockup) public lockups;
    mapping(address => AutomaticSaving) public automaticSavings;
    mapping(address => uint256) public onTheGoSavings;

    event LockedUp(address indexed user, uint256 amount, uint256 unlockTime);
    event SavedOnTheGo(address indexed user, uint256 amount);
    event AutomaticSavingSet(address indexed user, uint256 amount, uint256 interval);
    event AutomaticSaved(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    function lockupFunds(uint256 months) external payable {
        require(months > 0 && months <= 12, "Lockup period must be between 1 and 12 months");
        require(msg.value > 0, "Amount must be greater than 0");

        uint256 unlockTime = block.timestamp + (months * 30 days);
        lockups[msg.sender] = Lockup(msg.value, unlockTime);

        emit LockedUp(msg.sender, msg.value, unlockTime);
    }

    function saveOnTheGo() external payable {
        require(msg.value > 0, "Amount must be greater than 0");

        onTheGoSavings[msg.sender] += msg.value;

        emit SavedOnTheGo(msg.sender, msg.value);
    }

    function handleAutomaticSaving(uint256 amount, uint256 interval) external payable {
        require(interval == 1 days || interval == 7 days || interval == 30 days, "Invalid interval");
        require(msg.value == amount, "Amount mismatch");

        AutomaticSaving storage saving = automaticSavings[msg.sender];

        if (saving.amount == 0) {
            automaticSavings[msg.sender] = AutomaticSaving(amount, interval, block.timestamp);
            emit AutomaticSavingSet(msg.sender, amount, interval);
        } else {
            require(block.timestamp >= saving.lastSaved + saving.interval, "Too early to save");

            saving.lastSaved = block.timestamp;

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

        payable(msg.sender).transfer(totalAmount);

        emit Withdrawn(msg.sender, totalAmount);
    }
}