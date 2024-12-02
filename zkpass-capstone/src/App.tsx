/*import { type FormEvent, useEffect, useState } from "react";
import "./App.css";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import type { Result } from "@zkpass/transgate-js-sdk/lib/types";
import { ethers } from "ethers";


export type TransgateError = {
  message: string,
  code: number
}
const App = () => {
  const [appId, setAppId] = useState<string>("d51b9c86-a392-463a-b73c-1fc31e0f9df4");
  const [schemaId, setSchemaId] = useState<string>("135ea45a5d814769b29237fe75e8f37b");
  const [result, setResult] = useState<Result | undefined>(undefined);
  const requestVerifyMessage = async (
    e: FormEvent,
    appId: string,
    schemaId: string,
  ) => {
    e.preventDefault();
    try {
      const connector = new TransgateConnect(appId);
      const isAvailable = await connector.isTransgateAvailable();


      if (isAvailable) {
        const provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum) : null;
        const signer = await provider?.getSigner()
        const recipient = await signer?.getAddress()
        const res = (await connector.launch(schemaId, recipient)) as Result;
        console.log("Result", res);
       
        const verifiedResult = connector.verifyProofMessageSignature(
          "evm",
          schemaId,
          res
        );


        if (verifiedResult) {
          alert("Verified Result");
          setResult(res);
        }


} else {
        console.log(
          "Please install zkPass Transgate from https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma",
        );
      }
    } catch (error) {
      const transgateError = error as TransgateError;
      alert(`Transgate Error: ${transgateError.message}`);
      console.log(transgateError);
    }
  };
  function requestVerifyMessage(e: FormEvent<HTMLFormElement>, appId: string, schemaId: string): void {
    throw new Error("Function not implemented.");
  }


  return (
    <div className="app">
      <form
        className="form"
        onSubmit={(e) => requestVerifyMessage(e, appId, schemaId)}
      >
        <label htmlFor="app-id">
          AppId:
          <input
            id="app-id"
            type="text"
            placeholder="Your App ID"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
          />
        </label>
        <label htmlFor="schema-id">
          SchemaId:
          <input
            id="schema-id"
            type="text"
            placeholder="Your App ID"
            value={schemaId}
            onChange={(e) => setSchemaId(e.target.value)}
          />
        </label>
        <button type="submit">Start Verification</button>
        {result !== undefined ? (
          <pre>Result: {JSON.stringify(result, null, 2)}</pre>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}


export default App;*/

import { type FormEvent, useEffect, useState } from "react";
import "./App.css";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import type { Result } from "@zkpass/transgate-js-sdk/lib/types";
import { ethers } from "ethers";
import { useReadGetSecretGetSecret, useWriteGetSecretAssignSecret } from "./generated";
import { readContract } from "viem/actions";

export type TransgateError = {
	message: string;
	code: number;
};

export type Proof = {
	taskId: `0x${string}`,
	schemaId: `0x${string}`,
	uHash: `0x${string}`,
	recipient: `0x${string}`,
	publicFieldsHash: `0x${string}`,
	validator: `0x${string}`,
	allocatorSignature: `0x${string}`,
	validatorSignature: `0x${string}`
}

const contractAddress = "";

const App = () => {
	let chainParams: Proof;
	const [appId, setAppId] = useState<string>(
		"xxxxxx",
	);
	const [schemaId, setSchemaId] = useState<string>(
		"xxxxxx",
	);
	const [result, setResult] = useState<Result | undefined>(undefined);
	const [secret, setSecret] = useState<string | undefined>("0x");
	const { writeContractAsync, isPending } = useWriteGetSecretAssignSecret();
	const { data, isPending: isPendingRead, refetch } = useReadGetSecretGetSecret({
		address: contractAddress
	});

	useEffect(() => {
		if (!isPending || !isPendingRead) {
			setSecret(data ?? "");
		}
	}, [isPending, data])


	const requestVerifyMessage = async (
		e: FormEvent,
		appId: string,
		schemaId: string,
	) => {
		e.preventDefault();
		try {
			const connector = new TransgateConnect(appId);
			const isAvailable = await connector.isTransgateAvailable();

			if (isAvailable) {
				const provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum) : null;
				const signer = await provider?.getSigner()
				const recipient = await signer?.getAddress()
				const res = (await connector.launch(schemaId, recipient)) as Result;
				console.log("Result", res);

				const validatedResult = connector.verifyProofMessageSignature(
					"evm",
					schemaId,
					res
				);

				if (validatedResult) {
					alert("Validated Result");
					console.log(res);
					setResult(res);
					const taskId = ethers.hexlify(ethers.toUtf8Bytes(res.taskId)) as `0x${string}` // to hex
					const schemaIdHex = ethers.hexlify(ethers.toUtf8Bytes(schemaId)) as `0x${string}`// to hex
					if (recipient) {
						chainParams = {
							taskId,
							schemaId: schemaIdHex,
							uHash: res.uHash as `0x${string}`,
							recipient: recipient as `0x${string}`,
							publicFieldsHash: res.publicFieldsHash as `0x${string}`,
							validator: res.validatorAddress as `0x${string}`,
							allocatorSignature: res.allocatorSignature as `0x${string}`,
							validatorSignature: res.validatorSignature as `0x${string}`,
						}
						await writeContractAsync({
							address: contractAddress,
							args: [chainParams]
						});
						await refetch();
					}
				}

			} else {
				console.log(
					"Please install zkPass Transgate from https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma",
				);
			}
		} catch (error) {
			const transgateError = error as TransgateError;
			alert(`Transgate Error: ${transgateError.message}`);
			console.log(transgateError);
		}
	};

	return (
		<div className="app">
			<form
				className="form"
				onSubmit={(e) => requestVerifyMessage(e, appId, schemaId)}
			>
				<label htmlFor="app-id">
					AppId:
					<input
						id="app-id"
						type="text"
						placeholder="Your App ID"
						value={appId}
						onChange={(e) => setAppId(e.target.value)}
					/>
				</label>
				<label htmlFor="schema-id">
					SchemaId:
					<input
						id="schema-id"
						type="text"
						placeholder="Your App ID"
						value={schemaId}
						onChange={(e) => setSchemaId(e.target.value)}
					/>
				</label>
				<button type="submit">Start Verification</button>
				{result !== undefined ? (<>
					<pre>Result: {JSON.stringify(result, null, 2)}</pre>
					<h1>Secret: {secret}</h1>
				</>) : (
					""
				)}
			</form>
		</div>
	);
};

export default App;