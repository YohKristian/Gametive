import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorPopup } from "../helpers";
import { fetchTeams, createTeam } from "../store/actions";
import LoadingAnimation from "./LoadingAnimation";

export default function TeamList() {
  const [teamList, setTeamList] = useState([]);
  const { teams } = useSelector((state) => state.teamsReducer);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

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
    // setTeamList(...teams);
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div id='top'></div>
      {!isLoading && teams ? (
        <>
          <a href='#down'>Create Team!</a>

          {/* <a href="#formCreateTeam">Create Form</a> */}
          <hr></hr>

          {teams.length === 0 && (
            <div>
              <h1>💀 So sad YOU have no team! 💀</h1>
            </div>
          )}

          {teams.length !== 0 && (
            <div className='container'>
              <div className='row' >
                {teams.map((team, idx) => (
                  <div className="col-4" key={idx}>
                    <div className="card text-white mb-3" style={{ maxWidth: '18rem', backgroundColor: '#FFB562' }}>
                      <div className="card-header ">{team.name}</div>
                      <div className="card-body ">
                        <h5 className="card-title">Captain: {team.CaptainName}</h5>
                        <p className="card-text">Team Member :</p>
                        <p className="card-text">1. {team.MemberName1 && team.MemberName1}</p>
                        <p className="card-text">2. {team.MemberName2 && team.MemberName2}</p>
                        <p className="card-text">3. {team.MemberName3 && team.MemberName3}</p>
                        <p className="card-text">4. {team.MemberName4 && team.MemberName4}</p>
                        <p className="card-text">5. {team.MemberName5 && team.MemberName5}</p>
                        <h6 className="card-title">Benches:</h6>
                        <p className="card-text">1. {team.BenchMemberName1 && team.BenchMemberName1}</p>
                        <p className="card-text">2. {team.BenchMemberName2 && team.BenchMemberName2}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div id='down'>
            <FormTeam />
          </div>
        </>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
}

function FormTeam() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const objFormTeam = {
    teamName: "",
    captainName: "",
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
        BenchMemberName: formTeam.benchTwo,
      })
    )
      .then(() => {
        dispatch(fetchTeams());
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log(error);
        errorPopup(error);
      });
  };

  return (
    <>
      <h1>Create Team!</h1>
      <section className='ev-reg'>
        <div>
          <div className='img'>
            <img src='https://i.ibb.co/NN0tH4t/GAMETIVE-LOGO-BAR.png' alt='' />
          </div>
          <h3 className='fw-bold mt-2'>Create your team!</h3>
          <form onSubmit={handleOnSubmitForm}>
            <div>
              <div>
                <label>Team Name</label>
                <input
                  type='text'
                  id='eventName'
                  placeholder='Natus Vincere'
                  name='teamName'
                  value={formTeam.teamName}
                  onChange={(event) => handleOnChangeForm(event)}
                />
                <label>Captain Name</label>
                <input
                  type='text'
                  name=''
                  value={"You are the captain team!"}
                  readOnly
                />
                <label>Team Member 1</label>
                <input
                  type='text'
                  id='eventName'
                  placeholder='Member 1'
                  name='memberOne'
                  value={formTeam.memberOne}
                  onChange={(event) => handleOnChangeForm(event)}
                />
                <label>Team Member 2</label>
                <input
                  type='text'
                  id='eventName'
                  placeholder='Member 2'
                  name='memberTwo'
                  value={formTeam.memberTwo}
                  onChange={(event) => handleOnChangeForm(event)}
                />
                <label>Team Member 3</label>
                <input
                  type='text'
                  id='eventName'
                  placeholder='Member 3'
                  name='memberThree'
                  value={formTeam.memberThree}
                  onChange={(event) => handleOnChangeForm(event)}
                />
                <label>Team Member 4</label>
                <input
                  type='text'
                  id='eventName'
                  placeholder='Member 4'
                  name='memberFour'
                  value={formTeam.memberFour}
                  onChange={(event) => handleOnChangeForm(event)}
                />
                <label>Team Member Bench 1</label>
                <input
                  type='text'
                  id='eventName'
                  placeholder='Bench Member 1'
                  name='benchOne'
                  value={formTeam.benchOne}
                  onChange={(event) => handleOnChangeForm(event)}
                />

                <label htmlFor='eventPoster'>Team Member Bench 2</label>
                <input
                  type='text'
                  id='eventPoster'
                  placeholder='Bench Member 2'
                  name='benchTwo'
                  value={formTeam.benchTwo}
                  onChange={(event) => handleOnChangeForm(event)}
                />
              </div>
            </div>
            <button type='submit'>Create</button>
          </form>
        </div>
      </section>
    </>
  );
}
