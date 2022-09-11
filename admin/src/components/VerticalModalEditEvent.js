import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addGames, fetchGamesEdit } from "../store/action/gamesAction";
import { errorPopup } from "../helpers";
import { updateUsersPassword } from "../store/action/usersAction";
import { editEvent } from "../store/action/eventsActions";
import SelectLocation from "./SelectLocation";

export default function VerticalModalEditEvent(props) {
  const dispatch = useDispatch();
  const { detailEvent } = useSelector((state) => state.event);
  const { game } = useSelector((state) => state.game);

  const [newEvent, setNewEvent] = useState("");

  const setLocation = (e) => {
    setNewEvent({ ...newEvent });
    console.log(newEvent);
    console.log({ ...e });
  };

  useEffect(() => setNewEvent(""), [props.show]);
  useEffect(() => {
    dispatch(
      fetchGamesEdit((error, success) => {
        if (error) {
          return errorPopup(error);
        }
        // console.log(success)
      })
    );
    let populateDate = new Date(detailEvent.eventDate).toLocaleDateString(
      "en-CA"
    );
    setNewEvent({ ...detailEvent });
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
    console.log(newEvent);
    dispatch(
      editEvent(detailEvent.id, newEvent, (error, success) => {
        if (error) {
          return errorPopup(error);
        }
        props.onHide();
        setNewEvent("");
      })
    );
  };

  return newEvent ? (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleOnSubmitForm}>
            <div
              className="card-body text-center"
              style={{ paddingLeft: "5", paddingRight: "5" }}
            >
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name">
                  Event Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control form-control-lg"
                  placeholder="Input your game name"
                  defaultValue={newEvent?.name}
                  onChange={inputEditEvent}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="gameImg">
                  Event Description
                </label>
                <textarea
                  id="gameImg"
                  name="description"
                  className="form-control form-control-lg"
                  placeholder="Input your game image url"
                  value={newEvent.description}
                  onChange={inputEditEvent}
                >
                  {newEvent.description}
                </textarea>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="youtubeUrl">
                  Event Price
                </label>
                <input
                  type="text"
                  id="youtubeUrl"
                  name="price"
                  className="form-control form-control-lg"
                  placeholder="Input your game image url"
                  defaultValue={newEvent.price}
                  onChange={inputEditEvent}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="gameUrl">
                  Event Rules
                </label>
                <textarea
                  type="text"
                  id="gameUrl"
                  name="rules"
                  className="form-control form-control-lg"
                  placeholder="Input your game image url"
                  value={newEvent.rules}
                  onChange={inputEditEvent}
                >
                  {newEvent.rules}
                </textarea>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="releaseDate">
                  Event Poster
                </label>
                <input
                  type="input"
                  id="releaseDate"
                  name="eventPoster"
                  className="form-control form-control-lg"
                  defaultValue={newEvent.eventPoster}
                  onChange={inputEditEvent}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="developer">
                  Event Date
                </label>
                <input
                  type="date"
                  id="developer"
                  name="eventDate"
                  className="form-control form-control-lg"
                  placeholder="Input your game developer"
                  defaultValue={newEvent.eventDate}
                  onChange={inputEditEvent}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="genre">
                  Event Type
                </label>
                <input
                  type="text"
                  id="genre"
                  name="eventType"
                  className="form-control form-control-lg"
                  placeholder="Input your game genre"
                  defaultValue={newEvent.eventType}
                  onChange={inputEditEvent}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="genre">
                  Game Name
                </label>
                <br></br>
                <select
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
                    )
                  )}
                </select>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="genre">
                  Location Name
                </label>
                <input
                  type="text"
                  id="genre"
                  name="locationName"
                  className="form-control form-control-lg"
                  placeholder="Input your game genre"
                  defaultValue={newEvent.locationName}
                  onChange={inputEditEvent}
                />
              </div>

              <SelectLocation
                state={{ setLocation, Location: newEvent.Location }}
              />

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

              <button
                className="btn btn-primary btn-lg btn-block"
                style={{ width: "420px", backgroundColor: "#FF7F3F" }}
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : (
    ""
  );
}
