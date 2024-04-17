// Copyright (c) Zefchain Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

#![cfg_attr(target_arch = "wasm32", no_main)]

mod state;

use self::state::FungibleToken;
use async_trait::async_trait;
use fungible::{Account, Message, Operation};
use linera_sdk::base::{Amount, Owner};
use linera_sdk::{base::WithContractAbi, Contract, ContractRuntime, ViewStateStorage};
use thiserror::Error;

linera_sdk::contract!(FungibleTokenContract);

impl WithContractAbi for FungibleTokenContract {
    type Abi = fungible::FungibleAbi;
}

pub struct FungibleTokenContract {
    state: FungibleToken,
    runtime: ContractRuntime<Self>,
}

#[async_trait]
impl Contract for FungibleTokenContract {
    type Error = Error;
    type Storage = ViewStateStorage<Self>;
    type State = FungibleToken;
    type Message = Message;

    async fn new(
        state: FungibleToken,
        runtime: ContractRuntime<Self>,
    ) -> Result<Self, Self::Error> {
        Ok(FungibleTokenContract { state, runtime })
    }

    fn state_mut(&mut self) -> &mut Self::State {
        &mut self.state
    }

    // INSERT fn initialize CODE HERE
    async fn initialize(
        &mut self,
        amount: Self::InitializationArgument,
    ) -> Result<(), Self::Error> {
        // Validate that the application parameters were configured correctly.
        let _ = self.runtime.application_parameters();

        if let Some(owner) = self.runtime.authenticated_signer() {
            self.state.initialize_accounts(owner, amount).await;
        }
        Ok(())
    }

    // INSERT fn execute_operation CODE HERE
    async fn execute_operation(
        &mut self,
        operation: Self::Operation,
    ) -> Result<Self::Response, Self::Error> {
        match operation {
            Operation::Transfer {
                owner,
                amount,
                target_account,
            } => {
                self.check_account_authentication(owner)?;
                self.state.debit(owner, amount).await?;
                self.finish_transfer_to_account(amount, target_account)
                    .await;
                Ok(())
            }
        }
    }

    // INSERT fn execute_message CODE HERE
    async fn execute_message(&mut self, message: Message) -> Result<(), Self::Error> {
        match message {
            Message::Credit { amount, owner } => {
                self.state.credit(owner, amount).await;
                Ok(())
            }
        }
    }
}

impl FungibleTokenContract {
    // INSERT fn check_account_authentication CODE HERE
    /// Verifies that a transfer is authenticated for this local account.
    fn check_account_authentication(&mut self, owner: Owner) -> Result<(), Error> {
        if self.runtime.authenticated_signer() == Some(owner) {
            Ok(())
        } else {
            Err(Error::IncorrectAuthentication)
        }
    }

    // INSERT fn finish_transfer_to_account CODE HERE
    /// Executes the final step of a transfer where the tokens are sent to the destination.
    async fn finish_transfer_to_account(&mut self, amount: Amount, account: Account) {
        if account.chain_id == self.runtime.chain_id() {
            self.state.credit(account.owner, amount).await;
        } else {
            let message = Message::Credit {
                owner: account.owner,
                amount,
            };
            self.runtime
                .prepare_message(message)
                .with_authentication()
                .send_to(account.chain_id);
        }
    }
}

// INSERT enum Error CODE HERE
/// An error that can occur during the contract execution.
#[derive(Debug, Error)]
pub enum Error {
    /// Failed to deserialize BCS bytes
    #[error("Failed to deserialize BCS bytes")]
    BcsError(#[from] bcs::Error),

    /// Failed to deserialize JSON string
    #[error("Failed to deserialize JSON string")]
    JsonError(#[from] serde_json::Error),

    #[error("Incorrect Authentication")]
    IncorrectAuthentication,

    #[error("Insufficient Balance")]
    InsufficientBalance(#[from] state::InsufficientBalanceError),
}

#[cfg(test)]
#[cfg(target_arch = "wasm32")]
pub mod tests {
    use super::*;
    use futures::FutureExt;
    use linera_sdk::views::{View, ViewStorageContext};
    use std::str::FromStr;

    use webassembly_test::webassembly_test;

    #[webassembly_test]
    pub fn init() {
        let initial_amount = Amount::from_str("50_000").unwrap();
        let fungible = create_and_init(initial_amount);
        assert_eq!(
            fungible.balance(&creator()).now_or_never().unwrap(),
            initial_amount
        )
    }

    fn create_and_init(amount: Amount) -> FungibleToken {
        linera_sdk::test::mock_key_value_store();
        let store = ViewStorageContext::default();
        let mut fungible_token = FungibleToken::load(store).now_or_never().unwrap().unwrap();

        fungible_token
            .initialize_accounts(creator(), amount)
            .now_or_never()
            .unwrap();

        fungible_token
    }

    fn creator() -> Owner {
        "1c02a28d03e846b113de238d8880df3c9c802143b73aea5d173466701bee1786"
            .parse()
            .unwrap()
    }
}
