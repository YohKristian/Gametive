import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/action/usersAction";
import { errorPopup } from "../helpers";
import UserRow from "../components/UserRow";
import LoadingAnimation from "../components/LoadingAnimation";
import SearchBar from "../components/SearchBar";
import PaginationBar from "../components/PaginationBar";
import VerticalModalAddAdmin from "../components/VerticalModalAddAdmin";
import Button from "react-bootstrap/Button";

export default function UserPage() {
  const dispacth = useDispatch();

  const user = useSelector((state) => {
    return state.user.user;
  });

  const [loading, setLoading] = useState(true);

  const [modalShow, setModalShow] = useState(false);

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
    if (page >= user.totalPages) {
      setPage(user.totalPages);
    } else if (page < 1) {
      setPage(1);
    } else {
      setPage(page);
    }
  };

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
    <div className="main-page">
      <h2 style={{ textAlign: "center" }}>User List</h2>
      <hr className="my-4"></hr>
      <div style={{ textAlign: "center" }}>
        <SearchBar value={search.query} onChange={onChangeSearch} />
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            <div style={{ marginLeft: "75vh", paddingTop: "20px" }}>
              <Button variant="success" className="addbtn" onClick={() => setModalShow(true)}>
                <i className="bi bi-person-plus"> Add New Admin</i>
              </Button>

              <VerticalModalAddAdmin
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
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
                  <tr style={{ backgroundColor: "orange" }}>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    user.items.map((user) => {
                      return <UserRow key={user.id} user={user} />;
                    })}
                </tbody>
              </table>
            </div>
            <PaginationBar
              next={() => handlePage(user.currentPage + 1)}
              previous={() => handlePage(user.currentPage - 1)}
              current={user.currentPage}
              toPage={handlePage}
              totalPages={pageNumber(user.totalPages)}
            />
          </>
        )}
      </div>
    </div>
  );
}
