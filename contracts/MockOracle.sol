// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AddressOracleInterface.sol";

contract MockOracle is AddressOracle {

    address mock_address = 0x1C2904644e3f9910E852F2873B87a77b13CC1473;

    function resolve(string calldata youtube_video_id) public view override returns(address) {
        return mock_address;
    }

}


