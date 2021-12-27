# blockchain
Basic Blockchain Project

Download crypto library:
npm install --save crypto-js


Run program:
node main.js


Output Example:

{
    "chain": [
        {
            "index": 0,
            "timestamp": "27/12/2021",
            "data": "Genesis Block",
            "previousHash": "0",
            "hash": "b448372be49a14f64b803e7173723d51450c1f859122dcda2e628c81f78dd174"
        },
        {
            "index": 1,
            "timestamp": "27/12/2021",
            "data": {
                "amount": 5
            },
            "previousHash": "b448372be49a14f64b803e7173723d51450c1f859122dcda2e628c81f78dd174",
            "hash": "1646318ca997afa0616e6918d44446266b973ebb0517e2f97924dc44e1e3ca66"
        },
        {
            "index": 2,
            "timestamp": "27/12/2021",
            "data": {
                "amount": 15
            },
            "previousHash": "1646318ca997afa0616e6918d44446266b973ebb0517e2f97924dc44e1e3ca66",
            "hash": "f919d8423168604febe130516647f846f34170a92a2136a98c7da808c46a85a9"
        }
    ]
}
