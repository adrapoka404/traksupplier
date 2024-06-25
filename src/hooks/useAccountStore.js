import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  onActiveAccount,
  onGetAccounts,
  onAddNewAccount,
  onUpdateAccount,
  onDeleteAccount,
} from "../store";
import calendarApi from "../api/calendarApi";
import Swal from "sweetalert2";

export const useAccountStore = () => {
  const dispatch = useDispatch();
  const { active, accounts } = useSelector((state) => state.account);

  const startGetAccount = async () => {
    try {
      const { data } = await calendarApi.get("/accounts");

      dispatch(onGetAccounts(data));
    } catch (error) {
      console.log(error);
    }
  };

  const startGetPendingAccount = useCallback(async () => {
    try {
      const { data } = await calendarApi.get("/accounts?status=created");

      dispatch(onGetAccounts(data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const startGetPendingPayAccount = useCallback(async () => {
    try {
      const { data } = await calendarApi.get("/accounts?status=pending");

      dispatch(onGetAccounts(data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const startGetPaidAccount = useCallback(async () => {
    try {
      const { data } = await calendarApi.get("/accounts?status=paid");

      dispatch(onGetAccounts(data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const startGetCancelAccount = useCallback(async () => {
    try {
      const { data } = await calendarApi.get("/accounts?status=cancel");

      dispatch(onGetAccounts(data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const startActiveAccount = (account) => {
    dispatch(onActiveAccount(account));
  };

  const startSaveAccount = async (account) => {
    try {
      if (account.id) {
        const accountUpdated = await calendarApi.put(
          `/accounts/${account.id}`,
          account
        );
        dispatch(onUpdateAccount({ ...accountUpdated.data.cuenta }));
        Swal.fire(
          "Cuentas",
          `La cuenta ${account.title} se ha actualizado con exito`,
          "success"
        );
        return;
      }

      account.created = new Date();
      account.status = "created";
      const { data } = await calendarApi.post("/accounts", account);
      dispatch(onAddNewAccount({ ...account, _id: data._id }));
      startGetAccount();
    } catch (error) {
      console.log(error);
      Swal.fire("Cuentas", error, "error");
    }
  };

  const startCancelAccount = async (account) => {
    try {
      const asignedTo = account.asignedTo._id;
      const newAccount = {
        ...account,
        status: "cancel",
        asignedTo,
      };

      const accountUpdated = await calendarApi.put(
        `/accounts/${account.id}`,
        newAccount
      );

      dispatch(onUpdateAccount({ ...accountUpdated }));
      Swal.fire(
        "Cuentas",
        `La cuenta ${account.title} se ha cancelado con exito`,
        "success"
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Cuentas", error.response.data.msg, "error");
    }
  };

  const startDeleteAccount = async (account) => {
    try {
      await calendarApi.delete(`/accounts/${account.id}`);

      dispatch(onDeleteAccount(account));
      Swal.fire("Cuentas", `La cuenta se ha eliminado con exito`, "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Cuentas", error.response.data.msg, "error");
    }
  };

  const startRestoreAccount = async (account) => {
    try {
      const asignedTo = account.asignedTo._id;
      const newAccount = {
        ...account,
        status: "created",
        asignedTo,
      };

      const accountUpdated = await calendarApi.put(
        `/accounts/${account.id}`,
        newAccount
      );

      dispatch(onUpdateAccount({ ...accountUpdated }));
      Swal.fire(
        "Cuentas",
        `La cuenta ${account.title} se ha restaurado con exito`,
        "success"
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Cuentas", error.response.data.msg, "error");
    }
  };

  const startPendingAccount = async (account, method) => {
    try {
      const newAccount = {
        ...account,
        status: `pending - ${method}`,
      };

      const accountUpdated = await calendarApi.put(
        `/accounts/${account.id}`,
        newAccount
      );

      dispatch(onUpdateAccount({ ...accountUpdated }));
      Swal.fire(
        "Cuentas",
        `La cuenta ${account.title} se encuentra pendiente de pago`,
        "success"
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Cuentas", error.response.data.msg, "error");
    }
  };

  return {
    // Propiedades
    active,
    accounts,
    // Métodos
    startGetAccount,
    startActiveAccount,
    startSaveAccount,
    startCancelAccount,
    startDeleteAccount,
    startRestoreAccount,
    startPendingAccount,
    startGetPendingAccount,
    startGetPendingPayAccount,
    startGetPaidAccount,
    startGetCancelAccount,
  };
};
