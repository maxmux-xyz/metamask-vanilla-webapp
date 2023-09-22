const { ethers } = require('ethers');

async function connect() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('We see metamask!');
        try {
            await ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
            console.log(error);
        }
        document.getElementById("connectButton").innerHTML = "Connected";
    } else {
        console.log('No metamask');
        document.getElementById("connectButton").innerHTML =
            "Please install MetaMask";
    }
}

async function execute() {
    // address
    factory_contract_address = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"

    // contract abi
    factory_contract_abi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "symbol",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "description",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "imageUrl",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "royaltyBPS",
                  "type": "uint256"
                }
              ],
              "internalType": "struct EditionData",
              "name": "data",
              "type": "tuple"
            }
          ],
          "name": "create",
          "outputs": [
            {
              "internalType": "address",
              "name": "editionAddress",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
    ]

    // function -> create
    // node connection -> metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(); // this is going to get the connected wallet
    const contract = new ethers.Contract(factory_contract_address, factory_contract_abi, signer);

    try {
        await contract.create({
            name: "frommetamask",
            symbol: "MET",
            description: "desc",
            imageUrl: "hello.jpg",
            royaltyBPS: 1000
        }).then((tx) => {
            console.log(tx);
        });
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    connect,
    execute,
};
