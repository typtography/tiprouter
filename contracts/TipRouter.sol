// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./AddressOracleInterface.sol";



contract TipRouter {
    using SafeERC20 for IERC20;

    enum RouterState {
        OPEN,
        CLOSED
    }

    RouterState public _routerState  = RouterState.CLOSED;

    modifier routerOpen() {
        require(
            _routerState == RouterState.OPEN,
            "Router is not open."
        );
        _;
    }

    enum State {
        RECEIVED,
        RESOLVED,
        DISPATCHED,
        REFUNDED
    }

    struct Deposit {
        address token;
        uint256 amount;
        address sender;
        address oracle;
        string youtube_video_id;
        address recipient;
    }

    Deposit[] public deposits;

    event DepositReceived(Deposit);
    event AddressResolved(address address_oracle, string youtube_video_id, address recipient);
    event DepositPayedOut(Deposit);
    event DepositRefunded(Deposit);

    function deposit(
        address _token,
        uint256 _amount,
        address address_oracle,
        string calldata youtube_video_id
    ) public {

        // Amount must be greater than zero
        require(_amount > 0, "amount cannot be 0");

        // Transfer MyToken to smart contract
        IERC20 token = IERC20(_token);
        token.safeTransferFrom(msg.sender, address(this), _amount);

        Deposit memory dp = Deposit(
            _token, _amount, msg.sender, address_oracle, youtube_video_id, address(0)
        );

        deposits.push(dp);
    }

    function refund_all_outstanding_deposits() public {
        for (uint i=0; i<deposits.length; i++) {
            Deposit storage dp = deposits[i];
            if (dp.sender == msg.sender) {
                IERC20 token = IERC20(dp.token);
                token.safeTransfer(msg.sender, dp.amount);
                dp.amount = 0;
            }
        }
    }

    function resolve_all_recipient_addresses() public {
        for (uint i=0; i<deposits.length; i++) {
            Deposit storage dp = deposits[i];
            AddressOracle oracle = AddressOracle(dp.oracle);
            dp.recipient = oracle.resolve(dp.youtube_video_id);
        }
    }

    function dispatch_all_deposits() public {
        for (uint i=0; i<deposits.length; i++) {
            Deposit storage dp = deposits[i];
            if (dp.recipient != address(0)) {
                IERC20 token = IERC20(dp.token);
                dp.amount = 0;
                token.safeTransfer(dp.recipient, dp.amount);
            }
        }
    }

    function delete_all_deposits() public {
        delete deposits;
    }

    function pop_empty_deposits() public {
        uint i = 0;
        while (i < deposits.length) {
            if (deposits[deposits.length - 1].amount == 0) {
                deposits.pop();
            } else if (deposits[i].amount != 0) {
                i++;
            } else {
                deposits[i] = deposits[deposits.length - 1];
                deposits.pop();
                i++;
            }
        }
    }

}

