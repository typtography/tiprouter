const MockOracle = artifacts.require("MockOracle")

module.exports = async function (deployer, network, accounts) {
    // Deploy TipRouter
    await deployer.deploy(MockOracle)
    const mockOracle = await MockOracle.deployed()
}

