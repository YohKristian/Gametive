import { useState } from "react";

export default function TeamList() {
    const [teamList, setTeamList] = useState();

    return teamList ? (
        <h1>Team List</h1>
    ) : (
        <h1>Loading</h1>
    );
}