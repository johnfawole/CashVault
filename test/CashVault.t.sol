// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../contracts/CashVault.sol";

contract CashVaultTest is Test {
    CashVault public cashVault;
    address public user = address(0x123);

    function setUp() public {
        cashVault = new CashVault();
        vm.deal(user, 10 ether); // Fund the user with 10 ETH
    }

    function testLockupFunds() public {
        vm.startPrank(user);
        uint256 months = 6;
        uint256 amount = 1 ether;

        cashVault.lockupFunds{value: amount}(months);

        (uint256 lockedAmount, uint256 unlockTime) = cashVault.lockups(user);
        assertEq(lockedAmount, amount);
        assertEq(unlockTime, block.timestamp + (months * 30 days));

        vm.stopPrank();
    }

    function testSaveOnTheGo() public {
        vm.startPrank(user);
        uint256 amount = 0.5 ether;

        cashVault.saveOnTheGo{value: amount}();

        uint256 savedAmount = cashVault.onTheGoSavings(user);
        assertEq(savedAmount, amount);

        vm.stopPrank();
    }

    function testHandleAutomaticSaving() public {
        vm.startPrank(user);
        uint256 amount = 0.2 ether;
        uint256 interval = 7 days;

        cashVault.handleAutomaticSaving{value: amount}(amount, interval);

        (uint256 savedAmount, uint256 savedInterval, uint256 lastSaved) = cashVault.automaticSavings(user);
        assertEq(savedAmount, amount);
        assertEq(savedInterval, interval);
        assertEq(lastSaved, block.timestamp);

        vm.stopPrank();
    }

    function testSetDollarCostAveraging() public {
        vm.startPrank(user);
        uint256 amount = 0.3 ether;
        uint256 interval = 30 days;

        cashVault.setDollarCostAveraging{value: amount}(amount, interval);

        (uint256 dcaAmount, uint256 dcaInterval, uint256 lastExecuted) = cashVault.dollarCostAveragings(user);
        assertEq(dcaAmount, amount);
        assertEq(dcaInterval, interval);
        assertEq(lastExecuted, block.timestamp);

        vm.stopPrank();
    }

    function testExecuteDollarCostAveraging() public {
        vm.startPrank(user);
        uint256 amount = 0.3 ether;
        uint256 interval = 30 days;

        cashVault.setDollarCostAveraging{value: amount}(amount, interval);
        vm.warp(block.timestamp + interval); // Fast forward time

        cashVault.executeDollarCostAveraging();

        (uint256 dcaAmount, uint256 dcaInterval, uint256 lastExecuted) = cashVault.dollarCostAveragings(user);
        assertEq(lastExecuted, block.timestamp);

        vm.stopPrank();
    }

    function testWithdrawLockedFunds() public {
        vm.startPrank(user);
        uint256 lockupAmount = 1 ether;
        uint256 saveAmount = 0.5 ether;
        uint256 autoSaveAmount = 0.2 ether;
        uint256 interval = 7 days;

        cashVault.lockupFunds{value: lockupAmount}(6);
        cashVault.saveOnTheGo{value: saveAmount}();
        cashVault.handleAutomaticSaving{value: autoSaveAmount}(autoSaveAmount, interval);

        vm.warp(block.timestamp + (6 * 30 days)); // Fast forward time

        uint256 initialBalance = user.balance;
        cashVault.withdrawLockedFunds();
        uint256 finalBalance = user.balance;

        assertEq(finalBalance, initialBalance + lockupAmount + saveAmount + autoSaveAmount);

        vm.stopPrank();
    }
}