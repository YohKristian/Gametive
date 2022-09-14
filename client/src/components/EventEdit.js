import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { errorPopup } from "../helpers";
import { editEvent, fetchYourEvents } from "../store/actions";
import SelectLocation from "./SelectLocation";
import { fetchGames } from "../store/actions/games";
import { fetchEventDetail } from "../store/actions";
import Select from "react-select";
import dayjs from "dayjs";

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
	ProvinceId: "",
	RegencyId: 0,
	DistrictId: 0,
};

const sizeDefault = [
	{ value: 4, label: "4 Teams" },
	{ value: 8, label: "8 Teams" },
	{ value: 16, label: "16 Teams" },
],
	typeDefault = [
		{ value: "Offline", label: "Offline" },
		{ value: "Online", label: "Online" },
	];

export default function EventEdit() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [gameList, setGameList] = useState([]);
	const [valueSelect, setValueSelect] = useState({});
	const [loading, setLoading] = useState(true);
	const [eventData, setEventData] = useState({ ...initial });

	useEffect(() => {
		dispatch(fetchGames((_, { items }) => setGameList(items.map((el) => ({ value: el.id, label: el.name })))));
		dispatch(fetchEventDetail(id))
			.then((data) => {
				const {
					id,
					name: eventName,
					eventPoster,
					eventDate,
					eventType,
					description,
					rules,
					price,
					size,
					Game: { id: GameId, name: GameName },
					Location: { name: locationName, ProvinceId, RegencyId, DistrictId },
				} = data;

				let populateDate
				if (eventDate) {
					populateDate = dayjs(eventDate).format('YYYY-MM-DDTHH:mm');
				}

				setValueSelect({
					size: sizeDefault.filter((x) => x.value === data.size),
					type: typeDefault.filter((x) => x.value === data.eventType),
					game: { value: GameId, label: GameName },
					location: { ProvinceId, RegencyId, DistrictId },
				});

				setEventData({
					id,
					eventName,
					eventPoster,
					eventDate: populateDate,
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
					DistrictId,
				});
			})
			.finally(() => setLoading(false));
	}, []);

	const handleOnChangeForm = (e) => {
		const { name, value } = e.target;
		setEventData({ ...eventData, [name]: value });
	};

	const handleSelectOption = (name, { value }) => {
		setEventData({ ...eventData, [name]: value });
	};

	const handleOnSubmitForm = (e) => {
		e.preventDefault();
		setEventData((prev) => ({ ...prev, ...eventData }));
		dispatch(editEvent(eventData.id, eventData))
			.then(() => {
				return dispatch(fetchYourEvents("", 1))
			})
			.then(() => {
				navigate("/event")
			})
			.catch((err) => {
				errorPopup(err);
			});
	};


	if (!loading) {
		return (
			<section className="ev-reg">
				<div>
					<div className="img">
						<img src="https://i.ibb.co/NN0tH4t/GAMETIVE-LOGO-BAR.png" alt="" />
					</div>
					<br></br>
					<h3 className="fw-bold mt-2">Update Event</h3>
					<hr className="my-4" style={{ width: "100%" }}></hr>
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

								<Select
									name="eventType"
									defaultValue={valueSelect.type}
									onChange={(e) => handleSelectOption("eventType", e)}
									options={typeDefault}
								/>

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
								<Select defaultValue={valueSelect.size} onChange={(e) => handleSelectOption("size", e)} options={sizeDefault} />

								<label htmlFor="GamesId">Games</label>
								<Select defaultValue={valueSelect.game} onChange={(e) => handleSelectOption("GameId", e)} options={gameList} />

								<label htmlFor="eventRule">Address</label>
								<textarea
									id="eventRule"
									placeholder="Alamat Detail"
									name="locationName"
									value={eventData.locationName}
									onChange={(e) => handleOnChangeForm(e)}
								/>

								{(valueSelect.Location || eventData.eventType === "Offline") && (
									<>
										<label htmlFor="eventRule">Location</label>
										<SelectLocation state={{ setEventData, Location: valueSelect.location || null }} />
									</>
								)}
							</div>
						</div>
						<br></br>
						<button type="submit">Update</button>
					</form>
				</div>
			</section>
		);
	}
}
