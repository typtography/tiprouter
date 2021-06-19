const TipRouter = artifacts.require("TipRouter")

module.exports = async function (deployer, network, accounts) {
    // Deploy TipRouter
    await deployer.deploy(TipRouter)
    const tipRouter = await TipRouter.deployed()
}

