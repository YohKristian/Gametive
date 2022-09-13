import { useEffect, useState } from "react";
import ModalBracket from "./ModalBracket";

export default function BracketViewer({ set_detail, state: { detail } }) {
	const [modalShow, setModalShow] = useState(false);
	const [singleMatch, setSingleMatch] = useState({});
	const [dataMatch, setDataMatch] = useState({});
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

	useEffect(() => {
		render();
	}, []);

	useEffect(() => {
		// console.log(detail.match, "ini detail");
		if (singleMatch) {
			let newData = detail.match.map((x) => {
				if (x.id == singleMatch.id) x = singleMatch;
				return x;
			});
			// console.log(detail, "before");
			// console.log(newData, "ini new data");
			// console.log({ ...detail, match: newData }, "after");
			set_detail({ ...detail, match: newData });
		}
	}, [singleMatch]);

	return detail ? (
		<div>
			<pre>{JSON.stringify(detail.participant, null, 2)}</pre>
			<ModalBracket
				show={modalShow}
				onHide={() => setModalShow(false)}
				state={{ dataMatch, setSingleMatch, participant: detail.participant }}
			/>
			<div id="bracket" className="brackets-viewer w-100" onClick={(match) => matchInfo(match)}></div>
		</div>
	) : (
		<div>Loading...</div>
	);
}
