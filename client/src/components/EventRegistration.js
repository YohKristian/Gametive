import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { errorPopup } from "../helpers";
import { addEvent, editEvent } from "../store/actions";
import SelectLocation from "./SelectLocation";
import { fetchGames } from "../store/actions/games";
import { fetchEventDetail } from "../store/actions";
import Select from "react-select";

let initial = {
	eventName: "",
	eventPoster: "",
	eventDate: "",
	eventType: "",
	description: "",
	rules: "",
	price: "",
	size: "",
	GameId: "",
	locationName: "",
	ProvinceId: 0,
	RegencyId: 0,
	DistrictId: 0,
};
let defaultValue = {};
const size = [
	{ value: 4, label: "4 Teams" },
	{ value: 8, label: "8 Teams" },
	{ value: 16, label: "16 Teams" },
],
	type = [
		{ value: "Offline", label: "Offline" },
		{ value: "Online", label: "Online" },
	];
export default function EventRegistration() {
	let { pathname } = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [gameList, setGameList] = useState([]);
	const [valueSelect, setValueSelect] = useState({ value: "", label: "" });
	const [loading, setLoading] = useState(true);
	const [eventData, setEventData] = useState({ ...initial });

	useEffect(() => {
		dispatch(fetchGames((_, { items }) => setGameList(items.map((el) => ({ value: el.id, label: el.name })))));
	}, []);

	const handleOnChangeForm = (e) => {
		const { name, value } = e.target;
		setEventData({ ...eventData, [name]: value });
		// console.log(eventData);
	};

	const handleSelectOption = (name, { value }) => {
		setEventData({ ...eventData, [name]: value });
		// console.log(eventData);
	};

	const handleOnSubmitForm = (e) => {
		e.preventDefault();
		setEventData((prev) => ({ ...prev, ...eventData }));

		dispatch(addEvent(eventData))
			.then(() => {
				navigate("/event");
			})
			.catch((err) => {
				errorPopup(err);
			});
	};

	return (
		<section className="ev-reg">
			<div>
				<div className="img">
					<img src="https://i.ibb.co/NN0tH4t/GAMETIVE-LOGO-BAR.png" alt="" />
				</div>
				<br></br>
				<h3 className="fw-bold mt-2">Event</h3>
				<br></br>
				<form onSubmit={handleOnSubmitForm}>
					<div>
						<div>
							<label htmlFor="eventName">Event Name</label>
							<input
								type="text"
								id="eventName"
								placeholder="Input your Event name here"
								name="eventName"
								value={eventData.eventName}
								onChange={(e) => handleOnChangeForm(e)}
							/>

							<label htmlFor="eventPoster">Event Poster</label>
							<input
								type="text"
								id="eventPoster"
								placeholder="input image url here"
								name="eventPoster"
								value={eventData.eventPoster}
								onChange={(e) => handleOnChangeForm(e)}
							/>

							<label htmlFor="eventDate">Event date</label>
							<input
								type="datetime-local"
								id="eventDate"
								name="eventDate"
								onChange={(e) => handleOnChangeForm(e)}
								value={eventData.eventDate}
							/>

							<label htmlFor="eventDescription">Description</label>
							<textarea
								id="eventDescription"
								placeholder="Detail of the events"
								name="description"
								value={eventData.description}
								onChange={(e) => handleOnChangeForm(e)}
							/>

							<label htmlFor="eventRule">Rule</label>
							<textarea
								id="eventRule"
								placeholder="Rule for the event"
								name="rules"
								value={eventData.rules}
								onChange={(e) => handleOnChangeForm(e)}
							/>
						</div>
						<div>
							<label htmlFor="eventType">Event type</label>

							<Select name="eventType" onChange={(e) => handleSelectOption("eventType", e)} options={type} />

							<label htmlFor="eventPrice">Registration Fee<span style={{ color: "red" }}>*</span><span style={{ fontSize: "0.6rem", color: "red" }}> untuk event gratis masukan angka 0</span></label>
							<input
								type="number"
								id="eventPrice"
								placeholder="Rp 100.000"
								name="price"
								value={eventData.price}
								onChange={(e) => handleOnChangeForm(e)}
							/>

							<label htmlFor="eventSize">Max Participants</label>
							<Select onChange={(e) => handleSelectOption("size", e)} options={size} />

							<label htmlFor="GamesId">Games</label>
							<Select onChange={(e) => handleSelectOption("GameId", e)} options={gameList} />

							<label htmlFor="eventRule">Address</label>
							<textarea
								id="eventRule"
								placeholder="Alamat Detail"
								name="locationName"
								value={eventData.locationName}
								onChange={(e) => handleOnChangeForm(e)}
							/>

							{(defaultValue.Location || eventData.eventType === "Offline") && (
								<>
									<label htmlFor="eventRule">Location</label>
									<SelectLocation state={{ setEventData }} />
								</>
							)}
						</div>
					</div>
					<button type="submit">Create</button>
				</form>
			</div>
		</section>
	);
}
