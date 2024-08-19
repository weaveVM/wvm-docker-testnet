// app.js
const {Web3} = require('web3');
const fs = require('fs');
const web3 = new Web3('http://localhost:8545');

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

const CONTRACTS_TO_TEST = [
    'ar-writer',
    'ar-reader',
    'ar-read-block'
];

// Creating a signing account from a private key
const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_KEY);
web3.eth.accounts.wallet.add(signer);

const testContract = async (test) => {
    const abi = JSON.parse(fs.readFileSync(`./contracts/${test}/${test}.abi`).toString());
    const bytecode = '0x' + fs.readFileSync(`./contracts/${test}/${test}.bin`).toString();
    const contract = new web3.eth.Contract(abi);
    const testData = JSON.parse(fs.readFileSync(`./contracts/${test}/test.json`).toString());

    const runTest = async (contractAddress) => {
        const contractInstance = new web3.eth.Contract(abi, contractAddress);
        for (test of testData) {
            let call;
            if(test.args.length) {
                call = await contractInstance.methods[test.method](...test.args).call();
            } else {
                call = await contractInstance.methods[test.method]().call();

            }
            if(test.expected !== null) {
                if (call !== test.expected) {
                    throw new Error(`Invalid test result. Expected: ${test.expected}. Real: ${call}`);
                }
            }
        }
    }

    // Deploy the contract
    await contract.deploy({ data: bytecode }).send({ from: signer.address, gas: 3000000 })
        .on('receipt', (receipt) => {
            const address = receipt.contractAddress;
            if(!address) {
                throw new Error("Invalid deployment");
            }
            console.log(`Contract '${test}' deployed at address:`, address);
            runTest(address)
        })
        .on('error', (error) => {
            console.error('Error deploying contract:', error);
        });

}


(async () => {

    for (let test of CONTRACTS_TO_TEST) {
        await testContract(test);
    }

})();
