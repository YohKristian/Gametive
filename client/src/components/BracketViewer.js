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
					selector: "#example",
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

	useEffect(() => {
		render();
	}, []);

	return state ? <div id="example" className="brackets-viewer"></div> : <div>Loading...</div>;
}
