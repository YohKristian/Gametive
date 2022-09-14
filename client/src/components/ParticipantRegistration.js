import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { dateFormat, errorPopup, rupiahFormat, successPopup } from "../helpers";
import { addParticipants, participantsPaymentToken, registerParticipantToBracket } from "../store/actions/participants";
import { fetchTeams } from "../store/actions/teams";

export default function ParticipantRegistration() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { state } = useLocation();
    const { eventId, eventName, eventPrice, eventDate, eventPoster } = state;

    const [teamId, setTeamId] = useState("");

    const { teams } = useSelector((state) => state.teamsReducer);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchTeams())
            .catch((error) => {
                errorPopup(error);
            })
            .finally(() => {
                setLoading(true);
            })
    }, [])

    const handleOnSubmitForm = (e) => {
        e.preventDefault();
        let token = "";

        if (eventPrice === 0) {
            dispatch(addParticipants({ EventId: +eventId, TeamId: +teamId }))
                .then(({ data }) => {
                    // console.log(data);
                })
                .then(() => {
                    return dispatch(registerParticipantToBracket({ EventId: +eventId, TeamId: +teamId }));
                })
                .then(() => {
                    navigate("/");
                    successPopup("Success Register!");
                })
                .catch((err) => {
                    errorPopup(err);
                });
        } else {
            dispatch(participantsPaymentToken({ totalCostNeedToPay: +eventPrice, EventId: +eventId, TeamId: +teamId }))
                .then(({ data }) => {
                    token = data;
                    return dispatch(addParticipants({ EventId: +eventId, TeamId: +teamId }))
                })
                .then(({ data }) => {
                    console.log(data);
                })
                .then(() => {
                    window.snap.pay(token, {
                        onSuccess: function (result) {
                            /* You may add your own implementation here */
                            navigate("/");
                            successPopup("payment success!"); console.log(result);
                        },
                        onPending: function (result) {
                            /* You may add your own implementation here */
                            errorPopup("wating your payment!"); console.log(result);
                        },
                        onError: function (result) {
                            /* You may add your own implementation here */
                            errorPopup("payment failed!"); console.log(result);
                        },
                        onClose: function () {
                            /* You may add your own implementation here */
                            errorPopup('you closed the popup without finishing the payment');
                        }
                    })
                })
                .catch((err) => {
                    errorPopup(err);
                });
        }
    };

    const handlerOnChangeForm = (e) => {
        setTeamId(e.target.value);
    }

    return loading ? (
        <>
            <section className="ev-reg">
                <div>
                    <div className="img">
                        <img src="https://i.ibb.co/NN0tH4t/GAMETIVE-LOGO-BAR.png" alt="" />
                    </div>
                    <div className="event-img">
                        <img src={eventPoster} alt={eventName} />
                    </div>
                    <h3 className="mt-2"><b>{eventName}</b></h3>
                    <hr className="my-4" style={{ width: "100%" }}></hr>
                    <h5 className="mt-2">Registration Fee : {eventPrice === 0 ? "Free" : <b>{rupiahFormat(eventPrice)}</b>}</h5>
                    {eventPrice !== 0 && <h5 className="mt-2">Service Fee : <b>{rupiahFormat(5000)}</b></h5>}
                    <h5 className="mt-2">Event Date Start : <b>{dateFormat(eventDate)}</b></h5>
                    <hr className="my-4" style={{ width: "100%" }}></hr>
                    <form onSubmit={handleOnSubmitForm}>
                        <label htmlFor="teamName">Team Name</label>
                        <select id="teamName" value={teamId} onChange={handlerOnChangeForm} style={{
                            padding: 8, outline: "none", border: "none", borderRadius: 5, width: "100%",
                            maxWidth: "400px"
                        }}>
                            <option value="" disabled hidden>-- Choose Your Team --</option>
                            {teams.map(team => {
                                return <option value={team.id} key={team.id} style={{ padding: 8 }}>{team.name}</option>
                            })}
                        </select>
                        <br></br>
                        <button type="submit" style={{ marginTop: 16 }}>Register to event</button>
                    </form>
                </div>
            </section>
        </>
    ) : (
        <h1>Loading</h1>
    );
}