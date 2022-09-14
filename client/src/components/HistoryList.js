import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { dateFormat, errorPopup, rupiahFormat } from "../helpers";
import { getHistoryUser } from "../store/actions";
import LoadingAnimation from "./LoadingAnimation";

export default function HistoryList() {
    const dispatch = useDispatch();

    const history = useSelector((state) => state.usersReducer.history);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getHistoryUser())
            .then(() => {
                setLoading(true);
            })
            .catch((error) => {
                errorPopup(error)
            })
    }, [])

    return loading ? (
        <div className="main-page">
            <h1 className="event-title">History List</h1>
            <hr className="my-4"></hr>
            <div style={{ marginTop: "50px" }} className="history-list text-center">
                <p style={{ color: "red" }}>* Event Fee sudah termasuk Service Fee seharga Rp 5.000,00</p>
                <table className="table table-striped">
                    <thead>
                        <tr style={{ backgroundColor: "orange" }}>
                            <th scope="col">Team Name</th>
                            <th scope="col">Event Name</th>
                            <th scope="col">Event Date</th>
                            <th scope="col">Event Fee</th>
                            <th scope="col">Status Pay</th>
                            <th scope="col">Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.Teams.length === 0 && <tr>
                            <td colSpan={6}>No History Yet</td>
                        </tr>}
                        {history.Teams.map(team => {
                            return team.Participants.map((participant, idx) => {
                                return <tr key={idx}>
                                    <th scope="row">{team.name}</th>
                                    <td>{participant.Event.name}</td>
                                    <td>{dateFormat(participant.Event.eventDate)}</td>
                                    <td>{participant.Event.price === 0 ? "Free" : rupiahFormat(participant.Event.price + 5000)}</td>
                                    <td>{participant.statusPay}</td>
                                    <td>{dateFormat(participant.paymentDate)}</td>
                                </tr>
                            })
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    ) : (
        <LoadingAnimation />
    )
}