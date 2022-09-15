import { useDispatch } from "react-redux"
import { dateFormat, errorPopup, infoPopup, successPopup } from "../helpers";
import { deleteGame, fetchGameDetail, fetchGames } from "../store/action/gamesAction";
import VerticalModalEditGame from "../components/VerticalModalEditGame";
import { useState } from "react";
import Swal from "sweetalert2";

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
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: false,
            denyButtonText: `Cancel`,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispacth(
                    deleteGame(props.game.id, (error, success) => {
                        if (error) {
                            return errorPopup(error);
                        }
                        successPopup("Success delete game")

                        dispacth(fetchGames(1, { query: "" }, (error, success) => {
                            if (error) {
                                return errorPopup(error);
                            }
                            // console.log(success);
                        }));
                    })
                );
            } else if (result.isDenied) {
                infoPopup("Delete cancelled")
            }
        })
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
                <td className="action">
                    <div>
                        <button
                            className="btn btn-secondary"
                            onClick={handlerOnClickEdit}
                        >
                            <i className="bi bi-pencil-square"></i>
                            <span>Edit</span>
                        </button>
                        <VerticalModalEditGame
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handlerOnClickDelete}
                        >
                            <i className="bi bi-trash3-fill"></i>
                            <span>Delete</span>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}