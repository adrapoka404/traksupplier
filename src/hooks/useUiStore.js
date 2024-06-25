import { useDispatch, useSelector } from "react-redux";
import {
  onOpenDateModal,
  onCloseDateModal,
  onOpenProfileModal,
  onCloseProfileModal,
} from "../store";

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { isDateModalOpen, isProfileModalOpen } = useSelector(
    (state) => state.ui
  );

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  const openProfileModal = () => {
    dispatch(onOpenProfileModal());
  };

  const closeProfileModal = () => {
    dispatch(onCloseProfileModal());
  };

  return {
    // propiedades
    isDateModalOpen,
    isProfileModalOpen,

    // métodos
    openDateModal,
    closeDateModal,
    openProfileModal,
    closeProfileModal,
  };
};
