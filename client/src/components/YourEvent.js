import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchYourEvents } from "../store/actions";
import { dateFormat, errorPopup, rupiahFormat } from "../helpers";
import LoadingAnimation from "./LoadingAnimation";
import VerticalModalEditEvent from "./VerticalModalEditEvent";
const currentTime = new Date();

export default function SearchGames() {
  const navigate = useNavigate();
  const { yourEvents } = useSelector((state) => state.eventsReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState();
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);

  const pageNumber = (page) => {
    let pagination = [];
    for (let i = 1; i <= page; i++) {
      pagination.push(i);
    }
    return pagination;
  };

  const handlePage = (page) => {
    if (page >= yourEvents.totalPages) {
      setPage(yourEvents.totalPages);
    } else if (page < 1) {
      setPage(1);
    } else {
      setPage(page);
    }
  };

  const fetchData = () => {
    dispatch(fetchYourEvents(keyword, page))
      .catch((err) => {
        console.log(err);
        errorPopup(err);
      })
      .finally(() => setLoading(false));
  };

  const handleKeyword = (e) => {
    const { value } = e.target;
    setKeyword(value);
    setPage(1);
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
  }, [page]);

  const statusColor = (value) => {
    const styleObj = {
      Pending: ["#FFF9C4", "#F9A825"],
      Active: ["#C8E6C9", "#1B5E20"],
      Finished: ["#FFCCBC", "#BF360C"],
      Archived: ["#C5CAE9", "#1A237E"],
    };
    const [backgroundColor, color] = styleObj[value];
    return { backgroundColor, color };
  };

  return (
    <div className="main-page">
      <h1 className="event-title">Your Events</h1>
      <hr className="my-4"></hr>
      <div className="search-page">
        {!loading ? (
          <>
            <div className="search-bar">
              {yourEvents.items.length !== 0 && (
                <div>
                  <i
                    onClick={handleSearch}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                  <input
                    onKeyPress={handleEnter}
                    onChange={handleKeyword}
                    type="text"
                    placeholder="Search here..."
                  />
                </div>
              )}
            </div>
            <div>
              {yourEvents.items.length == 0 && (
                <h1 className="dont-have">You don't have any events!</h1>
              )}
              {yourEvents.items.map((event, idx) => (
                <div className="search-item" key={idx}>
                  <div className="img">
                    <img src={event.eventPoster} alt="" />
                  </div>
                  <div>
                    <h1 style={{ fontWeight: "bold" }}>{event.name}</h1>
                    <div>
                      <span
                        className="status"
                        style={{ ...statusColor(event.eventStatus) }}
                      >
                        {event.eventStatus}
                      </span>
                      <span
                        className="status"
                        style={{
                          marginLeft: 5,
                          backgroundColor: "#E0E0E0",
                          color: "#757575",
                        }}
                      >
                        {event.eventType}
                      </span>
                    </div>
                    <div>
                      <p>
                        <i className="bi bi-geo-alt-fill"></i>{" "}
                        {event.Location.name}
                      </p>
                      <p>
                        <i className="bi bi-flag-fill"></i>{" "}
                        {dateFormat(event.eventDate)}
                      </p>
                      <p>
                        <i className="bi bi-cash"></i>{" "}
                        {event.price === 0 ? "Free" : rupiahFormat(event.price)}
                      </p>
                      <p>
                        <i className="fa-solid fa-gamepad"></i>{" "}
                        {event.Game.name} <i className="fa-solid fa-slash"></i>{" "}
                        {event.Game.genre}
                      </p>
                      <div className="edit-event">
                        {event.eventStatus === "Pending" && (
                          <>
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "#FF8C00",
                                color: "white",
                              }}
                              onClick={() => {
                                setModal(true);
                              }}
                            >
                              Edit Event
                            </button>
                            <VerticalModalEditEvent
                              show={modal}
                              onHide={() => setModal(false)}
                              event_id={event.id}
                            />
                          </>
                        )}
                        {new Date(event.eventDate) <= currentTime &&
                          (event.eventStatus === "Pending" ||
                            event.eventStatus === "Active") && (
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "#FF8C00",
                                color: "white",
                                marginLeft: 5,
                              }}
                              onClick={toDetail(event.id)}
                            >
                              Edit Bracket
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {yourEvents.items.length > 0 && (
              <nav>
                <ul className="pagination">
                  <li className="page-item">
                    <a
                      className="page-link"
                      onClick={() => handlePage(yourEvents.currentPage - 1)}
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item pagination">
                    {pageNumber(yourEvents.totalPages).map((x, idx) => {
                      return (
                        <a
                          key={idx}
                          className="page-link"
                          onClick={() => handlePage(x)}
                        >
                          {x}
                        </a>
                      );
                    })}
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      onClick={() => handlePage(yourEvents.currentPage + 1)}
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </>
        ) : (
          <LoadingAnimation />
        )}
      </div>
    </div>
  );
}
