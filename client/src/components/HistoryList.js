export default function HistoryList() {
    return (
        <>
            <div style={{ marginTop: "10vh" }} className="history-list text-center">
                <h1>History List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr style={{ backgroundColor: "#EAE3D2" }}>
                            <th scope="col">No.</th>
                            <th scope="col">Team Name</th>
                            <th scope="col">Event Name</th>
                            <th scope="col">Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>username</td>
                            <td>email</td>
                            <td>tanggal</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}