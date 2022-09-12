import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { errorPopup } from "../helpers";
import { getHistoryUser } from "../store/actions";

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

    let teamName = "";

    return loading ? (
        <>
            <div style={{ marginTop: "10vh" }} className="history-list text-center">
                <h1>History List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr style={{ backgroundColor: "#EAE3D2" }}>
                            <th scope="col">Team Name</th>
                            <th scope="col">Event Name</th>
                            <th scope="col">Status Pay</th>
                            <th scope="col">Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.Teams.map(team => {
                            return team.Participants.map((participant, idx) => {
                                return <tr key={idx}>
                                    <th scope="row">{team.name}</th>
                                    <td>{participant.Event.name}</td>
                                    <td>{participant.statusPay}</td>
                                    <td>{participant.paymentDate}</td>
                                </tr>
                            })
                        })}
                    </tbody>
                </table>
            </div>
        </>
    ) : (
        <h1 style={{ marginTop: "10vh" }}>Loading</h1>
    )
}