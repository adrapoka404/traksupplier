import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handdleClickNew = () => {
    console.log("hizo click");
    setActiveEvent({
      title: "",
      notas: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: 123,
        name: "Adrapok de Xibalba",
      },
    });
    console.log("manda evento domi");
    openDateModal();
  };
  return (
    <button className="btn btn-primary fab" onClick={handdleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
