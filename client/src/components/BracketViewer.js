import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editBracket } from "../store/actions";
import ModalBracket from "./ModalBracket";

export default function BracketViewer({ state: { detail, id } }) {
	const [modalShow, setModalShow] = useState(false);
	const [singleMatch, setSingleMatch] = useState({});
	const [dataMatch, setDataMatch] = useState({});
	const dispatch = useDispatch();
	//wack hack
	let counter = 1;

	async function render() {
		const { stage, match, match_game, participant } = detail;
		if (counter === 1) {
			window.bracketsViewer.render(
				{
					stages: stage,
					matches: match,
					matchGames: match_game,
					participants: participant,
				},
				{
					selector: "#bracket",
					participantOriginPlacement: "before",
					separatedChildCountLabel: true,
					showSlotsOrigin: true,
					showLowerBracketSlotsOrigin: true,
					highlightParticipantOnHover: true,
				},
			);
			counter++;
		}
	}

	async function matchInfo(match) {
		window.bracketsViewer.onMatchClicked = (match) => {
			// console.log(match);
			setDataMatch(match);
			setModalShow(true);
		};
	}

	async function submitNewBracket() {
		// console.log(detail.match, "ini detail");
		console.log(singleMatch);
		let newData = detail.match.map((x) => {
			if (x.id == singleMatch.id) x = singleMatch;
			return x;
		});
		// console.log(detail, "before");
		// console.log({ ...detail, match: newData }, "ini new data");
		console.log({ ...detail, match: newData }, "after");
		console.log(newData, "new data");
		// dispatch(editBracket(id, JSON.stringify(newData)))
		// 	.then(console.log)
		// 	.catch(console.log);
		// set_detail({ ...detail, match: newData });
	}

	useEffect(() => {
		render();
	}, []);

	// useEffect(, [singleMatch]);

	// console.log(detail, "ini detail");

	return detail ? (
		<div>
			<pre>singleMatch:{JSON.stringify(singleMatch, null, 2)}</pre>
			<ModalBracket
				show={modalShow}
				onHide={() => setModalShow(false)}
				state={{ dataMatch, setSingleMatch, participant: detail?.participant, detail, submitNewBracket, setModalShow }}
			/>
			<div id="bracket" className="brackets-viewer w-100" onClick={(match) => matchInfo(match)}></div>
		</div>
	) : (
		<div>Loading...</div>
	);
}
