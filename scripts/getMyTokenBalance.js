const MyToken = artifacts.require("MyToken")
const TipRouter = artifacts.require("TipRouter")

module.exports = async function (callback) {
    const accounts = await new web3.eth.getAccounts()
    myToken = await MyToken.deployed()
    tipRouter = await TipRouter.deployed()

    balance = await myToken.balanceOf(tipRouter.address)
    console.log("Balance of tipRouter: " + web3.utils.fromWei(balance.toString()))

    for (let i = 0; i < accounts.length; i++){
        balance = await myToken.balanceOf(accounts[i])
        console.log("Balance of account " + i.toString() + ": " + web3.utils.fromWei(balance.toString()))
    }

    callback()
}
