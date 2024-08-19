pragma solidity ^0.8.0;

contract WeaveVmBlockReader {
    function read_block() public view returns (bytes memory) {
        // Convert the string parameter to bytes
        string memory blockIdAndField = "141550;hash";
        bytes memory data = abi.encodePacked(blockIdAndField);

        (bool success, bytes memory result) = address(0x20).staticcall(data);

        return result;
    }
}