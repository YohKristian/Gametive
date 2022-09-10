export default function EventRow(props) {

    const handlerOnClickEdit = () => {
        console.log(props.item.id, "<<<< ID ITEM NIH")
    }

    const handlerOnClickDelete = () => {
        console.log(props.item.id, "<<<< ID ITEM NIH")
    }

    return (
        <>
            <tr>
                <th scope="row">{props.item.name}</th>
                <td>{props.item.price}</td>
                <td><img style={{ width: '100px', height: '100px' }} src={props.item.eventPoster} alt={props.item.name} /></td>
                <td>{props.item.eventType}</td>
                <td>{props.item.eventDate}</td>
                <td>{props.item.Location.name}</td>
                <td>{props.item.User.username}</td>
                <td>{props.item.Game.name}</td>
                <td><p style={{ backgroundColor: '#59CE8F', borderRadius: '10px' }}>{props.item.eventStatus}</p></td>
                <td >
                    <div className="d-flex flex-column">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ marginBottom: '10px' }}
                            onClick={handlerOnClickEdit}
                        >
                            <i class="bi bi-pencil-square"> Edit</i>
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handlerOnClickDelete}
                        >
                            <i class="bi bi-trash3-fill"> Delete</i>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}