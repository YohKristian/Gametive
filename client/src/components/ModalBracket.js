import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { editBracket } from "../store/actions";
import { useLocation } from "react-router-dom";

let initial = {
  id: 0,
  number: 0,
  stage_id: 0,
  group_id: 0,
  round_id: 0,
  child_count: 0,
  status: 2,
  opponent1: { id: 0, position: 1, score: null, result: "" },
  opponent2: { id: 1, position: 2, score: null, result: "" },
};
export default function ModalBracket(props) {
  /**
   * "match": [
		{
			"id": 0,
			"number": 1,
			"stage_id": 0,
			"group_id": 0,
			"round_id": 0,
			"child_count": 0,
			"status": 2,
			"opponent1": { "id": 0, "position": 1, "score": 2, "result": "loss" },
			"opponent2": { "id": 1, "position": 2, "score": 2, "result": "win" }
      "match_url": ""
		},
   *  */

  const { dataMatch, participant, setModalShow, detail } = props.state;

  const [match, setMatch] = useState(initial);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];

  useMemo(() => setMatch({ ...initial, ...dataMatch }), [dataMatch]);

  function changeMatch({ target: { name, value } }) {
    setMatch({ ...match, [name]: { ...match[name], score: value } });
  }

  function changeVideo({ target: { name, value } }) {
    setMatch({ ...match, [name]: value });
  }

  function winnerIs({ target: { name } }) {
    switch (name) {
      case "1":
        setMatch({
          ...match,
          opponent1: { ...match.opponent1, result: "win" },
          opponent2: { ...match.opponent2, result: "loss" },
        });
        break;
      case "draw":
        setMatch({
          ...match,
          opponent1: { ...match.opponent1, result: "draw" },
          opponent2: { ...match.opponent2, result: "draw" },
        });
        break;
      case "2":
        setMatch({
          ...match,
          opponent1: { ...match.opponent1, result: "loss" },
          opponent2: { ...match.opponent2, result: "win" },
        });
        break;
      default:
        break;
    }
  }

  function team1Select({ value, label }) {
    setMatch({ ...match, opponent1: { ...match.opponent1, id: value } });
  }

  function team2Select({ value, label }) {
    setMatch({ ...match, opponent2: { ...match.opponent2, id: value } });
  }

  function submitMatch(e) {
    e.preventDefault();
    let newMatch = detail.match.map((x) => {
      if (x.id == match.id) x = match;
      return x;
    });
    dispatch(editBracket(id, JSON.stringify({ ...detail, match: newMatch })))
      .then((res) => {
        setModalShow(false);
        window.location.reload(false);
      })
      .catch(console.log);
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Match Settings</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-bracket">
        {/* <Container>
					<Row>
						<Col>
							<pre>match : {JSON.stringify(match, null, 2)}</pre>
						</Col>
						<Col>
							<pre>dataMatch : {JSON.stringify(dataMatch, null, 2)}</pre>
						</Col>
					</Row>
				</Container> */}
        <div>
          <div>
            {/* {JSON.stringify(participant)} */}
            <label>Team 1</label>
            <Select
              options={participant.map((x) => {
                return { value: x.id, label: x.name };
              })}
              onChange={team1Select}
            />
            <label>Team 2</label>
            <Select
              options={participant.map((x) => {
                return { value: x.id, label: x.name };
              })}
              onChange={team2Select}
            />
          </div>
          <div>
            <label>Score</label>
            <input
              type="number"
              name="opponent1"
              value={match.opponent1?.score}
              onChange={changeMatch}
            />
            <label>Score</label>
            <input
              type="number"
              name="opponent2"
              value={match.opponent2?.score}
              onChange={changeMatch}
            />
          </div>
        </div>
        <div>
          <label>Result</label>
          <div className="result">
            <div aria-label="Result" name="result" onClick={winnerIs}>
              <button variant="primary" name="1">
                Team 1 Win
              </button>
              <button variant="secondary" name="draw">
                Draw
              </button>
              <button variant="danger" name="2">
                Team 2 Win
              </button>
            </div>
          </div>
        </div>
        <div>
          <label>Match video (optional)</label>
          <input
            type="text"
            name="match_url"
            value={match.match_video}
            onChange={changeVideo}
          />
        </div>
        <button
          onClick={() => {
            props.onHide();
            submitMatch();
          }}
        >
          Apply
        </button>
      </Modal.Body>
    </Modal>
  );
}
