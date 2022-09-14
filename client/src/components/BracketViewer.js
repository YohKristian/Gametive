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
			setDataMatch(match);
			setModalShow(true);
		};
	}

	useEffect(() => {
		render();
	}, []);

	return detail ? (
		<div>
			<pre>singleMatch:{JSON.stringify(singleMatch, null, 2)}</pre>
			<ModalBracket
				show={modalShow}
				onHide={() => setModalShow(false)}
				state={{ dataMatch, setSingleMatch, participant: detail?.participant, detail, setModalShow }}
			/>
			<div id="bracket" className="brackets-viewer w-100" onClick={(match) => matchInfo(match)}></div>
		</div>
	) : (
		<div>Loading...</div>
	);
}
