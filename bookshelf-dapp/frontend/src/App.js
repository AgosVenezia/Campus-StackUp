import { createThirdwebClient, getContract } from "thirdweb";
// We need this for our RPC. We have to tell our ThirdWeb SDK
// that our smart contracts are deployed to Hardhat testnet for our transactions
import { hardhat } from "thirdweb/chains";
// This is needed, the ConnectEmbed has an embeeded Wallet Modal
import { ConnectEmbed, ThirdwebProvider } from "thirdweb/react";
// Used to define our wallets. Feel free to experiment after
// this
import { createWallet } from "thirdweb/wallets";

// We need this for our ABI so that it can be used
// for our getContract function to export our smart contracts
// to our JS code
import contractData from "./contracts/BookShelf.json";

// This is needed to use ThirdWeb SDK
const client = createThirdwebClient({
	// We will use the value from our `.env.local`
	clientId: process.env.REACT_APP_CLIENT_ID,
});

// Install this wallets later for experimental purposes
// We will be using Metamask for the most part
const wallets = [
	createWallet("io.metamask"),
	createWallet("app.phantom"),
	createWallet("me.rainbow"),
];

// Our first smart contract on the network
const contract1 = getContract({
	client,
	chain: hardhat,
	address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
	abi: contractData.abi,
});

// Our second smart contract on the network
const contract2 = getContract({
	client,
	chain: hardhat,
	address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
	abi: contractData.abi,
});

const AppBase = () => {
	return <h1>BookShelf</h1>;
};

const App = () => {
	// We need to pass the variables here for ConnectEmbed, otherwise, this will error.
	return (
		<div className="container">
			<ThirdwebProvider>
				<AppBase />
				<ConnectEmbed
					chain={hardhat}
					modalSize={"wide"}
					client={client}
					wallets={wallets}
				/>
			</ThirdwebProvider>
		</div>
	);
};

export default App;