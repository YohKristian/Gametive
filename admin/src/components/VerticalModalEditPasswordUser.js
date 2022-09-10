import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { addGames } from '../store/action/gamesAction';
import { errorPopup } from "../helpers";
import { updateUsersPassword } from '../store/action/usersAction';

export default function VerticalModalEditPasswordUser(props) {
    const dispacth = useDispatch();

    const [newPassword, setNewPassword] = useState({
        newPassword: ""
    });

    const handleOnChangeForm = (e) => {
        setNewPassword({
            newPassword: e.target.value
        });
    };

    const handleOnSubmitForm = (e) => {
        e.preventDefault();

        dispacth(
            updateUsersPassword(props.user_id, newPassword, (error, success) => {
                if (error) {
                    return errorPopup(error);
                }
                // console.log(success);
                props.onHide();
                setNewPassword("")
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
                        Set New Password For User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleOnSubmitForm}>
                        <div
                            className="card-body text-center"
                            style={{ paddingLeft: "5", paddingRight: "5" }}
                        >
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="newPassword">
                                    New Password
                                </label>
                                <input
                                    type="text"
                                    id="newPassword"
                                    name="newPassword"
                                    className="form-control form-control-lg"
                                    placeholder="Input new password"
                                    defaultValue={newPassword.newPassword}
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