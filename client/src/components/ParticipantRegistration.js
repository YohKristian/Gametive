import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dateFormat, errorPopup, rupiahFormat } from "../helpers";

export default function ParticipantRegistration() {
    const navigate = useNavigate();

    const { state } = useLocation();
    const { eventId, eventName, eventPrice, eventDate } = state;

    const [teamId, setTeamId] = useState("");

    const handleOnSubmitForm = (e) => {
        e.preventDefault();
        setTeamId(e.target.value);

        // dispatch(addEvent(eventData))
        //     .then(() => {
        //         // navigate("/"); Console log aja
        //     })
        //     .catch((err) => {
        //         errorPopup(err);
        //     });
    };

    const handleOnClick = () => {
        window.snap.pay('4356a207-23da-4b49-a51f-88372129c5f3', {
            onSuccess: function (result) {
                /* You may add your own implementation here */
                errorPopup("payment success!"); console.log(result);
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
                        <input type="hidden" name="EventId" value={eventId} />

                        <label htmlFor="teamName">Team Name</label>
                        <select id="teamName" value={teamId} onChange={handleOnSubmitForm}>
                            <option value="">-- Choose Your Team --</option>
                            <option value="Mid">-- i --</option>
                            <option value="Mad">-- a --</option>
                            <option value="Mod">-- o --</option>
                        </select>

                        <button type="submit" style={{ marginTop: 16 }} onClick={handleOnClick}>Register to event</button>
                    </form>
                </div>
            </section>
        </>
    )
}