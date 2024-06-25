import {
  ArrowDropDown,
  ArrowDropUp,
  Delete,
  Edit,
  NotInterested,
  PaymentOutlined,
  Restore,
} from "@mui/icons-material";
import { IconButton, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import "../../assets/css/components/table.css";
import moment from "moment";
import { Pagination } from "../components/Pagination";
import { useAccountStore, useUiStore } from "../../hooks";
import Swal from "sweetalert2";
import { configBanwire } from "../../banwire/config";
import { useEffect } from "react";

export const ListAccount = ({}) => {
  const dispatch = useDispatch();

  const { accounts, pages, page, count } = useSelector(
    (state) => state.account
  );

  const {
    startActiveAccount,
    startCancelAccount,
    startDeleteAccount,
    startRestoreAccount,
    startPendingAccount,
  } = useAccountStore();
  const { openDateModal, openProfileModal } = useUiStore();

  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const isComplete = true;
  const inPage = "null";
  const cantEdit = true;
  const cantCancel = true;
  const cantDelete = true;
  const cantRestore = true;
  // const

  const startGetEdit = (account) => {
    openDateModal();
    dispatch(startActiveAccount(account));
  };

  const onClickCancel = (account) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Cancelar la cuenta ${account.title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startCancelAccount(account));
      }
    });
  };

  const startRestore = (account) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Restaurar la cuenta ${account.title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, restaurar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startRestoreAccount(account));
      }
    });
  };

  const startDelete = (account) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Eliminar la cuenta ${account.title} no se puede deshacer`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeleteAccount(account));
      }
    });
  };
  const startPay = (account) => {
    if (user.profile?.fname) {
      const { addr, city, state, country, zip } = user.profile;
      const SW = new BwGateway({
        user: configBanwire.user,
        sandbox: configBanwire.sandbox,
        title: account.title,
        language: "es",
        secure3d: false,
        reference: account.id,
        concept: account.title,
        currency: "MXN",
        cust: { ...user.profile },
        ship: { addr, city, state, country, zip },
        showShipping: false,
        url_notify: configBanwire.notifyUrl,
        notifyUrl: configBanwire.notifyUrl,
        paymentOptions: "all",
        reviewOrder: true,
        total: account.amount,
        onSuccess: function (data) {
          console.log(data);
          console.log("¡Gracias por tu pago!");
        },
        onPending: (data) => {
          dispatch(startPendingAccount(account, data.method));
        },
        onChallenge: function (data) {
          console.log("Pago enviado a validaciones de seguridad");
        },
        onError: function (data) {
          console.log("Error en el pago");
        },
        onCancel: function (data) {
          console.log("Se cancelo el proceso ADX");
        },
      });

      SW.pay();
    } else {
      openProfileModal();
    }
  };

  return (
    <>
      <Pagination totalPages={pages} currentPage={page} onPageChange={count} />
      <div style={{ overflow: scroll }}>
        <table className="container">
          <thead>
            <tr>
              <th>
                <h1>ID</h1>
              </th>
              <th>
                <h1>Descripción</h1>
              </th>
              <th>
                <h1>Total</h1>
              </th>
              {user.admin ? (
                <th>
                  <h1>Usuario </h1>
                </th>
              ) : (
                ""
              )}

              <th>
                <h1>
                  Fecha <ArrowDropDown />
                </h1>
              </th>
              <th>
                <h1>Opciones</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={account.id}>
                <td>{`${index + 1}`}</td>
                <td style={{ textTransform: "capitalize" }}>
                  {account.title} <br /> {account.status}
                </td>
                <td style={{ textTransform: "capitalize" }}>
                  $ {account.amount}
                </td>
                {user.admin ? (
                  <td style={{ textTransform: "capitalize" }}>
                    {account.asignedTo.name}
                  </td>
                ) : (
                  ""
                )}

                <td>
                  {moment(account.created).subtract(10, "days").calendar()}
                </td>
                {user.admin ? (
                  <td>
                    <IconButton
                      aria-label="Editar"
                      onClick={() => {
                        startGetEdit(account);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    {account.status === "created" ? (
                      <IconButton
                        aria-label="Cancelar"
                        onClick={() => {
                          onClickCancel(account);
                        }}
                      >
                        <NotInterested />
                      </IconButton>
                    ) : (
                      ""
                    )}
                    {account.status === "created" ||
                    account.status === "cancel" ? (
                      <IconButton
                        aria-label="Eliminar"
                        onClick={() => {
                          startDelete(account);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    ) : (
                      ""
                    )}
                    {account.status == "cancel" ? (
                      <IconButton
                        aria-label="Restaurar"
                        onClick={() => {
                          startRestore(account);
                        }}
                      >
                        <Restore />
                      </IconButton>
                    ) : (
                      ""
                    )}
                  </td>
                ) : (
                  <td>
                    {account.status == "created" ? (
                      <IconButton
                        aria-label="Pagar"
                        color="green"
                        onClick={() => {
                          startPay(account);
                        }}
                        sx={{
                          color: "green",
                          ":hover": {
                            backgroundColor: "green",
                            opacity: 0.9,
                            color: "white",
                          },
                        }}
                        disabled={!isComplete}
                      >
                        <PaymentOutlined />
                        {!isComplete && <small>Completa perfil</small>}
                      </IconButton>
                    ) : (
                      account.status
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={pages} currentPage={page} onPageChange={count} />
    </>
  );
};
