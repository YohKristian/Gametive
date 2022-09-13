import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { errorPopup } from "../helpers";
import { updateUsersPassword } from '../store/actions/users';

export default function VerticalModalEditPasswordUser(props) {
    const dispacth = useDispatch();

    const [newPassword, setNewPassword] = useState({
        oldPassword: "",
        newPassword: ""
    });

    const handleOnChangeForm = (e) => {
        const { value, name } = e.target;

        setNewPassword({
            ...newPassword,
            [name]: value,
        });
    };

    const handleOnSubmitForm = (e) => {
        e.preventDefault();

        dispacth(
            updateUsersPassword(props.username, newPassword, (error, success) => {
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
                        Set New Password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleOnSubmitForm}>
                        <div
                            className="card-body text-center"
                            style={{ paddingLeft: "5", paddingRight: "5" }}
                        >
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="oldPassword">
                                    Old Password
                                </label>
                                <input
                                    type="password"
                                    id="oldPassword"
                                    name="oldPassword"
                                    className="form-control form-control-lg"
                                    placeholder="Input new password"
                                    defaultValue={newPassword.oldPassword}
                                    onChange={handleOnChangeForm}
                                />
                                <label className="form-label" htmlFor="newPassword">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    className="form-control form-control-lg"
                                    placeholder="Input new password"
                                    defaultValue={newPassword.newPassword}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <button
                                className="btn"
                                style={{ width: "420px", backgroundColor: "orange", color: "white" }}
                                type="submit"
                                onClick={props.onHide}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn"
                        style={{ backgroundColor: "orange", color: "white" }}
                        onClick={props.onHide}
                    >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}