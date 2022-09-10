import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorPopup } from "../helpers";
import { addEvent } from "../store/actions";
import SelectLocation from "./SelectLocation";
import { fetchGames } from "../store/actions/games";
import Select from "react-select";
let initial = { eventName: "", eventPoster: "", eventDate: "", eventType: "", description: "", rules: "", price: "", size: "", locationName: "", ProvinceId: "", RegencyId: "", DistrictId: "" };

export default function EventRegistration() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { state } = useSelector((state) => state.gameReducer);
	const [gameList, setGameList] = useState([]);

	useEffect(() => {
		dispatch(
			fetchGames((_, { items }) => {
				console.log(items);
				setGameList(items.map((el) => ({ value: el.id, label: el.name })));
			}),
		);
	}, []);

	const [eventData, setEventData] = useState({ ...initial });
	const handleOnChangeForm = (e) => {
		const { name, value } = e.target;
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
		<section className="vh-100" style={{ backgroundColor: "#FFDBA4" }}>
			<div className="container py-5 h-100">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-12 col-md-8 col-lg-6 col-xl-5">
						<div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
							<div className="text-center">
								<img src="https://i.ibb.co/NN0tH4t/GAMETIVE-LOGO-BAR.png" alt="" style={{ height: "90px", width: "350px" }} />
							</div>
							<form onSubmit={handleOnSubmitForm}>
								<div className="card-body text-center" style={{ paddingLeft: "5", paddingRight: "5" }}>
									<h3 className="mb-1">Event</h3>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventName">
											Event Name
										</label>
										<input type="text" id="eventName" className="form-control form-control-lg" placeholder="Input your Event name here" name="eventName" value={eventData.eventName} onChange={(e) => handleOnChangeForm(e)} />
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventPoster">
											Event Poster
										</label>
										<input type="text" id="eventPoster" className="form-control form-control-lg" placeholder="input image url here" name="eventPoster" value={eventData.eventPoster} onChange={(e) => handleOnChangeForm(e)} />
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventDate">
											Event date
										</label>
										<input type="datetime-local" id="eventDate" className="form-control form-control-lg" name="eventDate" onChange={(e) => handleOnChangeForm(e)} value={eventData.eventDate} />
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventType">
											Event type
										</label>
										<select name="eventType" id="eventType" className="form-control form-control-lg" value={eventData.eventType} onChange={(e) => handleOnChangeForm(e)}>
											<option value="Offline">Offline</option>
											<option value="Online">Online</option>
										</select>
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="GamesId">
											Games
										</label>
										<Select onChange={handleSelectOption} name="GamesId" options={gameList} />
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventDescription">
											Description
										</label>
										<textarea id="eventDescription" className="form-control form-control-lg" placeholder="Detail of the events" name="description" value={eventData.description} onChange={(e) => handleOnChangeForm(e)} />
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventRule">
											Rule
										</label>
										<textarea id="eventRule" className="form-control form-control-lg" placeholder="Rule for the event" name="rules" value={eventData.rules} onChange={(e) => handleOnChangeForm(e)} />
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventPrice">
											Registration Fee
										</label>
										<input type="number" id="eventPrice" className="form-control form-control-lg" placeholder="Rp 100.000" name="price" value={eventData.price} onChange={(e) => handleOnChangeForm(e)} />
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventSize">
											Max Participants
										</label>
										<select name="size" id="eventSize" className="form-control form-control-lg" onChange={(e) => handleOnChangeForm(e)}>
											<option value="4">4 Teams</option>
											<option value="8">8 Teams</option>
											<option value="16">16 Teams</option>
										</select>
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventRule">
											Address
										</label>
										<textarea id="eventRule" className="form-control form-control-lg" placeholder="Rule for the event" name="locationName" value={eventData.address} onChange={(e) => handleOnChangeForm(e)} />
										<label className="form-label" htmlFor="eventRule">
											Location
										</label>
										<SelectLocation state={setEventData} />
										{JSON.stringify(eventData, null, 2)}
									</div>

									{/* gameid, locationName, provinceId, regencyId, address */}
									<br></br>
									<button className="btn btn-primary btn-lg btn-block" style={{ width: "420px", backgroundColor: "#FF7F3F" }} type="submit">
										Create
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
