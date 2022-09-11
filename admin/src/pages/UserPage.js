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

  const [page, setPage] = useState(1)

  const onChangeSearch = (e) => {
    const { value, name } = e.target;

    setSearch({
      ...search,
      [name]: value,
    });

    setPage(1)
  }

  const pageNumber = (page) => {
    let pagination = []
    for (let i = 1; i <= page; i++) {
      pagination.push(i)
    }
    return pagination
  }

  const handlePage = (page) => {
    if (page >= user.totalPages) {
      setPage(user.totalPages)
    } else if (page < 1) {
      setPage(1)
    } else {
      setPage(page)
    }
  }

  useEffect(() => {
    dispacth(
      fetchUsers(page, search, (error, success) => {
        setLoading(false);

        if (error) {
          return errorPopup(error);
        }
      })
    );
  }, [search, page]);

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
                    user.items.map((user, idx) => {
                      return <UserRow key={user.id} user={user} idx={idx} />;
                    })}
                </tbody>
              </table>
            </div>
          </>
        )}
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" onClick={() => handlePage(user.currentPage - 1)}>
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item pagination">
              {pageNumber(user.totalPages).map((x) => {
                return <a className="page-link" onClick={() => handlePage(x)}>{x}</a>
              })}
            </li>
            <li className="page-item">
              <a className="page-link" onClick={() => handlePage(user.currentPage + 1)}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav >
      </div>
    </div>
  );
}
