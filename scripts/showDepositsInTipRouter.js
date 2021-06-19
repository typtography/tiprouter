const MyToken = artifacts.require("MyToken")
const TipRouter = artifacts.require("TipRouter")
const MockOracle = artifacts.require("MockOracle")

module.exports = async function (callback) {
  console.log("starting")

  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const tipRouter = await TipRouter.deployed()
  const mockOracle = await MockOracle.deployed()
  
  console.log("imports done")



  balanceMyTokenTipRouter = await myToken.balanceOf(tipRouter.address)
  console.log(
    "Balance MyToken Before TipRouter " +
      web3.utils.fromWei(balanceMyTokenTipRouter.toString())
  )

  console.log("******")
  deposit_ix = 0
  console.log("Current deposits")
  while (deposit_ix >= 0) {
    try {
      deposit = await tipRouter.deposits(deposit_ix)
      console.log("Index " + deposit_ix.toString() + ":")
      console.log(deposit)
      console.log()
      deposit_ix ++
    } catch {
      deposit_ix = -1
    }
  }

  callback()
}

