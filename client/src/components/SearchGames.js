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
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState();

  const fetchData = () => {
    dispatch(fetchEvents(keyword))
      .catch((err) => {
        errorPopup(err);
      })
      .finally(() => setLoading(false));
  };

  const handleKeyword = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  const toDetail = (id) => () => {
    navigate("/detail/" + id);
  };

  useEffect(() => {
    fetchData();
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
      {!loading ? (
        <div>
          {events.map((event, idx) => (
            <div className="search-item" key={idx} onClick={toDetail(event.id)}>
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
