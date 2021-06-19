const MyToken = artifacts.require("MyToken")
const TipRouter = artifacts.require("TipRouter")
const MockOracle = artifacts.require("MockOracle")

module.exports = async function (callback) {
  console.log("starting")

  const accounts = await new web3.eth.getAccounts()
  const tipRouter = await TipRouter.deployed()
  
  console.log("imports done")

  deposit_ix = 0
  console.log("Current deposits (before resolving)")
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

  console.log("")
  console.log("RESOLVING ADRESSES")
  console.log("")

  tipRouter.resolve_all_recipient_addresses()

  console.log("done")

  callback()
}

