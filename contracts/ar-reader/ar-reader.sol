pragma solidity ^0.8.0;

contract ArweaveReader {
    function read_from_arweave(string memory txIdOrGatewayAndTxId) public view returns (bytes memory) {
        // Convert the string parameter to bytes
        bytes memory data = abi.encodePacked(txIdOrGatewayAndTxId);

        // pc address: 0x0000000000000000000000000000000000000018
        (bool success, bytes memory result) = address(0x18).staticcall(data);

        return result;
    }
}