import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../store/action/gamesAction";
import { errorPopup } from "../helpers";
import GameRow from "../components/GameRow";
import VerticalModalAddGame from "../components/VerticalModalAddGame";
import Button from "react-bootstrap/Button";
import LoadingAnimation from "../components/LoadingAnimation";
import SearchBar from "../components/SearchBar";
import PaginationBar from "../components/PaginationBar";

export default function GamePage() {
  const dispacth = useDispatch();

  const game = useSelector((state) => {
    return state.game.game;
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
    if (page >= game.totalPages) {
      setPage(game.totalPages);
    } else if (page < 1) {
      setPage(1);
    } else {
      setPage(page);
    }
  };

  useEffect(() => {
    dispacth(
      fetchGames(page, search, (error, success) => {
        setLoading(false);

        if (error) {
          return errorPopup(error);
        }
        // console.log(success)
      })
    );
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
              <h2>Game</h2>
            </div>
            <div style={{ marginLeft: "75vh", paddingTop: "20px" }}>
              <Button variant="success" className="addbtn" onClick={() => setModalShow(true)}>
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
                  <tr style={{ backgroundColor: "orange" }}>
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
            <PaginationBar
              next={() => handlePage(game.currentPage + 1)}
              previous={() => handlePage(game.currentPage - 1)}
              current={game.currentPage}
              toPage={handlePage}
              totalPages={pageNumber(game.totalPages)}
            />
          </>
        )}
      </div>
    </div>
  );
}
