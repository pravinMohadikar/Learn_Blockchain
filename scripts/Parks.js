const hre = require("hardhat");

async function main() {
    const ParksToken = await hre.ethers.getContractFactory("Parks");
    const parksToken = await ParksToken.deploy(100000000, 50);

    await parksToken.deployed();

    console.log("Parks Token deployed: ", parksToken.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});