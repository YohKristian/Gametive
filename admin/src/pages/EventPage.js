import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../store/action/eventsActions";
import { errorPopup } from "../helpers";
import EventRow from "../components/EventRow";
import LoadingAnimation from "../components/LoadingAnimation";

export default function EventPage() {
  const dispacth = useDispatch();

  const event = useSelector((state) => {
    return state.event.event;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispacth(
      fetchEvents((error, success) => {
        if (error) {
          return errorPopup(error);
        }
        // console.log(success)
        setLoading(false);
      })
    );
  }, []);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <div style={{ paddingTop: "50px" }}>
          <i
            className="fa-solid fa-magnifying-glass"
            style={{
              color: "#FF7F3F",
              position: "absolute",
              paddingTop: "6px",
              paddingLeft: "5px",
              fontSize: "25px",
            }}
          ></i>
          <input
            style={{
              width: "800px",
              height: "40px",
              paddingLeft: "40px",
              paddingBottom: "5px",
            }}
            type="text"
            placeholder="Search Here..."
          />
        </div>
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
                      return <EventRow key={item.id} item={item} />;
                    })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
