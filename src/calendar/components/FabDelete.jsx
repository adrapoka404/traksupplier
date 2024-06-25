import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeleteEvent, hasEventSelected } = useCalendarStore();

  const handDeleClickNew = () => {
    startDeleteEvent();
  };
  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handDeleClickNew}
      style={{ display: hasEventSelected ? "" : "none" }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
