require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || 'https://eth-ropsten.alchemyapi.io/v2/YOUR_API_KEY',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};