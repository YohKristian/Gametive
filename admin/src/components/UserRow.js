import { useState } from "react";
import VerticalModalEditPasswordUser from "../components/VerticalModalEditPasswordUser";
import Button from 'react-bootstrap/Button';

export default function UserRow(props) {

    const [modalShow, setModalShow] = useState(false);

    const handlerOnClickDelete = () => {
        console.log(props.user.id, "<<<< ID ITEM NIH")
    }

    return (
        <>
            <tr>
                <th scope="row">{props.idx + 1}</th>
                <td>{props.user.username}</td>
                <td>{props.user.email}</td>
                <td>{props.user.role}</td>
                <td>
                    <Button
                        variant="secondary"
                        onClick={() => { setModalShow(true); }}
                        style={{ marginRight: '10px' }}
                    >
                        <i className="bi bi-pencil-square"> Edit</i>
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