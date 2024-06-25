import { useEffect } from "react";
import { NavBar, PopUp } from "../../components";
import { useAccountStore, useUiStore } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { AccountLayout } from "../layout/AccountLayout";
import { Grid, IconButton } from "@mui/material";
import { NotAccount } from "../views/NotAccounts";
import { ListAccount } from "../views/ListAccount";
import { AccountModal } from "../components/AccountModal";
import { ProfileModal } from "../../auth/components/ProfileModal";
import { AccountBalanceWallet, Person2Outlined } from "@mui/icons-material";

export const AccountPage = ({ account }) => {
  const { startGetAccount } = useAccountStore();
  const { openProfileModal, openDateModal } = useUiStore();

  const { accounts, msgEmpty } = useSelector((state) => state.account);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    startGetAccount();
  }, []);

  const handleOnOpenProfileModal = () => {
    openProfileModal();
  };

  const handleOnOpenAcountModal = () => {
    openDateModal();
  };

  return (
    <AccountLayout>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {accounts?.length === 0 ? (
          <NotAccount msgEmpty={msgEmpty} />
        ) : (
          <ListAccount
            accounts={accounts}
            // inPage={account}
            // isComplete={isComplete}
          />
        )}
      </Grid>
      <AccountModal />
      <ProfileModal />
      <IconButton
        onClick={handleOnOpenProfileModal}
        disabled={false}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "#363636",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 110,
          bottom: 50,
        }}
      >
        <Person2Outlined sx={{ fontSize: 30 }} />
      </IconButton>
      {user.admin ? (
        <IconButton
          onClick={handleOnOpenAcountModal}
          disabled={false}
          size="large"
          sx={{
            color: "white",
            backgroundColor: "#363636",
            ":hover": { backgroundColor: "error.main", opacity: 0.9 },
            position: "fixed",
            right: 50,
            bottom: 50,
          }}
        >
          <AccountBalanceWallet sx={{ fontSize: 30 }} />
        </IconButton>
      ) : (
        ""
      )}
    </AccountLayout>
  );
};
