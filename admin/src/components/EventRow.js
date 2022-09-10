export default function EventRow(props) {

    const handlerOnClickEdit = () => {
        console.log(props.item.id, "<<<< ID ITEM NIH")
    }

    const handlerOnClickDelete = () => {
        console.log(props.item.id, "<<<< ID ITEM NIH")
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(price);
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
                <th scope="row">{props.item.name}</th>
                <td>{formatPrice(props.item.price)}</td>
                <td><img style={{ width: '100px', height: '100px' }} src={props.item.eventPoster} alt={props.item.name} /></td>
                <td>{props.item.eventType}</td>
                <td>{formatDate(props.item.eventDate)}</td>
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
                            <i className="bi bi-pencil-square"> Edit</i>
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handlerOnClickDelete}
                        >
                            <i className="bi bi-trash3-fill"> Delete</i>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}