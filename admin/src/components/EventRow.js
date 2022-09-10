import { dateFormat } from "../helpers"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { patchStatusEvents } from "../store/action/eventsActions";
import { errorPopup } from "../helpers";

export default function EventRow(props) {
    const dispatch = useDispatch();

    const [statusEvent, setStatusEvent] = useState("Pending")

    useEffect(() => {
        setStatusEvent(props.item.eventStatus);
    }, [])

    const onChangeStatusEvent = (e) => {
        const eventId = +props.item.id;
        setStatusEvent(e.target.value);

        dispatch(
            patchStatusEvents(eventId, e.target.value, (error, success) => {
                if (error) {
                    return errorPopup(error);
                }
                console.log(success)
            })
        )
    }

    const handlerOnClickEdit = () => {
        console.log(props.item.id, "<<<< ID ITEM NIH")
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(price);
    }

    return (
        <>
            <tr>
                <th scope="row">{props.item.name}</th>
                <td>{formatPrice(props.item.price)}</td>
                <td><img style={{ width: '100px', height: '100px' }} src={props.item.eventPoster} alt={props.item.name} /></td>
                <td>{props.item.eventType}</td>
                <td>{dateFormat(props.item.eventDate)}</td>
                <td>{props.item.Location.name}</td>
                <td>{props.item.User.username}</td>
                <td>{props.item.Game.name}</td>
                <td>
                    <p style={{ backgroundColor: '#59CE8F', borderRadius: '10px' }}>{props.item.eventStatus}</p>
                    <select value={statusEvent} onChange={onChangeStatusEvent}>
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                        <option value="Finished">Finished</option>
                        <option value="Archived">Archived</option>
                    </select>
                </td>
                <td>
                    <div className="d-flex flex-column">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ marginBottom: '10px' }}
                            onClick={handlerOnClickEdit}
                        >
                            <i className="bi bi-pencil-square"> Edit</i>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}