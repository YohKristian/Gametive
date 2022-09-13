import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTeam, fetchDetailTeam } from "../store/actions/teams";
import { errorPopup, successPopup } from "../helpers";
import { fetchTeams, createTeam } from "../store/actions";
import LoadingAnimation from "./LoadingAnimation";
import ModalEditTeam from "./ModalEditTeam";
import VerticalModalAddTeam from "../components/VerticalModalAddTeam";

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
      });
  };

  return (
    <>
      {!isLoading && teams ? (
        <>
          {teams.length === 0 && (
            <div>
              <h1 className="dont-have-team">You don't have any team!</h1>
              <div className="add-team">
                <button
                  className="btn"
                  style={{ backgroundColor: "orange", color: "white" }}
                  onClick={() => {
                    setModalTeam(true);
                  }}
                >
                  {" "}
                  Create Team
                </button>
                <VerticalModalAddTeam
                  show={modalTeam}
                  onHide={() => setModalTeam(false)}
                />
              </div>
            </div>
          )}
          {teams.length !== 0 && (
            <>
              <h3 className="text-center list-team">
                <b>List of your Team</b>
              </h3>
              <ModalEditTeam show={modal} onHide={() => setModalShow(false)} />
              <div className="container">
                <div className="add-team">
                  <button
                    className="btn"
                    style={{ backgroundColor: "#FF8C00", color: "white" }}
                    onClick={() => {
                      setModalTeam(true);
                    }}
                  >
                    {" "}
                    Create Team
                  </button>
                  <VerticalModalAddTeam
                    show={modalTeam}
                    onHide={() => setModalTeam(false)}
                  />
                </div>
                <div className="row">
                  {teams.map((team, idx) => (
                    <div className="col-12 col-md-4" key={idx}>
                      <div
                        className="card rounded shadow text-white mb-3"
                        style={{ maxWidth: "18rem", height: "550px" }}
                      >
                        <div
                          className="card-header"
                          style={{ backgroundColor: "orange" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <span
                                style={{
                                  fontSize: "1.1rem",
                                  fontWeight: "bold",
                                }}
                              >
                                {team.name}
                              </span>
                            </div>
                            <div
                              style={{ display: "flex", fontWeight: "bold" }}
                            >
                              <div>
                                <i
                                  className="bi bi-pencil-square"
                                  style={{ cursor: "pointer", color: "black" }}
                                  onClick={() => {
                                    editModalTeam(team.id);
                                  }}
                                ></i>
                              </div>
                              <div style={{ marginLeft: 10 }}>
                                <span
                                  style={{ cursor: "pointer", color: "red" }}
                                  onClick={() => {
                                    onDeleteClickHandler(team.id);
                                  }}
                                >
                                  &#88;
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="card-body"
                          style={{
                            backgroundColor: "#F5F5F5",
                            color: "#263238",
                            textAlign: "center",
                          }}
                        >
                          <h5 className="text-center">Player Roster</h5>
                          <hr></hr>
                          <div style={{display: "flex", justifyContent: "space-around"}}>
                            <div style={{display: "flex", flexDirection: "column"}}>
                              <b>Name</b>
                              <div>{team.CaptainName}<b>{" ( C )"}</b></div>
                              <div>{team.MemberName1 && team.MemberName1}</div>
                              <div>{team.MemberName2 && team.MemberName2}</div>
                              <div>{team.MemberName3 && team.MemberName3}</div>
                              <div>{team.MemberName4 && team.MemberName4}</div>
                              <div>{team.MemberName5 && team.MemberName5}</div>
                              <b>Benches</b>
                              <div>{team.BenchMemberName1 && team.BenchMemberName1}</div>
                              <div>{team.BenchMemberName2 && team.BenchMemberName2}</div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column"}}>
                              <b>Pos.</b>
                              <div>{team.CaptainName && "1"}</div>
                              <div>{team.MemberName1 && "2"}</div>
                              <div>{team.MemberName2 && "3"}</div>
                              <div>{team.MemberName3 && "4"}</div>
                              <div>{team.MemberName4 && "5"}</div>
                              <b>No</b>
                              <div>{team.BenchMemberName1 && "1"}</div>
                              <div>{team.BenchMemberName2 && "2"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
}
