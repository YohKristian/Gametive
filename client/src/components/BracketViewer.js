import { useEffect, useState } from "react";

export default function BracketViewer({ state }) {
	//wack hack
	let counter = 1;

	async function render() {
		const { stage, match, match_game, participant } = state;
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
			console.log(match);
		};
	}

	useEffect(() => {
		render();
	}, []);

	return state ? (
		<div id="bracket" className="brackets-viewer w-100" onClick={(match) => matchInfo(match)}></div>
	) : (
		<div>Loading...</div>
	);
}
