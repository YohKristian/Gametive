import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { addGames, fetchGames } from '../store/action/gamesAction';
import { errorPopup } from "../helpers";

export default function VerticalModalAddGame(props) {
    const dispacth = useDispatch();

    const [newGame, setNewGame] = useState({
        name: "",
        gameImg: "",
        youtubeUrl: "",
        gameUrl: "",
        releaseDate: "",
        developer: "",
        genre: "",
    });

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
            addGames(newGame, (error, success) => {
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
                        Add New Game
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
                                    value={newGame.name}
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
                                    value={newGame.gameImg}
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
                                    value={newGame.youtubeUrl}
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
                                    value={newGame.gameUrl}
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
                                    value={newGame.releaseDate}
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
                                    value={newGame.developer}
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
                                    value={newGame.genre}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <button
                                className="btn btn-primary btn-lg btn-block"
                                style={{ width: "420px", backgroundColor: "#FF7F3F" }}
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}