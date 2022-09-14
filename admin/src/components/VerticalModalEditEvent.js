import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addGames, fetchGamesEdit } from "../store/action/gamesAction";
import { errorPopup } from "../helpers";
import { updateUsersPassword } from "../store/action/usersAction";
import { editEvent } from "../store/action/eventsActions";
import SelectLocation from "./SelectLocation";
import dayjs from "dayjs";

export default function VerticalModalEditEvent(props) {
	const dispatch = useDispatch();
	const { detailEvent } = useSelector((state) => state.event);
	const { game } = useSelector((state) => state.game);

	const [newEvent, setNewEvent] = useState("");

	const setLocation = (e) => {
		// const { DistrictId, ProvinceId, RegencyId } = e;
		setNewEvent({ ...newEvent, Location: { ...newEvent.Location, ...e } });
		// console.log(newEvent);
	};

	useEffect(() => setNewEvent(""), [props.show]);
	useEffect(() => {
		dispatch(
			fetchGamesEdit((error, success) => {
				if (error) {
					return errorPopup(error);
				}
				// console.log(success)
			}),
		);

		let populateDate
		if (detailEvent.eventDate) {
			populateDate = dayjs(detailEvent.eventDate).format('YYYY-MM-DDTHH:mm');
		}

		setNewEvent({
			...detailEvent,
			eventDate: populateDate,
		});
	}, [detailEvent]);

	const inputEditEvent = (e) => {
		const { name, value } = e.target;

		setNewEvent({
			...newEvent,
			[name]: value,
		});
	};

	const handleOnSubmitForm = (e) => {
		e.preventDefault();

		setNewEvent((prev) => ({ ...prev, ...detailEvent }));
		let {
			name: eventName,
			eventPoster,
			eventDate,
			eventType,
			description,
			rules,
			price,
			size,
			Game: { id: GameId },
			Location: { name: locationName, ProvinceId, RegencyId, DistrictId },
		} = newEvent;

		let newInput = {
			eventName,
			eventPoster,
			eventDate,
			eventType,
			description,
			rules,
			price,
			size,
			GameId,
			ProvinceId,
			locationName,
			RegencyId,
			DistrictId,
		};

		console.log(newInput.DistrictId, "newInput");
		dispatch(
			editEvent(detailEvent.id, newInput, (error, success) => {
				if (error) {
					return errorPopup(error);
				}
				console.log(success, "ini success");
				props.onHide();
				setNewEvent("");
			}),
		);
	};

	return newEvent ? (
		<>
			<Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">Edit Event</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleOnSubmitForm}>
						<div className="card-body text-center" style={{ paddingLeft: "5", paddingRight: "5" }}>
							<div className="form-outline mb-4">
								<label className="form-label" htmlFor="name">
									Event Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									className="form-control form-control-lg"
									placeholder="Input your event name"
									defaultValue={newEvent?.name}
									onChange={inputEditEvent}
								/>
							</div>

							<div className="form-outline mb-4">
								<label className="form-label" htmlFor="description">
									Event Description
								</label>
								<textarea
									id="description"
									name="description"
									className="form-control form-control-lg"
									placeholder="Input your event description"
									value={newEvent.description}
									onChange={inputEditEvent}
								>
									{newEvent.description}
								</textarea>
							</div>

							<div className="form-outline mb-4">
								<label className="form-label" htmlFor="price">
									Event Price
								</label>
								<input
									type="number"
									id="price"
									name="price"
									className="form-control form-control-lg"
									placeholder="Input your event price"
									defaultValue={newEvent.price}
									onChange={inputEditEvent}
								/>
							</div>

							<div className="form-outline mb-4">
								<label className="form-label" htmlFor="rules">
									Event Rules
								</label>
								<textarea
									type="text"
									id="rules"
									name="rules"
									className="form-control form-control-lg"
									placeholder="Input your event rules"
									value={newEvent.rules}
									onChange={inputEditEvent}
								>
									{newEvent.rules}
								</textarea>
							</div>

							<div className="form-outline mb-4">
								<label className="form-label" htmlFor="eventPoster">
									Event Poster
								</label>
								<input
									type="input"
									id="eventPoster"
									name="eventPoster"
									className="form-control form-control-lg"
									placeholder="Input your event poster url"
									defaultValue={newEvent.eventPoster}
									onChange={inputEditEvent}
								/>
							</div>

							<div className="form-outline mb-4">
								<label className="form-label" htmlFor="eventDate">
									Event Date
								</label>
								<input
									type="datetime-local"
									id="eventDate"
									name="eventDate"
									className="form-control form-control-lg"
									defaultValue={newEvent.eventDate}
									onChange={inputEditEvent}
								/>
							</div>

							<div className="form-outline mb-4">
								<label className="form-label" htmlFor="eventType">
									Event Type
								</label>
								<select
									id="eventType"
									name="eventType"
									className="form-control form-control-lg"
									defaultValue={newEvent.eventType}
									onChange={inputEditEvent}
								>
									<option value="" >-- Select Type --</option>
									<option value="Online" >Online</option>
									<option value="Offline" >Offline</option>
								</select>
							</div>

							<div className="form-outline mb-4">
								<label className="form-label" htmlFor="GameId">
									Game Name
								</label>
								<br></br>
								<select
									id="GameId"
									name="GameId"
									onChange={inputEditEvent}
									defaultValue={newEvent.GameId}
									style={{ width: "465px", height: "40px", borderRadius: 12 }}
								>
									{game?.items?.map((el) =>
										newEvent?.Game?.id == el.id ? (
											<option key={el.id} value={el.id}>
												{el.name}
											</option>
										) : (
											<option key={el.id} value={el.id}>
												{el.name}
											</option>
										),
									)}
								</select>
							</div>

							<div className="form-outline mb-4">
								<label className="form-label" htmlFor="locationName">
									Location Name
								</label>
								<textarea
									type="text"
									id="locationName"
									name="locationName"
									className="form-control form-control-lg"
									placeholder="Input your address"
									value={newEvent.locationName}
									onChange={inputEditEvent}
								>
									{newEvent.locationName}
								</textarea>
							</div>

							<SelectLocation state={{ setLocation, Location: newEvent.Location }} />

							{/* <div className="form-outline mb-4">
                <label className="form-label" htmlFor="genre">
                  Regency
                </label>
                <input
                  type="text"
                  id="genre"
                  name="RegencyId"
                  className="form-control form-control-lg"
                  placeholder="Input your game genre"
                  defaultValue={newEvent.RegencyId}
                  onChange={inputEditEvent}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="genre">
                  Province
                </label>
                <input
                  type="text"
                  id="genre"
                  name="ProvinceId"
                  className="form-control form-control-lg"
                  placeholder="Input your game genre"
                  defaultValue={newEvent.ProvinceId}
                  onChange={inputEditEvent}
                />
              </div> */}
							<br></br>
							<button
								className="btn btn-lg btn-block"
								style={{ width: "420px", backgroundColor: "#FF7F3F", color: "white" }}
								type="submit"
							>
								Save
							</button>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<button className="btn" style={{ backgroundColor: "#FF7F3F", color: "white" }} onClick={props.onHide}>Close</button>
				</Modal.Footer>
			</Modal>
		</>
	) : (
		""
	);
}
