import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    page: 1,
    pages: 1,
    limit: 10,
    count: 0,
    sort: `-1`,
    sortBy: `created`,
    accounts: [],
    active: null,
    alert: "",
    status: "created",
    msgEmty: "No hay cuentas registradas",
  },
  reducers: {
    onGetAccounts: (status, { payload }) => {
      status.accounts = payload.cuentas;
      status.pages = payload.pages;
      status.page = payload.page;
      status.count = payload.count;
    },
    onActiveAccount: (state, { payload }) => {
      state.active = payload;
    },
    onAddNewAccount: (state, { payload }) => {
      state.accounts.push(payload);
      state.active = null;
    },
    onUpdateAccount: (state, { payload }) => {
      state.accounts = state.accounts.map((account) => {
        if (account.id === payload.id) {
          return payload;
        }
        return account;
      });
    },
    onDeleteAccount: (state, { payload }) => {
      state.active = null;
      state.accounts = state.accounts.filter(
        (account) => account.id !== payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onGetAccounts,
  onActiveAccount,
  onAddNewAccount,
  onUpdateAccount,
  onDeleteAccount,
} = accountSlice.actions;
