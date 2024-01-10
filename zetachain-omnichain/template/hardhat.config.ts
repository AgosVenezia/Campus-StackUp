import "./tasks/stake";
import "./tasks/claim";
import "./tasks/unstake";
import "./tasks/beneficiary";
import "./tasks/withdraw";
import "./tasks/unstake";
import "./tasks/address";
import "./tasks/deploy";
import "@nomicfoundation/hardhat-toolbox";
import "@zetachain/toolkit/tasks";

import { getHardhatConfigNetworks } from "@zetachain/networks";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  networks: {
    ...getHardhatConfigNetworks(),
  },
  solidity: "0.8.7",
};

export default config;