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

  // Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom.
  // This is zero by default.
  const allowanceBefore = await myToken.allowance(accounts[0], tipRouter.address)
  console.log(
    "Amount of MyToken TipRouter is allowed to transfer on our behalf Before: " +
      allowanceBefore.toString()
  )

  // In order to allow the Smart Contract to transfer to MyToken (ERC-20) on the accounts[0] behalf,
  // we must explicitly allow it.
  // We allow tipRouter to transfer x amount of MyToken on our behalf
  await myToken.approve(tipRouter.address, web3.utils.toWei("100", "ether"))

  // Validate that the tipRouter can now move x amount of MyToken on our behalf
  const allowanceAfter = await myToken.allowance(accounts[0], tipRouter.address)
  console.log(
    "Amount of MyToken TipRouter is allowed to transfer on our behalf After: " +
      allowanceAfter.toString()
  )

  console.log("******")
  // Verify accounts[0] before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeTipRouter = await myToken.balanceOf(tipRouter.address)
  console.log("check deposits:")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TipRouter " +
      web3.utils.fromWei(balanceMyTokenBeforeTipRouter.toString())
  )

  console.log("******")
  // Call Deposit function from TipRouter
  console.log("Call Deposit Function")
  await tipRouter.deposit(myToken.address, web3.utils.toWei("100", "ether"), mockOracle.address, "")
  console.log("check deposits:")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterTipRouter = await myToken.balanceOf(tipRouter.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After " +
      web3.utils.fromWei(balanceMyTokenAfterTipRouter.toString())
  )

  // End function
  callback()
}

