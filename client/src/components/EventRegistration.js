import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { errorPopup } from "../helpers";
import { addEvent } from "../store/actions";
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
	locationName: "",
	ProvinceId: "",
	RegencyId: "",
	DistrictId: "",
	GameId: "",
};
let defaultValue = {};

export default function EventRegistration() {
	let { pathname } = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [gameList, setGameList] = useState([]);
	const [eventData, setEventData] = useState({ ...initial });

	useEffect(() => {
		dispatch(fetchGames((_, { items }) => setGameList(items.map((el) => ({ value: el.id, label: el.name })))));
		if (pathname === "/event-edit") {
			dispatch(fetchEventDetail(7)).then((data) => {
				const {
					name: eventName,
					eventPoster,
					eventDate,
					eventType,
					description,
					rules,
					price,
					size,
					Game: { id: GameId, name: GameName },
					Location: { name: locationName, ProvinceId, RegencyId },
				} = data;
				defaultValue = { Game: { value: GameId, label: GameName }, Location: { ProvinceId, RegencyId } };
				setEventData({
					eventName,
					eventPoster,
					eventDate,
					eventType,
					description,
					rules,
					price,
					size,
					locationName,
					ProvinceId,
					RegencyId,
					GameId,
					locationName,
				});
			});
		}
	}, []);

	const handleOnChangeForm = (e) => {
		const { name, value } = e.target;
		console.log(eventData);
		setEventData({ ...eventData, [name]: value });
	};

	const handleSelectOption = ({ value }) => {
		setEventData({ ...eventData, GameId: value });
	};

	const handleOnSubmitForm = (e) => {
		e.preventDefault();
		setEventData((prev) => ({ ...prev, ...eventData }));

		dispatch(addEvent(eventData))
			.then(() => {
				navigate("/search");
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
				<h3 className="fw-bold mt-2">Event</h3>
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
							<select name="eventType" id="eventType" value={eventData.eventType} onChange={(e) => handleOnChangeForm(e)}>
								<option value="Offline">Offline</option>
								<option value="Online">Online</option>
							</select>

							<label htmlFor="eventPrice">Registration Fee</label>
							<input
								type="number"
								id="eventPrice"
								placeholder="Rp 100.000"
								name="price"
								value={eventData.price}
								onChange={(e) => handleOnChangeForm(e)}
							/>

							<label htmlFor="eventSize">Max Participants</label>
							<select name="size" id="eventSize" onChange={(e) => handleOnChangeForm(e)}>
								<option value="4">4 Teams</option>
								<option value="8">8 Teams</option>
								<option value="16">16 Teams</option>
							</select>

							<label htmlFor="GamesId">Games</label>
							<Select onChange={handleSelectOption} name="GamesId" options={gameList} />

							<label htmlFor="eventRule">Address</label>
							<textarea
								id="eventRule"
								placeholder="Alamat Detail"
								name="locationName"
								value={eventData.locationName}
								onChange={(e) => handleOnChangeForm(e)}
							/>

							<label htmlFor="eventRule">Location</label>

							{defaultValue.Location ? (
								<SelectLocation state={{ setEventData, Location: defaultValue.Location }} />
							) : (
								<SelectLocation state={{ setEventData, Location: "" }} />
							)}
						</div>
					</div>
					<button type="submit">Create</button>
				</form>
			</div>
		</section>
	);
}
