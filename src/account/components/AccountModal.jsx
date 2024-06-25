import { useMemo, useState, useEffect } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Modal from "react-modal";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { useAccountStore, useAuthStore, useUiStore } from "../../hooks";
import { Autocomplete, Button, Grid, TextField, Box } from "@mui/material";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const AccountModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { active, startSaveAccount } = useAccountStore();
  const { users, startGetUsers } = useAuthStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    amount: "",
    asignedTo: "",
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (active !== null) {
      setFormValues({ ...active });
    }
  }, [active]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (formValues.title.length <= 0) return;
    // TODO:
    await startSaveAccount(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  useEffect(() => {
    startGetUsers();
  }, []);
  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Cuentas </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Concepto de cuenta"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <input
            type="number"
            className={`form-control ${titleClass}`}
            placeholder="10.00"
            name="amount"
            value={formValues.amount}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>
        <div className="form-group mb-2">
          <Autocomplete
            options={users}
            getOptionLabel={(option) => `${option.name} (${option._id})`}
            renderOption={(props, option) => (
              <Box component="li" key={option._id} {...props}>
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Usuario"
                placeholder="Tester"
                fullWidth
                name="asignedTo"
              />
            )}
            value={
              users.find((user) => user._id === active?.assignedTo) || null
            }
            onChange={(event, newValue) => {
              onInputChanged({
                target: {
                  name: "asignedTo",
                  value: newValue ? newValue._id : "",
                },
              });
            }}
          />
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>
        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
