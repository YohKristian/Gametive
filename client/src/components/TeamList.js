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
							<br></br>
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
								<VerticalModalAddTeam show={modalTeam} onHide={() => setModalTeam(false)} />
							</div>
						</div>
					)}
					{teams.length !== 0 && (
						<>
							<h1 className="event-title">List of Your Teams</h1>
							<hr className="my-4"></hr>
							<ModalEditTeam show={modal} onHide={() => setModalShow(false)} />
							<div className="container">
								<div className="add-team">
									<br></br>
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
									<VerticalModalAddTeam show={modalTeam} onHide={() => setModalTeam(false)} />
								</div>
								<div className="row" style={{ marginLeft: "6.5%" }}>
									{teams.map((team, idx) => (
										<div className="col-12 col-md-4" key={idx}>
											<div className="card rounded shadow text-white mb-3" style={{ maxWidth: "18rem", height: "550px" }}>
												<div className="card-header" style={{ backgroundColor: "orange" }}>
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
														<div style={{ display: "flex", fontWeight: "bold" }}>
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
													<div style={{ display: "flex", justifyContent: "space-around" }}>
														<div style={{ display: "flex", flexDirection: "column" }}>
															<b>Name</b>
															<div>
																{team.CaptainName}
																<b>{" ( C )"}</b>
															</div>
															<div>{team.MemberName1 && team.MemberName1}</div>
															<div>{team.MemberName2 && team.MemberName2}</div>
															<div>{team.MemberName3 && team.MemberName3}</div>
															<div>{team.MemberName4 && team.MemberName4}</div>
															<div>{team.MemberName5 && team.MemberName5}</div>
															<b>Benches</b>
															<div>{team.BenchMemberName1 && team.BenchMemberName1}</div>
															<div>{team.BenchMemberName2 && team.BenchMemberName2}</div>
														</div>
														<div style={{ display: "flex", flexDirection: "column" }}>
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
											<br></br>
										</div>
									))}
								</div>
							</div>
							<br></br>
						</>
					)}
				</>
			) : (
				<LoadingAnimation />
			)}
		</>
	);
}

// function FormTeam() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const objFormTeam = {
//     teamName: "",
//     memberOne: "",
//     memberTwo: "",
//     memberThree: "",
//     memberFour: "",
//     benchOne: "",
//     benchTwo: "",
//   };
//   const [formTeam, setFormTeam] = useState({ ...objFormTeam });

//   const handleOnChangeForm = (event) => {
//     const { name, value } = event.target;
//     setFormTeam({
//       ...formTeam,
//       [name]: value,
//     });
//   };

//   const handleOnSubmitForm = (event) => {
//     event.preventDefault();
//     setFormTeam((prev) => ({
//       ...prev,
//       ...formTeam,
//     }));

//     dispatch(
//       createTeam({
//         name: formTeam.teamName,
//         MemberName1: formTeam.memberOne,
//         MemberName2: formTeam.memberTwo,
//         MemberName3: formTeam.memberThree,
//         MemberName4: formTeam.memberFour,
//         BenchMemberName1: formTeam.benchOne,
//         BenchMemberName: formTeam.benchTwo,
//       })
//     )
//       .then(() => {

//         dispatch(fetchTeams())
//           .catch((error) => {
//             console.log(error);
//             errorPopup(error);
//           });

//         window.scrollTo(0, 0);
//       })
//       .catch((error) => {
//         console.log(error);
//         errorPopup(error);
//       });
//   };

//   return (
//     <>
//       <br></br>
//       <br></br>
//       <br></br>
//       <section className='ev-reg'>
//         <div>
//           <div className='img'>
//             <img src='https://i.ibb.co/NN0tH4t/GAMETIVE-LOGO-BAR.png' alt='' />
//           </div>
//           <br></br>
//           <h3 className='fw-bold mt-2' style={{ color: "gray" }}>
//             Create your own team!
//           </h3>
//           <form onSubmit={handleOnSubmitForm}>
//             <div>
//               <div>
//                 <label htmlFor='teamName'>Team Name</label>
//                 <input
//                   type='text'
//                   id='teamName'
//                   placeholder='Natus Vincere'
//                   name='teamName'
//                   value={formTeam.teamName}
//                   onChange={(event) => handleOnChangeForm(event)}
//                 />
//                 <label htmlFor='captainName'>Captain Name</label>
//                 <input
//                   type='text'
//                   id="captainName"
//                   value={"You are the captain team!"}
//                   readOnly
//                   style={{ "fontWeight": "bold" }}
//                 />
//                 <label htmlFor='memberOne'>Team Member 1</label>
//                 <input
//                   type='text'
//                   id='memberOne'
//                   placeholder='Member 1'
//                   name='memberOne'
//                   value={formTeam.memberOne}
//                   onChange={(event) => handleOnChangeForm(event)}
//                 />
//                 <label htmlFor='memberTwo'>Team Member 2</label>
//                 <input
//                   type='text'
//                   id='memberTwo'
//                   placeholder='Member 2'
//                   name='memberTwo'
//                   value={formTeam.memberTwo}
//                   onChange={(event) => handleOnChangeForm(event)}
//                 />
//                 <label htmlFor='memberThree'>Team Member 3</label>
//                 <input
//                   type='text'
//                   id='memberThree'
//                   placeholder='Member 3'
//                   name='memberThree'
//                   value={formTeam.memberThree}
//                   onChange={(event) => handleOnChangeForm(event)}
//                 />
//                 <label htmlFor='memberFour'>Team Member 4</label>
//                 <input
//                   type='text'
//                   id='memberFour'
//                   placeholder='Member 4'
//                   name='memberFour'
//                   value={formTeam.memberFour}
//                   onChange={(event) => handleOnChangeForm(event)}
//                 />
//                 <label htmlFor='benchOne'>Team Member Bench 1</label>
//                 <input
//                   type='text'
//                   id='benchOne'
//                   placeholder='Bench Member 1'
//                   name='benchOne'
//                   value={formTeam.benchOne}
//                   onChange={(event) => handleOnChangeForm(event)}
//                 />

//                 <label htmlFor='benchTwo'>Team Member Bench 2</label>
//                 <input
//                   type='text'
//                   id='benchTwo'
//                   placeholder='Bench Member 2'
//                   name='benchTwo'
//                   value={formTeam.benchTwo}
//                   onChange={(event) => handleOnChangeForm(event)}
//                 />
//               </div>
//             </div>
//             <button type="submit">Create</button>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }
