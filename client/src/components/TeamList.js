import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTeam, fetchDetailTeam } from "../store/actions/teams";
import { errorPopup, successPopup } from "../helpers";
import { fetchTeams, createTeam } from "../store/actions";
import LoadingAnimation from "./LoadingAnimation";
import ModalEditTeam from "./ModalEditTeam";
import VerticalModalAddTeam from "../components/VerticalModalAddTeam"

export default function TeamList() {
  // const [teamList, setTeamList] = useState([]);
  const { teams } = useSelector((state) => state.teamsReducer);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [modal, setModalShow] = useState(false);
  const [modalTeam, setModalTeam] = useState(false);

  const fetchTeamsOnLoad = () => {
    dispatch(fetchTeams())
      .catch((error) => {
        console.log(error);
        errorPopup(error);
      })
      .finally(() => setLoading(false));
    // setLoading(false);
  };

  useEffect(() => {
    fetchTeamsOnLoad();
  }, []);

  const onDeleteClickHandler = (teamId) => {
    dispatch(deleteTeam(teamId))
      .then(({ data }) => {
        // console.log(data);
        dispatch(fetchTeams());
        successPopup("Success Delete Team!");
      })
      .catch((error) => {
        console.log(error);
        errorPopup(error);
      });
  };

  const editModalTeam = (ids) => {
    dispatch(fetchDetailTeam(ids))
      .catch((error) => {
        console.log(error);
        errorPopup(error);
      })
      .finally(() => {
        setModalShow(true);
      })
  };

  return (
    <>
      <div id='top'></div>
      {!isLoading && teams ? (
        <>
          {teams.length === 0 && (
            <div>
              <h1 className="dont-have-team">You don't have any team!</h1>
              <div className="add-team">
                <button className="btn" style={{ backgroundColor: "orange", color: "white" }} onClick={() => { setModalTeam(true); }}> Create Team</button>
                <VerticalModalAddTeam
                  show={modalTeam}
                  onHide={() => setModalTeam(false)}
                />
              </div>
            </div>
          )}
          {teams.length !== 0 && (
            <>
              <h3 className='text-center list-team'>
                <b>List of your Team</b>
              </h3>
              <ModalEditTeam show={modal} onHide={() => setModalShow(false)} />
              <hr></hr>
              <br></br>
              <div className='container'>
                <div className="add-team">
                  <button className="btn" style={{ backgroundColor: "#FF8C00", color: "white" }} onClick={() => { setModalTeam(true); }}> Create Team</button>
                  <VerticalModalAddTeam
                    show={modalTeam}
                    onHide={() => setModalTeam(false)}
                  />
                </div>
                <div className='row'>
                  {teams.map((team, idx) => (
                    <div className='col-12 col-md-4' key={idx}>
                      <div
                        className='card text-white mb-3'
                        style={{ maxWidth: "18rem", height: "550px" }}
                      >
                        <div
                          className='card-header'
                          style={{ backgroundColor: "#FFB562" }}
                        >
                          <div className='row'>
                            <div className='col-6'>
                              <span
                                style={{
                                  fontSize: "1.1rem",
                                  fontWeight: "bold",
                                }}
                              >
                                {team.name}
                              </span>
                            </div>
                            <div className='col-2'>
                              <i
                                className='bi bi-pencil-square'
                                style={{ cursor: "pointer", color: "black" }}
                                onClick={() => {
                                  editModalTeam(team.id)
                                }}
                              ></i>
                            </div>
                            <div className='col-2'>
                              <i
                                className='bi bi-x-square'
                                style={{ cursor: "pointer", color: "red" }}
                                onClick={() => {
                                  onDeleteClickHandler(team.id);
                                }}
                              ></i>
                            </div>
                          </div>
                        </div>
                        <div
                          className='card-body'
                          style={{ backgroundColor: "#FF8C00" }}
                        >
                          <h5 className='text-center'>Player Roster</h5>
                          <hr></hr>
                          <div className='row'>
                            <div className='col-8 my-auto'>
                              <p className='text-center'>
                                <b>Name</b>
                              </p>
                              <h5 className='card-title'>{team.CaptainName}</h5>
                              <p className='card-text'>
                                {team.MemberName1 && team.MemberName1}
                              </p>
                              <p className='card-text'>
                                {team.MemberName2 && team.MemberName2}
                              </p>
                              <p className='card-text'>
                                {team.MemberName3 && team.MemberName3}
                              </p>
                              <p className='card-text'>
                                {team.MemberName4 && team.MemberName4}
                              </p>
                              <p className='card-text'>
                                {team.MemberName5 && team.MemberName5}
                              </p>
                              <p className='text-center'>
                                <b>Benches</b>
                              </p>
                              <p className='card-text'>
                                {team.BenchMemberName1 && team.BenchMemberName1}
                              </p>
                              <p className='card-text'>
                                {team.BenchMemberName2 && team.BenchMemberName2}
                              </p>
                            </div>
                            <div className='col-4 text-center my-auto'>
                              <p className=''>
                                <b>Pos.</b>
                              </p>
                              <p className='card-text'>
                                {team.CaptainName && "1"}
                              </p>
                              <p className='card-text'>
                                {team.MemberName1 && "2"}
                              </p>
                              <p className='card-text'>
                                {team.MemberName2 && "3"}
                              </p>
                              <p className='card-text'>
                                {team.MemberName3 && "4"}
                              </p>
                              <p className='card-text'>
                                {team.MemberName4 && "5"}
                              </p>
                              <h6 className='card-title'>No</h6>
                              <p className='card-text'>
                                {team.BenchMemberName1 && "1"}
                              </p>
                              <p className='card-text'>
                                {team.BenchMemberName2 && "2"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br></br>
                      <br></br>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <LoadingAnimation />
      )
      }
    </>
  );
}
