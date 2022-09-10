import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../store/actions";
import { errorPopup } from "../helpers";

export default function SearchGames() {
  const navigate = useNavigate();
  const { events } = useSelector((state) => state.eventsReducer);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const clickImg = (id) => () => {
    navigate("/detail/" + id);
  };

  useEffect(() => {
    dispatch(fetchEvents())
      .catch((err) => {
        errorPopup(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="search-page">
      <div className="search-bar">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search here..." />
      </div>
      <div>
        {events.map((event, idx) => (
          <div key={idx} onClick={clickImg(event.id)}>
            <div className="img">
              <img src={event.eventPoster} alt="" />
            </div>
            <div>
              <h1>{event.name}</h1>
              <span className="status">{event.eventType}</span>
              <div>
                <p>Lokasi: {event.Location.name}</p>
                <p>Mulai: {event.eventDate}</p>
                <p>Regestration Fee: {event.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
