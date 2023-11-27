const { ApolloServer } = require("apollo-server"); // Import Apollo Server
const { importSchema } = require("graphql-import"); // Import graphql-import to load schema
const EtherDataSource = require("./datasource/ethDatasource"); // Import custom data source

const typeDefs = importSchema("./schema.graphql"); // Load schema

require("dotenv").config(); // Load environment variables

// Previous code

/*const resolvers = {
  Query: {
    getEthByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),
    getTotalSupplyEth: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),
    //Paste Code for New Resolver Functions
    getEthPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),
    getEstimationTimePerTransaction: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};*/

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Resolver to get ether balance
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Resolver to get total ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Resolver to get latest ether price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Resolver to get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({ // Create Apollo Server
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Instantiate data source
  }),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => { // Start server on port 9000
  console.log(`🚀 Server ready at ${url}`);
});
