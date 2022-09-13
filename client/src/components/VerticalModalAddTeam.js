import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorPopup } from "../helpers";
import { fetchTeams, createTeam } from "../store/actions";

export default function VerticalModalAddTeam(props) {
    const dispatch = useDispatch();

    const objFormTeam = {
        teamName: "",
        memberOne: "",
        memberTwo: "",
        memberThree: "",
        memberFour: "",
        benchOne: "",
        benchTwo: "",
    };

    const [formTeam, setFormTeam] = useState({ ...objFormTeam });

    const handleOnChangeForm = (event) => {
        const { name, value } = event.target;
        setFormTeam({
            ...formTeam,
            [name]: value,
        });
    };

    const handleOnSubmitForm = (event) => {
        event.preventDefault();
        setFormTeam((prev) => ({
            ...prev,
            ...formTeam,
        }));

        dispatch(
            createTeam({
                name: formTeam.teamName,
                MemberName1: formTeam.memberOne,
                MemberName2: formTeam.memberTwo,
                MemberName3: formTeam.memberThree,
                MemberName4: formTeam.memberFour,
                BenchMemberName1: formTeam.benchOne,
                BenchMemberName2: formTeam.benchTwo,
            })
        )
            .then(() => {

                dispatch(fetchTeams())
                    .catch((error) => {
                        console.log(error);
                        errorPopup(error);
                    });

                window.scrollTo(0, 0);
            })
            .catch((error) => {
                console.log(error);
                errorPopup(error);
            });
    };

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
                        Create your team
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleOnSubmitForm}>
                        <div
                            className="card-body text-center"
                            style={{ paddingLeft: "5", paddingRight: "5" }}
                        >
                            <div className="form-outline mb-4">
                                <label htmlFor='teamName' className="form-label">Team Name</label>
                                <input
                                    type='text'
                                    id='teamName'
                                    placeholder='Natus Vincere'
                                    name='teamName'
                                    value={formTeam.teamName}
                                    onChange={(event) => handleOnChangeForm(event)}
                                    className="form-control form-control-lg"
                                />
                                <br></br>
                                <label htmlFor='captainName' className="form-label">Captain Name</label>
                                <input
                                    type='text'
                                    id="captainName"
                                    value={"You are the captain team!"}
                                    readOnly
                                    style={{ "fontWeight": "bold" }}
                                    className="form-control form-control-lg"
                                />
                                <br></br>
                                <label htmlFor='memberOne' className="form-label">Team Member 1</label>
                                <input
                                    type='text'
                                    id='memberOne'
                                    placeholder='Member 1'
                                    name='memberOne'
                                    value={formTeam.memberOne}
                                    onChange={(event) => handleOnChangeForm(event)}
                                    className="form-control form-control-lg"
                                />
                                <br></br>
                                <label htmlFor='memberTwo' className="form-label">Team Member 2</label>
                                <input
                                    type='text'
                                    id='memberTwo'
                                    placeholder='Member 2'
                                    name='memberTwo'
                                    value={formTeam.memberTwo}
                                    onChange={(event) => handleOnChangeForm(event)}
                                    className="form-control form-control-lg"
                                />
                                <br></br>
                                <label htmlFor='memberThree' className="form-label">Team Member 3</label>
                                <input
                                    type='text'
                                    id='memberThree'
                                    placeholder='Member 3'
                                    name='memberThree'
                                    value={formTeam.memberThree}
                                    onChange={(event) => handleOnChangeForm(event)}
                                    className="form-control form-control-lg"
                                />
                                <br></br>
                                <label htmlFor='memberFour' className="form-label">Team Member 4</label>
                                <input
                                    type='text'
                                    id='memberFour'
                                    placeholder='Member 4'
                                    name='memberFour'
                                    value={formTeam.memberFour}
                                    onChange={(event) => handleOnChangeForm(event)}
                                    className="form-control form-control-lg"
                                />
                                <br></br>
                                <label htmlFor='benchOne' className="form-label">Reserve 1</label>
                                <input
                                    type='text'
                                    id='benchOne'
                                    placeholder='Reserve 1'
                                    name='benchOne'
                                    value={formTeam.benchOne}
                                    onChange={(event) => handleOnChangeForm(event)}
                                    className="form-control form-control-lg"
                                />
                                <br></br>
                                <label htmlFor='benchTwo' className="form-label">Reserve 2</label>
                                <input
                                    type='text'
                                    id='benchTwo'
                                    placeholder='Reserve 2'
                                    name='benchTwo'
                                    value={formTeam.benchTwo}
                                    onChange={(event) => handleOnChangeForm(event)}
                                    className="form-control form-control-lg"
                                />
                            </div>
                            <br></br>
                            <button
                                className="btn btn-lg"
                                style={{ width: "420px", backgroundColor: "orange", color: "white" }}
                                type="submit"
                            >
                                Create
                            </button>
                        </div>
                    </form>

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