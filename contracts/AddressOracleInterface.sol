// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface AddressOracle {
   function resolve(string calldata youtube_video_id) external view returns(address);
}

