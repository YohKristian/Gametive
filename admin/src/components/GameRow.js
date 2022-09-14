import { useDispatch } from "react-redux"
import { dateFormat, errorPopup } from "../helpers";
import { deleteGame, fetchGameDetail, fetchGames } from "../store/action/gamesAction";
import VerticalModalEditGame from "../components/VerticalModalEditGame";
import Button from 'react-bootstrap/Button';
import { useState } from "react";

export default function GameRow(props) {
    const dispacth = useDispatch();

    const [modalShow, setModalShow] = useState(false);

    const handlerOnClickEdit = () => {
        dispacth(
            fetchGameDetail(props.game.id, (error, success) => {
                if (error) {
                    return errorPopup(error);
                }
                // console.log(success)
            })
        );
        setModalShow(true);
    }

    const handlerOnClickDelete = () => {
        dispacth(
            deleteGame(props.game.id, (error, success) => {
                if (error) {
                    return errorPopup(error);
                }
                // console.log(success)

                dispacth(fetchGames(1, { query: "" }, (error, success) => {
                    if (error) {
                        return errorPopup(error);
                    }
                    // console.log(success);
                }));
            })
        );
    }

    return (
        <>
            <tr>
                <th scope="row">{props.game.name}</th>
                <td>
                    <img src={props.game.gameImg} alt={props.game.name} />
                </td>
                <td>{dateFormat(props.game.releaseDate)}</td>
                <td>{props.game.developer}</td>
                <td>{props.game.genre}</td>
                <td>
                    <Button
                        variant="secondary"
                        onClick={handlerOnClickEdit}
                        style={{ marginRight: '10px' }}
                    >
                        <i className="bi bi-pencil-square"> Edit</i>
                    </Button>

                    <VerticalModalEditGame
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handlerOnClickDelete}
                    >
                        <i className="bi bi-trash3-fill"> Delete</i>
                    </button>
                </td>
            </tr>
        </>
    )
}