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
                    <Modal.Title id="contained-modal-title-vcenter">
                        Terms and Condition
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Halo</h1>
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