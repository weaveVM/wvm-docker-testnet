pragma solidity ^0.8.0;

contract WeaveKyve {
    function read_kyve_blob() public view returns (bytes memory) {
        // Convert the string parameter to bytes
        string memory blockIdAndField = "20033062;0.slot";
        bytes memory data = abi.encodePacked(blockIdAndField);

        (bool success, bytes memory result) = address(0x21).staticcall(data);

        return result;
    }
}