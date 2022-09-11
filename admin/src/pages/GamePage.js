import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../store/action/gamesAction";
import { errorPopup } from "../helpers";
import GameRow from "../components/GameRow";
import VerticalModalAddGame from "../components/VerticalModalAddGame";
import Button from "react-bootstrap/Button";
import LoadingAnimation from "../components/LoadingAnimation";

export default function GamePage() {
  const dispacth = useDispatch();

  const game = useSelector((state) => {
    return state.game.game;
  });

  const [loading, setLoading] = useState(true);

  const [modalShow, setModalShow] = useState(false);

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
    if (page >= game.totalPages) {
      setPage(game.totalPages)
    } else if (page < 1) {
      setPage(1)
    } else {
      setPage(page)
    }

  }

  useEffect(() => {
    dispacth(
      fetchGames(page, search, (error, success) => {
        if (error) {
          return errorPopup(error);
        }
        // console.log(success)
        setLoading(false);
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
              <h2>Game</h2>
            </div>
            <div style={{ marginLeft: "75vh", paddingTop: "20px" }}>
              <Button variant="success" onClick={() => setModalShow(true)}>
                <i className="bi bi-clipboard2-plus"> Add New Game</i>
              </Button>

              <VerticalModalAddGame
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
                  <tr style={{ backgroundColor: "#EAE3D2" }}>
                    <th scope="col">Name</th>
                    <th scope="col">Game Poster</th>
                    <th scope="col">Release Date</th>
                    <th scope="col">Developer</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    game.items.map((game) => {
                      return <GameRow key={game.id} game={game} />;
                    })}
                </tbody>
              </table>
            </div>
          </>
        )}
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" onClick={() => handlePage(game.currentPage - 1)}>
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item pagination">
              {pageNumber(game.totalPages).map((x) => {
                return <a className="page-link" onClick={() => handlePage(x)}>{x}</a>
              })}
            </li>
            <li className="page-item">
              <a className="page-link" onClick={() => handlePage(game.currentPage + 1)}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav >
      </div>
    </div>
  );
}
