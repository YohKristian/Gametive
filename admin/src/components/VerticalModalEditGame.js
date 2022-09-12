import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, submitEditGameDetail } from '../store/action/gamesAction';
import { errorPopup } from "../helpers";

export default function VerticalModalEditGame(props) {
    const dispacth = useDispatch();

    const detail_game = useSelector((state) => {
        return state.game.detailGame;
    })

    const [newGame, setNewGame] = useState({
        name: "",
        gameImg: "",
        youtubeUrl: "",
        gameUrl: "",
        releaseDate: "",
        developer: "",
        genre: "",
    });

    useEffect(() => {
        let populateDate = new Date(detail_game.releaseDate);
        let newFormat = ``;

        if ((populateDate.getDate()) < 10 && (populateDate.getMonth()) < 10) {
            newFormat = `${populateDate.getFullYear()}-0${populateDate.getMonth() + 1}-0${populateDate.getDate()}`
        } else if ((populateDate.getDate()) < 10) {
            newFormat = `${populateDate.getFullYear()}-${populateDate.getMonth() + 1}-0${populateDate.getDate()}`
        } else if ((populateDate.getMonth()) < 10) {
            newFormat = `${populateDate.getFullYear()}-0${populateDate.getMonth() + 1}-${populateDate.getDate()}`
        }

        setNewGame({
            name: detail_game.name,
            gameImg: detail_game.gameImg,
            youtubeUrl: detail_game.youtubeUrl,
            gameUrl: detail_game.gameUrl,
            releaseDate: newFormat,
            developer: detail_game.developer,
            genre: detail_game.genre,
        })
    }, [detail_game])

    const handleOnChangeForm = (e) => {
        const { value, name } = e.target;

        setNewGame({
            ...newGame,
            [name]: value,
        });
    };

    const handleOnSubmitForm = (e) => {
        e.preventDefault();

        dispacth(
            submitEditGameDetail(+detail_game.id, newGame, (error, success) => {
                if (error) {
                    return errorPopup(error);
                }
                // console.log(success);
                dispacth(fetchGames());
                props.onHide();
                setNewGame({
                    name: "",
                    gameImg: "",
                    youtubeUrl: "",
                    gameUrl: "",
                    releaseDate: "",
                    developer: "",
                    genre: "",
                })
            })
        );
    };

    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Game
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleOnSubmitForm}>
                        <div
                            className="card-body text-center"
                            style={{ paddingLeft: "5", paddingRight: "5" }}
                        >
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="name">
                                    Game Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control form-control-lg"
                                    placeholder="Input your game name"
                                    defaultValue={newGame.name}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="gameImg">
                                    Game Image Url
                                </label>
                                <input
                                    type="text"
                                    id="gameImg"
                                    name="gameImg"
                                    className="form-control form-control-lg"
                                    placeholder="Input your game image url"
                                    defaultValue={newGame.gameImg}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="youtubeUrl">
                                    Youtube Video Url
                                </label>
                                <input
                                    type="text"
                                    id="youtubeUrl"
                                    name="youtubeUrl"
                                    className="form-control form-control-lg"
                                    placeholder="Input your game image url"
                                    defaultValue={newGame.youtubeUrl}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="gameUrl">
                                    Game Download Url
                                </label>
                                <input
                                    type="text"
                                    id="gameUrl"
                                    name="gameUrl"
                                    className="form-control form-control-lg"
                                    placeholder="Input your game image url"
                                    defaultValue={newGame.gameUrl}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="releaseDate">
                                    Release Date
                                </label>
                                <input
                                    type="date"
                                    id="releaseDate"
                                    name="releaseDate"
                                    className="form-control form-control-lg"
                                    defaultValue={newGame.releaseDate}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="developer">
                                    Developer
                                </label>
                                <input
                                    type="text"
                                    id="developer"
                                    name="developer"
                                    className="form-control form-control-lg"
                                    placeholder="Input your game developer"
                                    defaultValue={newGame.developer}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="genre">
                                    Genre
                                </label>
                                <input
                                    type="text"
                                    id="genre"
                                    name="genre"
                                    className="form-control form-control-lg"
                                    placeholder="Input your game genre"
                                    defaultValue={newGame.genre}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <button
                                className="btn btn-lg btn-block"
                                style={{ width: "420px", backgroundColor: "#FF7F3F", color: "white" }}
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn" style={{ backgroundColor: "#FF7F3F", color: "white" }} onClick={props.onHide}>Close</button >
                </Modal.Footer>
            </Modal>
        </>
    );
}