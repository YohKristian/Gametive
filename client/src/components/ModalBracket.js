import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { useMemo, useState } from "react";

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

	const { dataMatch, setSingleMatch, participant } = props.state;

	const [match, setMatch] = useState(initial);

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
		setSingleMatch(match);
	}

	console.log(participant, "ini participant");

	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<h4>Match Settings</h4>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Row>
						<Col>
							<pre>match : {JSON.stringify(match, null, 2)}</pre>
						</Col>
						<Col>
							<pre>dataMatch : {JSON.stringify(dataMatch, null, 2)}</pre>
						</Col>
					</Row>
				</Container>
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
					<label>Team 1 Score</label>&nbsp; : &nbsp;
					<input type="text" name="opponent1" value={match.opponent1?.score} onChange={changeMatch} />
				</div>
				<div>
					<label>Team 2 Score</label>&nbsp; : &nbsp;
					<input type="text" name="opponent2" value={match.opponent2?.score} onChange={changeMatch} />
				</div>
				<div>
					<label>Result</label>&nbsp; : &nbsp;
					<div>
						<ButtonGroup aria-label="Result" name="result" onClick={winnerIs}>
							<Button variant="primary" name="1">
								Team 1 Win
							</Button>
							<Button variant="secondary" name="draw">
								Draw
							</Button>
							<Button variant="danger" name="2">
								Team 2 Win
							</Button>
						</ButtonGroup>
					</div>
				</div>
				<div>
					<label>Match video (optional)</label>&nbsp; : &nbsp;
					<input type="text" name="match_url" value={match.match_video} onChange={changeVideo} />
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={() => {
						setMatch({ ...initial, ...dataMatch });
						props.onHide();
					}}
				>
					Close
				</Button>
				<Button onClick={props.onHide} onClick={submitMatch}>
					Apply
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
