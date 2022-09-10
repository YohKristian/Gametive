import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEventDetail } from "../store/actions";
import { dateFormat, rupiahFormat } from "../helpers";
import BracketViewer from "./BracketViewer";

export default function DetailGame() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { eventDetailReducer } = useSelector((state) => state);
	const [detail, setDetail] = useState();

	useEffect(() => {
		dispatch(fetchEventDetail(id)).then((data) => {
			console.log(data);
			return setDetail(data);
		});
	}, []);

	// useEffect(() => {
	// 	setDetail(eventDetailReducer);
	// }, [eventDetailReducer]);

	return detail ? (
		<div className="detail">
			<div className="detail-img">
				<img src={detail.eventPoster} alt="" />
			</div>

			<div>
				<h1>{detail.eventName}</h1>
				<span className="status">{detail.eventStatus}</span>
				<h2>Description</h2>
				<p>{detail.description}</p>
				<h2>Rules</h2>
				<p>{detail.rules}</p>
				<div>
					<p>Lokasi: Jakarta Selatan</p>
					<p>Mulai: {dateFormat(detail.eventDate)}</p>
					<p>Registration Fee: {rupiahFormat(detail.price)}</p>
				</div>
				<BracketViewer state={JSON.parse(detail.Bracket)} />
			</div>
		</div>
	) : (
		<h1>Loading</h1>
	);
}
