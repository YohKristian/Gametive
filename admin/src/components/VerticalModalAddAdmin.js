import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { addNewAdmin, fetchUsers } from '../store/action/usersAction';
import { errorPopup } from "../helpers";

export default function VerticalModalAddAdmin(props) {
    const dispacth = useDispatch();

    const [newAdmin, setNewAdmin] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleOnChangeForm = (e) => {
        const { value, name } = e.target;

        setNewAdmin({
            ...newAdmin,
            [name]: value,
        });
    };

    const handleOnSubmitForm = (e) => {
        e.preventDefault();

        dispacth(
            addNewAdmin(newAdmin, (error, success) => {
                if (error) {
                    return errorPopup(error);
                }
                // console.log(success);

                dispacth(fetchUsers(1, { query: "" }, (error, success) => {
                    if (error) {
                        return errorPopup(error);
                    }
                    // console.log(success);
                }));

                props.onHide();
                setNewAdmin({
                    username: "",
                    email: "",
                    password: "",
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
                        Add New Admin
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleOnSubmitForm}>
                        <div
                            className="card-body text-center"
                            style={{ paddingLeft: "5", paddingRight: "5" }}
                        >
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form-control form-control-lg"
                                    placeholder="Input your username"
                                    value={newAdmin.username}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control form-control-lg"
                                    placeholder="Input your email"
                                    value={newAdmin.email}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control form-control-lg"
                                    placeholder="Input your password"
                                    value={newAdmin.password}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <button
                                className="btn btn-lg btn-block"
                                style={{ width: "420px", backgroundColor: "#FF7F3F", color: "white" }}
                                type="submit"
                            >
                                Register New Admin
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