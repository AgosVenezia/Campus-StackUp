// Copyright (c) Zefchain Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

use linera_sdk::base::{Amount, Owner};
use linera_sdk::views::{linera_views, MapView, RootView, ViewStorageContext};
use thiserror::Error;

#[derive(RootView)]
#[view(context = "ViewStorageContext")]
pub struct FungibleToken {
    pub accounts: MapView<Owner, Amount>,
}

#[allow(dead_code)]
impl FungibleToken {
    // INSERT fn initialize_accounts CODE HERE
    pub async fn initialize_accounts(&mut self, account: Owner, amount: Amount) {
        self.accounts
            .insert(&account, amount)
            .expect("Error in insert statement")
    }

    // INSERT fn balance CODE HERE
    pub async fn balance(&self, account: &Owner) -> Amount {
        self.accounts
            .get(account)
            .await
            .expect("Failure in the retrieval")
            .unwrap_or(Amount::ZERO)
    }

    // INSERT fn credit CODE HERE
    pub async fn credit(&mut self, account: Owner, amount: Amount) {
        let mut balance = self.balance(&account).await;
        balance.saturating_add_assign(amount);
        self.accounts
            .insert(&account, balance)
            .expect("Failed to insert");
    }

    // INSERT fn debit CODE HERE
    pub async fn debit(
        &mut self,
        account: Owner,
        amount: Amount,
    ) -> Result<(), InsufficientBalanceError> {
        let mut balance = self.balance(&account).await;
        balance
            .try_sub_assign(amount)
            .map_err(|_| InsufficientBalanceError)?;
        self.accounts
            .insert(&account, balance)
            .expect("Failed to insert");
        Ok(())
    }
}

// INSERT InsufficientBalanceError CODE HERE
#[derive(Clone, Copy, Debug, Error)]
#[error("Insufficient balance for transfer")]
pub struct InsufficientBalanceError;
