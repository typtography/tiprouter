const MyToken = artifacts.require("MyToken")
const TipRouter = artifacts.require("TipRouter")

module.exports = async function (callback) {
    myToken = await MyToken.deployed()
    tipRouter = await TipRouter.deployed()
    balance = await myToken.balanceOf(tipRouter.address)
    console.log(web3.utils.fromWei(balance.toString()))
    callback()
}
