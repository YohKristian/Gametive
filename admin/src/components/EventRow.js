import { dateFormat } from "../helpers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDetailEvent, patchStatusEvents } from "../store/action/eventsActions";
import { errorPopup } from "../helpers";
import VerticalModalEditEvent from "./VerticalModalEditEvent";

export default function EventRow(props) {
  const dispatch = useDispatch();

  const [statusEvent, setStatusEvent] = useState("Pending");

  useEffect(() => {
    setStatusEvent(props.item.eventStatus);
  }, []);
    const [modalShow, setModalShow] = useState(false);

  const onChangeStatusEvent = (e) => {
    const eventId = +props.item.id;
    setStatusEvent(e.target.value);

    dispatch(
      patchStatusEvents(eventId, e.target.value, (error, success) => {
        if (error) {
          return errorPopup(error);
        }
        console.log(success);
      })
    );
  };

    const handlerOnClickEdit = () => {
        
        dispatch(fetchDetailEvent(props.item.id, (error, success) => {
            if (error) {
                return errorPopup(error);
            }
            // console.log(success)
        }))
        setModalShow(true);
    }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const styleColor = (value) => {
    const styleObj = {
      Pending: ["#FFF9C4", "#F9A825"],
      Active: ["#C8E6C9", "#1B5E20"],
      Finished: ["#FFCCBC", "#BF360C"],
      Archived: ["#C5CAE9", "#1A237E"],
    };
    const [backgroundColor, color] = styleObj[value];
    return { backgroundColor, color };
  };

  return (
    <>
        <VerticalModalEditEvent
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
      <tr>
        <th scope="row">{props.item.name}</th>
        <td>{formatPrice(props.item.price)}</td>
        <td>
          <img src={props.item.eventPoster} alt={props.item.name} />
        </td>
        <td>{props.item.eventType}</td>
        <td>{dateFormat(props.item.eventDate)}</td>
        <td>{props.item.Location.name}</td>
        <td>{props.item.User.username}</td>
        <td>{props.item.Game.name}</td>
        <td>
          <select
            value={statusEvent}
            onChange={onChangeStatusEvent}
            style={{
              ...styleColor(statusEvent),
              borderRadius: 12,
              padding: 4,
              outline: "none",
              fontWeight: "bold",
              border: "none",
            }}
          >
            <option
              value="Pending"
              style={{ backgroundColor: "white", color: "black" }}
            >
              Pending
            </option>
            <option
              value="Active"
              style={{ backgroundColor: "white", color: "black" }}
            >
              Active
            </option>
            <option
              value="Finished"
              style={{ backgroundColor: "white", color: "black" }}
            >
              Finished
            </option>
            <option
              value="Archived"
              style={{ backgroundColor: "white", color: "black" }}
            >
              Archived
            </option>
          </select>
        </td>
        <td>
          <div className="d-flex flex-column">
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginBottom: "10px" }}
              onClick={handlerOnClickEdit}
            >
              <i className="bi bi-pencil-square"> Edit</i>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}