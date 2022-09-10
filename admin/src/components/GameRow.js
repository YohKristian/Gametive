export default function GameRow(props) {

    const handlerOnClickEdit = () => {
        console.log(props.game.id, "<<<< ID ITEM NIH")
    }

    const handlerOnClickDelete = () => {
        console.log(props.game.id, "<<<< ID ITEM NIH")
    }

    const formatDate = (date) => {
        const d = new Date(date);
        const day = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
        ];
        const month = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];
        return `${day[d.getDay()]}, ${d.getDate()} ${month[d.getMonth()]
            } ${d.getFullYear()}`;
    }

    return (
        <>
            <tr>
                <th scope="row">{props.game.name}</th>
                <td><img style={{ width: '100px', height: '100px' }} src={props.game.gameImg} alt={props.game.name} /></td>
                <td>{formatDate(props.game.releaseDate)}</td>
                <td>{props.game.developer}</td>
                <td>{props.game.genre}</td>
                <td>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ marginRight: '10px' }}
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