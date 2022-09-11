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
										<input
											type="text"
											id="eventName"
											className="form-control form-control-lg"
											placeholder="Input your Event name here"
											name="eventName"
											value={eventData.eventName}
											onChange={(e) => handleOnChangeForm(e)}
										/>
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventPoster">
											Event Poster
										</label>
										<input
											type="text"
											id="eventPoster"
											className="form-control form-control-lg"
											placeholder="input image url here"
											name="eventPoster"
											value={eventData.eventPoster}
											onChange={(e) => handleOnChangeForm(e)}
										/>
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventDate">
											Event date
										</label>
										<input
											type="datetime-local"
											id="eventDate"
											className="form-control form-control-lg"
											name="eventDate"
											onChange={(e) => handleOnChangeForm(e)}
											value={eventData.eventDate}
										/>
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventType">
											Event type
										</label>
										<select
											name="eventType"
											id="eventType"
											className="form-control form-control-lg"
											value={eventData.eventType}
											onChange={(e) => handleOnChangeForm(e)}
										>
											<option value="Offline">Offline</option>
											<option value="Online">Online</option>
										</select>
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="GameId">
											Games
										</label>
										<Select onChange={handleSelectOption} value={defaultValue?.Game || null} name="GameId" options={gameList} />
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventDescription">
											Description
										</label>
										<textarea
											id="eventDescription"
											className="form-control form-control-lg"
											placeholder="Detail of the events"
											name="description"
											value={eventData.description}
											onChange={(e) => handleOnChangeForm(e)}
										/>
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventRule">
											Rule
										</label>
										<textarea
											id="eventRule"
											className="form-control form-control-lg"
											placeholder="Rule for the event"
											name="rules"
											value={eventData.rules}
											onChange={(e) => handleOnChangeForm(e)}
										/>
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventPrice">
											Registration Fee
										</label>
										<input
											type="number"
											id="eventPrice"
											className="form-control form-control-lg"
											placeholder="Rp 100.000"
											name="price"
											value={eventData.price}
											onChange={(e) => handleOnChangeForm(e)}
										/>
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventSize">
											Max Participants
										</label>
										<select
											name="size"
											id="eventSize"
											className="form-control form-control-lg"
											onChange={(e) => handleOnChangeForm(e)}
										>
											<option value="4">4 Teams</option>
											<option value="8">8 Teams</option>
											<option value="16">16 Teams</option>
										</select>
									</div>

									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="eventRule">
											Address
										</label>
										<textarea
											id="eventRule"
											className="form-control form-control-lg"
											placeholder="Alamat Detail"
											name="locationName"
											value={eventData.locationName}
											onChange={(e) => handleOnChangeForm(e)}
										/>
										<label className="form-label" htmlFor="eventRule">
											Location
										</label>
										<SelectLocation state={{ setEventData, Location: defaultValue.Location }} />
									</div>

									{/* gameid, locationName, provinceId, regencyId, address */}
									<br></br>
									<button
										className="btn btn-primary btn-lg btn-block"
										style={{ width: "420px", backgroundColor: "#FF7F3F" }}
										type="submit"
									>
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
