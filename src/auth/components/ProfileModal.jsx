import { useMemo, useState, useEffect } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Modal from "react-modal";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { useProfileStore, useAuthStore, useUiStore } from "../../hooks";
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

export const ProfileModal = () => {
  const { isProfileModalOpen, closeProfileModal } = useUiStore();
  const { profile, startSaveProfile } = useProfileStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    fname: profile?.fname || "",
    lname: profile?.lname || "",
    mname: profile?.mname || "",
    phone: profile?.phone || "",
    addr: profile?.addr || "",
    state: profile?.state || "",
    city: profile?.city || "",
    zip: profile?.zip || "",
  });

  const fnameClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.fname.length > 0 ? "" : "is-invalid";
  }, [formValues.fname, formSubmitted]);

  const lnameClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.lname.length > 0 ? "" : "is-invalid";
  }, [formValues.lname, formSubmitted]);

  const mnameClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.mname.length > 0 ? "" : "is-invalid";
  }, [formValues.mname, formSubmitted]);

  const phoneClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.phone.length > 0 ? "" : "is-invalid";
  }, [formValues.phone, formSubmitted]);

  const addrClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.addr.length > 0 ? "" : "is-invalid";
  }, [formValues.addr, formSubmitted]);

  const stateClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.state.length > 0 ? "" : "is-invalid";
  }, [formValues.state, formSubmitted]);

  const cityClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.city.length > 0 ? "" : "is-invalid";
  }, [formValues.city, formSubmitted]);

  const zipClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.zip.length > 0 ? "" : "is-invalid";
  }, [formValues.zip, formSubmitted]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onCloseModal = () => {
    closeProfileModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (formValues.fname.length <= 0) return;
    if (formValues.lname.length <= 0) return;
    if (formValues.mname.length <= 0) return;
    if (formValues.phone.length <= 0) return;
    if (formValues.addr.length <= 0) return;
    if (formValues.state.length <= 0) return;
    if (formValues.city.length <= 0) return;
    if (formValues.zip.length <= 0) return;

    // // TODO:
    await startSaveProfile(formValues);
    closeProfileModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={isProfileModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Pérfil de usuario </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-2">
              <input
                type="text"
                className={`form-control ${fnameClass}`}
                placeholder="Juan"
                name="fname"
                value={formValues.fname}
                onChange={onInputChanged}
              />
              <small id="emailHelp" className="form-text text-muted">
                Nombre (s)
              </small>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-2">
              <input
                type="text"
                className={`form-control ${lnameClass}`}
                placeholder="Perez"
                name="lname"
                value={formValues.lname}
                onChange={onInputChanged}
              />
              <small id="emailHelp" className="form-text text-muted">
                Apellido paterno
              </small>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-2">
              <input
                type="text"
                className={`form-control ${mnameClass}`}
                placeholder="Perez"
                name="mname"
                value={formValues.mname}
                onChange={onInputChanged}
              />
              <small id="emailHelp" className="form-text text-muted">
                Apellido materno
              </small>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-2">
              <input
                type="number"
                className={`form-control ${phoneClass}`}
                placeholder="5566778899"
                name="phone"
                value={formValues.phone}
                onChange={onInputChanged}
              />
              <small id="emailHelp" className="form-text text-muted">
                Teléfono
              </small>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-2">
              <input
                type="text"
                className={`form-control ${addrClass}`}
                placeholder="Dirección"
                name="addr"
                autoComplete="off"
                value={formValues.addr}
                onChange={onInputChanged}
              />
              <small id="emailHelp" className="form-text text-muted">
                Calle y número
              </small>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-2">
              <input
                type="text"
                className={`form-control ${stateClass}`}
                placeholder="Estado"
                name="state"
                autoComplete="off"
                value={formValues.state}
                onChange={onInputChanged}
              />
              <small id="emailHelp" className="form-text text-muted">
                Estado
              </small>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-2">
              <input
                type="text"
                className={`form-control ${cityClass}`}
                placeholder="Ciudad"
                name="city"
                autoComplete="off"
                value={formValues.city}
                onChange={onInputChanged}
              />
              <small id="emailHelp" className="form-text text-muted">
                Ciudad
              </small>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-2">
              <input
                type="text"
                className={`form-control ${zipClass}`}
                placeholder="C.P."
                name="zip"
                autoComplete="off"
                value={formValues.zip}
                onChange={onInputChanged}
              />
              <small id="emailHelp" className="form-text text-muted">
                Código postal
              </small>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
