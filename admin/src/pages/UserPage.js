import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/action/usersAction";
import { errorPopup } from "../helpers";
import UserRow from "../components/UserRow";
import LoadingAnimation from "../components/LoadingAnimation";

export default function UserPage() {
  const dispacth = useDispatch();

  const user = useSelector((state) => {
    return state.user.user;
  });

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState({
    query: "",
  })

  const onChangeSearch = (e) => {
    const { value, name } = e.target;

    setSearch({
      ...search,
      [name]: value,
    });
  }

  useEffect(() => {
    dispacth(
      fetchUsers((error, success) => {
        if (error) {
          return errorPopup(error);
        }
        console.log(success);
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
            name="query"
            value={search.query}
            onChange={onChangeSearch}
          />
        </div>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            <div style={{ paddingTop: "20px" }}>
              <h2>User</h2>
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
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    user.map((user, idx) => {
                      return <UserRow key={user.id} user={user} idx={idx} />;
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
