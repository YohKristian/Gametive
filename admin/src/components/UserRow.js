import { useState } from "react";
import VerticalModalEditPasswordUser from "../components/VerticalModalEditPasswordUser";
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { deleteUser, fetchUsers } from "../store/action/usersAction";
import { errorPopup, infoPopup, successPopup } from "../helpers";
import Swal from "sweetalert2";

export default function UserRow(props) {
    const dispatch = useDispatch();

    const [modalShow, setModalShow] = useState(false);

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
                dispatch(
                    deleteUser(props.user.id, (error, success) => {
                        if (error) {
                            return errorPopup(error);
                        }
                        successPopup("Success delete user")

                        dispatch(fetchUsers(1, { query: "" }, (error, success) => {
                            if (error) {
                                return errorPopup(error);
                            }
                        }));
                    })
                )
            } else if (result.isDenied) {
                infoPopup("Delete cancelled")
            }
        })
    }

    return (
        <>
            <tr>
                <th scope="row">{props.user.id}</th>
                <td>{props.user.username}</td>
                <td>{props.user.email}</td>
                <td>{props.user.role}</td>
                <td>
                    <Button
                        variant="secondary"
                        onClick={() => { setModalShow(true); }}
                        style={{ marginRight: '10px' }}
                    >
                        <i className="bi bi-pencil-square"> Set Password</i>
                    </Button>

                    <VerticalModalEditPasswordUser
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        user_id={props.user.id}
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