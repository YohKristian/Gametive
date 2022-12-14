import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { errorPopup, successPopup } from "../helpers";
import { fetchTeams, submitEditDetailTeam } from "../store/actions";
export default function ModalEditTeam(props) {
    const dispatch = useDispatch();

    const [newTeam, setNewTeam] = useState({
        name: "",
        MemberName1: "",
        MemberName2: "",
        MemberName3: "",
        MemberName4: "",
        BenchMemberName1: "",
        BenchMemberName2: ""
    })

    const { detailTeam } = useSelector((state) => state.teamsReducer)

    const handleOnChangeForm = (e) => {
        const { name, value } = e.target
        setNewTeam({
            ...newTeam,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(detailTeam);
        if (detailTeam) {
            setNewTeam({
                name: detailTeam.name,
                MemberName1: detailTeam.MemberName1,
                MemberName2: detailTeam.MemberName2,
                MemberName3: detailTeam.MemberName3,
                MemberName4: detailTeam.MemberName4,
                BenchMemberName1: detailTeam.BenchMemberName1,
                BenchMemberName2: detailTeam.BenchMemberName2,
            })
        }
    }, [detailTeam])

    const handleOnSubmitFormModal = (e) => {
        e.preventDefault();

        dispatch(submitEditDetailTeam(+detailTeam.id, newTeam))
            .then(({ data }) => {
                // console.log(data);
                successPopup("Success Edit Team!");
            })
            .then(() => {
                return dispatch(fetchTeams())
                    .catch((error) => {
                        errorPopup(error);
                    })
            })
            .then(() => {
                props.onHide();
                setNewTeam({
                    name: "",
                    MemberName1: "",
                    MemberName2: "",
                    MemberName3: "",
                    MemberName4: "",
                    BenchMemberName1: "",
                    BenchMemberName2: ""
                });
            })
            .catch((error) => {
                errorPopup(error);
            })
    }

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
                        Edit Team
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleOnSubmitFormModal}>
                        <div
                            className="card-body text-center"
                            style={{ paddingLeft: "5", paddingRight: "5" }}
                        >
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="name">
                                    Team Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control form-control-lg"
                                    placeholder="Input your Team Name"
                                    defaultValue={newTeam.name}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="captainName">
                                    Captain Name
                                </label>
                                <input
                                    type="text"
                                    id="captainName"
                                    readOnly
                                    className="form-control form-control-lg"
                                    value="You are the captain team!"
                                    style={{ "fontWeight": "bold" }}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="MemberName1">
                                    Member 1
                                </label>
                                <input
                                    type="text"
                                    id="MemberName1"
                                    name="MemberName1"
                                    className="form-control form-control-lg"
                                    placeholder="Input Member 1"
                                    defaultValue={newTeam.MemberName1}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="MemberName2">
                                    Member 2
                                </label>
                                <input
                                    type="text"
                                    id="MemberName2"
                                    name="MemberName2"
                                    className="form-control form-control-lg"
                                    placeholder="Input Member 2"
                                    defaultValue={newTeam.MemberName2}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="MemberName3">
                                    Member 3
                                </label>
                                <input
                                    type="text"
                                    id="MemberName3"
                                    name="MemberName3"
                                    className="form-control form-control-lg"
                                    placeholder="Input Member 3"
                                    defaultValue={newTeam.MemberName3}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="MemberName4">
                                    Member 4
                                </label>
                                <input
                                    type="text"
                                    id="MemberName4"
                                    name="MemberName4"
                                    className="form-control form-control-lg"
                                    placeholder="Input Member 4"
                                    defaultValue={newTeam.MemberName4}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="BenchMemberName1">
                                    Reserve 1
                                </label>
                                <input
                                    type="text"
                                    id="BenchMemberName1"
                                    name="BenchMemberName1"
                                    className="form-control form-control-lg"
                                    placeholder="Input Reserve 1"
                                    defaultValue={newTeam.BenchMemberName1}
                                    onChange={handleOnChangeForm}
                                />
                            </div>


                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="BenchMemberName2">
                                    Reserve 2
                                </label>
                                <input
                                    type="text"
                                    id="BenchMemberName2"
                                    name="BenchMemberName2"
                                    className="form-control form-control-lg"
                                    placeholder="Input Reserve 2"
                                    defaultValue={newTeam.BenchMemberName2}
                                    onChange={handleOnChangeForm}
                                />
                            </div>

                            <button
                                className="btn btn-lg btn-block"
                                style={{ width: "420px", backgroundColor: "#FF7F3F", color: "white" }}
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn" style={{ backgroundColor: "#FF7F3F", color: "white" }} onClick={props.onHide}>Close</button >
                </Modal.Footer>
            </Modal>
        </>
    )
}