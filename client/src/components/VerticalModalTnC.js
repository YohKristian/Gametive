import Modal from 'react-bootstrap/Modal';

export default function VerticalModalTnC(props) {
    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='ModalTitleTnC'>
                        Terms and Condition
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='TnC'>
                        <h3 className='text-center'>Berikut ketentuan penggunaan website kami : </h3>
                        <hr class="my-4"></hr>
                        <ol>
                            <li>User bertanggung jawab atas informasi yang di berikan / yang di daftarkan sebagai event yang akan kami promosikan di website kami, jika user melakukan pelanggaran peraturan ini beberapa kali maka, dari pihak Gametive kami berhak untuk menghentikan layanan penggunaan user dengan cara menghapus user dari layanan kami.</li>
                            <li>User dalam hal mengadakan sebuah event yang berbayar, kami dari pihak Gametive berhak untuk mengambil Rp 5.000,00 untuk setiap event yang di adakan yang menggunakan melalui layanan kami.</li>
                            <li>Jika dalam suatu kasus User dalam hal mengadakan sebuah event yang gratis, kami dari pihak Gametive tidak akan mengambil biaya apapun untuk setiap event yang di adakan yang menggunakan melalui layanan kami.</li>
                            <li>User bertanggung jawab atas informasi yang di berikan / yang di daftarkan saat mengisi informasi, user bertanggung jawab atas informasi yang sudah di masukan seperti username, email, dan password. User harus menjaga kerahasiaan password masing - masing.</li>
                            <li>User yang lupa terhadap password yang sudah di buat dapat menghubungi pihak admin kami melalui gametive@gmail.com untuk mengajukan request permintaan reset password.</li>
                        </ol>
                    </div>
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