import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { errorPopup } from "../helpers";
import { addEvent, editEvent, fetchYourEvents } from "../store/actions";
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

export default function VerticalModalEditEvent(props) {
	let { pathname } = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [gameList, setGameList] = useState([]);
	const [valueSelect, setValueSelect] = useState({});
	const [loading, setLoading] = useState(true);
	const [eventData, setEventData] = useState({ ...initial });

	useEffect(() => {
		dispatch(fetchGames((_, { items }) => setGameList(items.map((el) => ({ value: el.id, label: el.name })))));
		console.log(props.event_id);
		dispatch(fetchEventDetail(props.event_id))
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
			.catch((err) => {
				errorPopup(err);
			});
	};

	if (!loading) {
		return (
			<>
				<Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">Update your event {props.event_id}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form onSubmit={handleOnSubmitForm}>
							<div className="card-body text-center" style={{ paddingLeft: "5", paddingRight: "5" }}>
								{" "}
								<pre>{JSON.stringify(eventData, null, 2)}</pre>
								<div className="row">
									<div className="form-outline mb-4 col-6">
										<label htmlFor="eventName" className="form-label">
											Event Name
										</label>
										<input
											type="text"
											id="eventName"
											placeholder="Input your Event name here"
											name="eventName"
											value={eventData.eventName}
											onChange={(e) => handleOnChangeForm(e)}
											className="form-control"
										/>
										<br></br>
										<label htmlFor="eventPoster" className="form-label">
											Event Poster
										</label>
										<input
											type="text"
											id="eventPoster"
											placeholder="input image url here"
											name="eventPoster"
											value={eventData.eventPoster}
											onChange={(e) => handleOnChangeForm(e)}
											className="form-control"
										/>
										<br></br>
										<label htmlFor="eventDate" className="form-label">
											Event date
										</label>
										<input
											type="datetime-local"
											id="eventDate"
											name="eventDate"
											onChange={(e) => handleOnChangeForm(e)}
											value={eventData.eventDate}
											className="form-control"
										/>
										<br></br>
										<label htmlFor="eventDescription" className="form-label">
											Description
										</label>
										<textarea
											id="eventDescription"
											placeholder="Detail of the events"
											name="description"
											value={eventData.description}
											onChange={(e) => handleOnChangeForm(e)}
											className="form-control"
										/>
										<br></br>
										<label htmlFor="eventRule" className="form-label">
											Rule
										</label>
										<textarea
											id="eventRule"
											placeholder="Rule for the event"
											name="rules"
											value={eventData.rules}
											onChange={(e) => handleOnChangeForm(e)}
											className="form-control"
										/>
										<br></br>
										<label htmlFor="eventType" className="form-label">
											Event type
										</label>
										<Select
											name="eventType"
											defaultValue={valueSelect.type}
											onChange={(e) => handleSelectOption("eventType", e)}
											options={typeDefault}
										/>
									</div>
									<div className="form-outline mb-4 col-6">
										<label htmlFor="eventPrice" className="form-label">
											Registration Fee
										</label>
										<input
											type="number"
											id="eventPrice"
											placeholder="Rp 100.000"
											name="price"
											value={eventData.price}
											onChange={(e) => handleOnChangeForm(e)}
											className="form-control"
										/>
										<br></br>
										<label htmlFor="eventSize" className="form-label">
											Max Participants
										</label>
										<Select
											defaultValue={valueSelect.size}
											onChange={(e) => handleSelectOption("size", e)}
											options={sizeDefault}
										/>
										<br></br>
										<label htmlFor="GamesId">Games</label>
										<Select
											defaultValue={valueSelect.game}
											onChange={(e) => handleSelectOption("GameId", e)}
											options={gameList}
										/>
										<br></br>
										<label htmlFor="eventRule" className="form-label">
											Address
										</label>
										<textarea
											id="eventRule"
											placeholder="Alamat Detail"
											name="locationName"
											value={eventData.locationName}
											onChange={(e) => handleOnChangeForm(e)}
											className="form-control"
										/>
										<br></br>
										{(valueSelect.Location || eventData.eventType === "Offline") && (
											<>
												<label htmlFor="eventRule" className="form-label">
													Location
												</label>
												<SelectLocation state={{ setEventData, Location: valueSelect.location || null }} />
											</>
										)}
									</div>
									<br></br>
									<button
										className="btn btn-lg"
										style={{ width: "100%", backgroundColor: "orange", color: "white", margin: "auto" }}
										type="submit"
										onClick={props.onHide}
									>
										Update
									</button>
								</div>
							</div>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<button className="btn" style={{ backgroundColor: "orange", color: "white" }} onClick={props.onHide}>
							Close
						</button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}
