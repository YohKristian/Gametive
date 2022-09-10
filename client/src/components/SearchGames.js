import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../store/actions";
import { dateFormat, errorPopup, rupiahFormat } from "../helpers";
import LoadingAnimation from "./LoadingAnimation";

export default function SearchGames() {
  const navigate = useNavigate();
  const { events } = useSelector((state) => state.eventsReducer);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState();

  const handleKeyword = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleSearch = () => {
    dispatch(fetchEvents(keyword)).catch((err) => {
      errorPopup(err);
    });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(fetchEvents(keyword)).catch((err) => {
        errorPopup(err);
      });
    }
  };

  const toDetail = (id) => () => {
    navigate("/detail/" + id);
  };

  useEffect(() => {
    dispatch(fetchEvents(keyword)).catch((err) => {
      errorPopup(err);
    });
  }, []);

  return (
    <div className="search-page">
      <div className="search-bar">
        <i onClick={handleSearch} className="fa-solid fa-magnifying-glass"></i>
        <input
          onKeyPress={handleEnter}
          onChange={handleKeyword}
          type="text"
          placeholder="Search here..."
        />
      </div>
      {events ? (
        <div>
          {events.map((event, idx) => (
            <div key={idx} onClick={toDetail(event.id)}>
              <div className="img">
                <img src={event.eventPoster} alt="" />
              </div>
              <div>
                <h1>{event.name}</h1>
                <span className="status">{event.eventType}</span>
                <div>
                  <p>Lokasi: {event.Location.name}</p>
                  <p>Mulai: {dateFormat(event.eventDate)}</p>
                  <p>Regestration Fee: {rupiahFormat(event.price)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
}
