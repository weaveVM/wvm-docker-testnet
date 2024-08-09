pragma solidity ^0.8.0;

contract ArweaveUploader {
    function upload_to_arweave() public view returns (bytes memory) {

        bytes memory data = "Hello World From WeaveVM";
        // pc address: 0x0000000000000000000000000000000000000017
        (bool success, bytes memory result) = address(0x17).staticcall(data);
        require(success, "Arweave upload failed");

        return result;
    }
}