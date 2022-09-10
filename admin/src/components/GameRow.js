export default function EventRow(props) {

    const handlerOnClickEdit = () => {
        console.log(props.game.id, "<<<< ID ITEM NIH")
    }

    const handlerOnClickDelete = () => {
        console.log(props.game.id, "<<<< ID ITEM NIH")
    }

    return (
        <>
            <tr>
                <th scope="row">{props.game.name}</th>
                <td><img style={{ width: '100px', height: '100px' }} src={props.game.gameImg} alt={props.game.name} /></td>
                <td>{props.game.releaseDate}</td>
                <td>{props.game.developer}</td>
                <td>{props.game.genre}</td>
                <td>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ marginRight: '10px' }}
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
                </td>
            </tr>
        </>
    )
}