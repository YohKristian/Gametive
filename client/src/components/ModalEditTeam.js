import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";
export default function ModalEditTeam(props){
    const [newTeam,setNewTeam]= useState({
    name: "",
    CaptainName: "",
    MemberName1: "",
    MemberName2: "",
    MemberName3: "",
    MemberName4: "",
    BenchMemberName1: "",
    BenchMemberName2: ""
    })
    const {detailTeam}= useSelector((state)=> state.teamsReducer)

    const handleOnChangeForm=(e)=>{
        const{name,value}= e.target
        setNewTeam({...newTeam,
            [name]:value
        })
    }

    useEffect(()=>{
        setNewTeam({
            name: detailTeam.name,
            CaptainName: detailTeam.CaptainName,
            MemberName1: detailTeam.MemberName1,
            MemberName2: detailTeam.MemberName2,
            MemberName3: detailTeam.MemberName3,
            MemberName4: detailTeam.MemberName4,
            BenchMemberName1: detailTeam.BenchMemberName1,
            BenchMemberName2: detailTeam.BenchMemberName2,
        })
    },[])

    const handleOnSubmitForm=(e)=>{
        e.preventDefault();
        
    }

    return(
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
                <form onSubmit={handleOnSubmitForm}>
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
                            <label className="form-label" htmlFor="gameImg">
                                Captain Name
                            </label>
                            <input
                                type="text"
                                id="gameImg"
                                name="CaptainName"
                                className="form-control form-control-lg"
                                placeholder="Input your game Captain Name"
                                defaultValue={newTeam.CaptainName}
                                onChange={handleOnChangeForm}
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="youtubeUrl">
                               Member 1 
                            </label>
                            <input
                                type="text"
                                id="youtubeUrl"
                                name="MemberName1"
                                className="form-control form-control-lg"
                                placeholder="Input Member 1"
                                defaultValue={newTeam.MemberName1}
                                onChange={handleOnChangeForm}
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="youtubeUrl">
                               Member 2 
                            </label>
                            <input
                                type="text"
                                id="youtubeUrl"
                                name="MemberName2"
                                className="form-control form-control-lg"
                                placeholder="Input Member 2"
                                defaultValue={newTeam.MemberName2}
                                onChange={handleOnChangeForm}
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="youtubeUrl">
                               Member 3
                            </label>
                            <input
                                type="text"
                                id="youtubeUrl"
                                name="MemberName3"
                                className="form-control form-control-lg"
                                placeholder="Input Member 3"
                                defaultValue={newTeam.MemberName3}
                                onChange={handleOnChangeForm}
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="youtubeUrl">
                               Member 4
                            </label>
                            <input
                                type="text"
                                id="youtubeUrl"
                                name="MemberName4"
                                className="form-control form-control-lg"
                                placeholder="Input Member 4"
                                defaultValue={newTeam.MemberName4}
                                onChange={handleOnChangeForm}
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="gameUrl">
                                BenchMemberName 1
                            </label>
                            <input
                                type="text"
                                id="gameUrl"
                                name="BenchMemberName1"
                                className="form-control form-control-lg"
                                placeholder="Input BenchMemberName 1"
                                defaultValue={newTeam.BenchMemberName1}
                                onChange={handleOnChangeForm}
                            />
                        </div>

                        
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="gameUrl">
                                BenchMemberName 2
                            </label>
                            <input
                                type="text"
                                id="gameUrl"
                                name="BenchMemberName2"
                                className="form-control form-control-lg"
                                placeholder="Input BenchMemberName 2"
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