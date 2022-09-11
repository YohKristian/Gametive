import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { dateFormat, errorPopup, rupiahFormat } from "../helpers";
import { addParticipants, participantsPaymentToken, registerParticipantToBracket } from "../store/actions/participants";

export default function ParticipantRegistration() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { state } = useLocation();
    const { eventId, eventName, eventPrice, eventDate } = state;

    const [teamId, setTeamId] = useState("");

    const handleOnSubmitForm = (e) => {
        e.preventDefault();
        let token = "";

        dispatch(participantsPaymentToken({ totalCostNeedToPay: +eventPrice }))
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
                        errorPopup("payment success!"); console.log(result);
                        dispatch(registerParticipantToBracket({ EventId: +eventId, TeamId: +teamId }))
                            .then(() => {
                                navigate("/");
                            })
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
    };

    const handlerOnChangeForm = (e) => {
        setTeamId(e.target.value);
    }

    return (
        <>
            <section className="ev-reg">
                <div>
                    <div className="img">
                        <img src="https://i.ibb.co/NN0tH4t/GAMETIVE-LOGO-BAR.png" alt="" />
                    </div>
                    <h3 className="fw-bold mt-2">Participate to Event {eventName}</h3>
                    <h3 className="fw-bold mt-2">Registration Fee : {rupiahFormat(eventPrice)}</h3>
                    <h3 className="fw-bold mt-2">Event Date Start : {dateFormat(eventDate)}</h3>
                    <form onSubmit={handleOnSubmitForm}>
                        <label htmlFor="teamName">Team Name</label>
                        <select id="teamName" value={teamId} onChange={handlerOnChangeForm}>
                            <option value="">-- Choose Your Team --</option>
                            <option value="1">-- i --</option>
                            <option value="2">-- a --</option>
                            <option value="3">-- o --</option>
                            <option value="5">JagoanMelon</option>
                        </select>

                        <button type="submit" style={{ marginTop: 16 }}>Register to event</button>
                    </form>
                </div>
            </section>
        </>
    )
}