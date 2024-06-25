import { useDispatch, useSelector } from "react-redux";

import { onUpdateProfile } from "../store";
import calendarApi from "../api/calendarApi";
import Swal from "sweetalert2";

export const useProfileStore = () => {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.auth);

  const startSaveProfile = async (profileUp) => {
    try {
      if (profile?._id) {
        const profileUpdated = await calendarApi.put(
          `/profiles/${profile._id}`,
          profileUp
        );
        dispatch(onUpdateProfile({ ...profileUpdated.data.profile }));
        Swal.fire("Perfil", `Su perfil se ha actualizado con exito`, "success");
        return;
      }

      const { data } = await calendarApi.post("/profiles", profile);
      dispatch(onUpdateProfile({ ...profile, _id: data._id }));
    } catch (error) {
      console.log(error);
      Swal.fire("Perfil", error, "error");
    }
  };

  return {
    // Propiedades
    profile,
    // Métodos
    startSaveProfile,
  };
};
