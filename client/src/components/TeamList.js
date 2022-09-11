import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorPopup } from "../helpers";
import { fetchTeams } from "../store/actions";
import LoadingAnimation from "./LoadingAnimation";

export default function TeamList() {
  // const [teamList, setTeamList] = useState();
  const { teams } = useSelector((state) => state.teamsReducer);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  const fetchTeamsOnLoad = () => {
    // dispatch(fetchTeams())
    //   .catch((error) => {
    //     console.log(error);
    //     errorPopup(error);
    //   })
    //   .finally(() => setLoading(false));
    setLoading(false);
  };
  console.log(teams);

  useEffect(() => {
    fetchTeamsOnLoad();
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      {!isLoading && teams ? (
        <>
          <h1>My Team</h1>
          {/* list team */}
          {/* <p>{JSON.stringify(teams)}</p> */}
          <hr></hr>
          {teams.map((team, idx) => (
            <div key={idx} style={{ background: "lightgray" }}>
              <div>
                <h1>Captain : </h1>
                <h2>
                  <strong>{team.CaptainName}</strong>
                </h2>
                <h4>Team Member :</h4>
                <p>1. {team.MemberName1 && team.MemberName1}</p>
                <p>2. {team.MemberName2 && team.MemberName2}</p>
                <p>3. {team.MemberName3 && team.MemberName3}</p>
                <p>4. {team.MemberName4 && team.MemberName4}</p>
                <p>5. {team.MemberName5 && team.MemberName5}</p>
                <h4>Benches</h4>
                <p>1. {team.BenchMemberName1 && team.BenchMemberName1}</p>
                <p>2. {team.BenchMemberName2 && team.BenchMemberName2}</p>
              </div>
              <hr></hr>
            </div>
          ))}
        </>
      ) : (
        <LoadingAnimation />
      )}
      {!teams.length ? (
        <>
          <h1>Create Team</h1>
          <FormTeam />
        </>
      ) : null}
    </>
  );
}

function FormTeam() {
  return (
    <>
      <h1>form Create Team!</h1>
      <section className='ev-reg'>
        <div>
          <div className='img'>
            <img src='https://i.ibb.co/NN0tH4t/GAMETIVE-LOGO-BAR.png' alt='' />
          </div>
          <h3 className='fw-bold mt-2'>Create your team!</h3>
          <form>
            <div>
              <div>
                <label htmlFor='eventName'>Team Name</label>
                <input
                  type='text'
                  id='eventName'
                  placeholder='Natus Vincere'
                  name='eventName'
                  // value={eventData.eventName}
                  // onChange={(e) => handleOnChangeForm(e)}
                />
                <label htmlFor='eventName'>Captain Name</label>
                <input
                  type='text'
                  id='eventName'
                  placeholder='CONST'
                  name='eventName'
                  // value={eventData.eventName}
                  // onChange={(e) => handleOnChangeForm(e)}
                />
                <label htmlFor='eventName'>Team Member 1</label>
                <input
                  type='text'
                  id='eventName'
                  placeholder='Member 1'
                  name='eventName'
                  // value={eventData.eventName}
                  // onChange={(e) => handleOnChangeForm(e)}
                />
                <label htmlFor='eventName'>Team Member 2</label>
                <input
                  type='text'
                  id='eventName'
                  placeholder='Member 2'
                  name='eventName'
                  // value={eventData.eventName}
                  // onChange={(e) => handleOnChangeForm(e)}
                />
                <label htmlFor='eventName'>Team Member 3</label>
                <input
                  type='text'
                  id='eventName'
                  placeholder='Member 3'
                  name='eventName'
                  // value={eventData.eventName}
                  // onChange={(e) => handleOnChangeForm(e)}
                />
                <label htmlFor='eventName'>Team Member 4</label>
                <input
                  type='text'
                  id='eventName'
                  placeholder='Member 4'
                  name='eventName'
                  // value={eventData.eventName}
                  // onChange={(e) => handleOnChangeForm(e)}
                />
                <label htmlFor='eventName'>Team Member Bench 1</label>
                <input
                  type='text'
                  id='eventName'
                  placeholder='Bench Member 1'
                  name='eventName'
                  // value={eventData.eventName}
                  // onChange={(e) => handleOnChangeForm(e)}
                />

                <label htmlFor='eventPoster'>Team Member Bench 2</label>
                <input
                  type='text'
                  id='eventPoster'
                  placeholder='Bench Member 2'
                  name='eventPoster'
                  // value={eventData.eventPoster}
                  // onChange={(e) => handleOnChangeForm(e)}
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
