import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../store/action/eventsActions";
import { errorPopup } from "../helpers";
import EventRow from "../components/EventRow";
import LoadingAnimation from "../components/LoadingAnimation";
import VerticalModalEditEvent from "../components/VerticalModalEditEvent";
import SearchBar from "../components/SearchBar";
import PaginationBar from "../components/PaginationBar";
import { fetchDetailEvent } from "../store/action/eventsActions";

export default function EventPage() {
  const dispatch = useDispatch();

  const event = useSelector((state) => {
    return state.event.event;
  });

  const [modalShow, setModalShow] = useState(false);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState({
    query: "",
  });

  const [page, setPage] = useState(1);

  const onChangeSearch = (e) => {
    const { value, name } = e.target;

    setSearch({
      ...search,
      [name]: value,
    });

    setPage(1);
  };

  const pageNumber = (page) => {
    let pagination = [];
    for (let i = 1; i <= page; i++) {
      pagination.push(i);
    }
    return pagination;
  };

  const handlePage = (page) => {
    if (page >= event.totalPages) {
      setPage(event.totalPages);
    } else if (page < 1) {
      setPage(1);
    } else {
      setPage(page);
    }
  };

  const handlerOnClickEdit = (id) => {
    setModalShow(true)
      dispatch(fetchDetailEvent(id, (error, success) => {
          if (error) {
              return errorPopup(error);
          }
          setModalShow(true);
      }))
  }

  useEffect(() => {
    setLoading(true);
    dispatch(fetchEvents(page, search))
      .catch((error) => errorPopup(error))
      .finally(() => setLoading(false));
  }, [search, page]);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <SearchBar value={search.query} onChange={onChangeSearch} />
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            <div style={{ paddingTop: "20px" }}>
              <h2>Event</h2>
            </div>
            <div
              style={{
                paddingTop: "30px",
                paddingLeft: "50px",
                paddingRight: "50px",
              }}
            >
              <VerticalModalEditEvent
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <table className="table table-striped">
                <thead>
                  <tr style={{ backgroundColor: "#EAE3D2" }}>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Event Poster</th>
                    <th scope="col">Event Type</th>
                    <th scope="col">Event Date</th>
                    <th scope="col">Location</th>
                    <th scope="col">User</th>
                    <th scope="col">Game</th>
                    <th scope="col">Event Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    event.items.map((item) => {
                      return <EventRow key={item.id} item={item} handlerOnClickEdit={() => handlerOnClickEdit(item.id)} />;
                    })}
                </tbody>
              </table>
            </div>
            <PaginationBar
              next={() => handlePage(event.currentPage + 1)}
              previous={() => handlePage(event.currentPage - 1)}
              current={handlePage}
              totalPages={pageNumber(event.totalPages)}
            />
          </>
        )}
      </div>
    </div>
  );
}
