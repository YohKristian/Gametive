import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchGames } from "../store/action/gamesAction";
import { errorPopup } from "../helpers";
import GameRow from "../components/GameRow";
import VerticalModalAddGame from "../components/VerticalModalAddGame";
import Button from 'react-bootstrap/Button';

export default function GamePage() {
  const dispacth = useDispatch();

  const game = useSelector((state) => {
    return state.game.game;
  })

  const [loading, setLoading] = useState(true);

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispacth(
      fetchGames((error, success) => {
        if (error) {
          return errorPopup(error);
        }
        // console.log(success)
        setLoading(false);
      })
    );
  }, [])

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ paddingTop: '50px' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#FF7F3F', position: 'absolute', paddingTop: '6px', paddingLeft: '5px', fontSize: '25px' }} ></i>
          <input style={{ width: '800px', height: '40px', paddingLeft: '40px', paddingBottom: '5px' }} type='text' placeholder="Search Here..." />
        </div>
        <div style={{ paddingTop: '20px' }}>
          <h2>Game</h2>
        </div>
        <div style={{ marginLeft: '75vh', paddingTop: '20px' }}>
          <Button variant="success" onClick={() => setModalShow(true)}>
            <i className="bi bi-clipboard2-plus"> Add New Game</i>
          </Button>

          <VerticalModalAddGame
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
        <div style={{ paddingTop: "30px", paddingLeft: '50px', paddingRight: '50px' }}>
          <table className="table table-striped">
            <thead>
              <tr style={{ backgroundColor: '#EAE3D2' }}>
                <th scope="col">Name</th>
                <th scope="col">Game Poster</th>
                <th scope="col">Release Date</th>
                <th scope="col">Developer</th>
                <th scope="col">Genre</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr>
                <td colSpan={6}>Loading</td>
              </tr>}
              {!loading && game.items.map(game => {
                return <GameRow key={game.id} game={game} />
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}