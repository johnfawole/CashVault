// the idea of the contract is that users should be able to:

// * lockup funds for up to 12 months
// * automatically save money
// * save money on the go



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

    

}

