export default function UserRow(props) {

    const handlerOnClickEdit = () => {
        console.log(props.user.id, "<<<< ID ITEM NIH")
    }

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
                    <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ marginRight: "10px" }}
                        onClick={handlerOnClickEdit}
                    >
                        <i className="bi bi-pencil-square"> Edit</i>
                    </button>
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