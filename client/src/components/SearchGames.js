import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchEvents } from '../store/actions/events';

export default function SearchGames() {
  const navigate = useNavigate()
  const { events } = useSelector((state) => state.eventsReducer)
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  function clickImg() {
    navigate('/detail')
  }

  useEffect(() => {
    dispatch(fetchEvents())
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.message
        })
      })
      .finally(() => setLoading(false))
    console.log(events);
  }, [])

  useEffect(() => {
    console.log(events);
  }, [events])

  return (
    <div className="search-page">
      <div className="search-bar">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search here..." />
      </div>
      <div>
        {events.map((event, idx) => (
          <div>
            <div className="img">
              <img
                src={event.eventPoster}
                alt=""
                onClick={() => clickImg()}
              />
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
