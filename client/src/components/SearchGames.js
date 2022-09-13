import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../store/actions";
import { dateFormat, errorPopup, rupiahFormat } from "../helpers";
import LoadingAnimation from "./LoadingAnimation";

export default function SearchGames() {
	const navigate = useNavigate();
	const { events } = useSelector((state) => state.eventsReducer);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [keyword, setKeyword] = useState();
	const [page, setPage] = useState(1)

	const statusColor = (value) => {
		const styleObj = {
			Pending: ["#FFF9C4", "#F9A825"],
			Active: ["#C8E6C9", "#1B5E20"],
			Finished: ["#FFCCBC", "#BF360C"],
			Archived: ["#C5CAE9", "#1A237E"],
		};
		const [backgroundColor, color] = styleObj[value];
		return { backgroundColor, color };
	};

	const pageNumber = (page) => {
		let pagination = []
		for (let i = 1; i <= page; i++) {
			pagination.push(i)
		}
		return pagination
	}

	const handlePage = (page) => {
		if (page >= events.totalPages) {
			setPage(events.totalPages)
		} else if (page < 1) {
			setPage(1)
		} else {
			setPage(page)
		}
	}

	const fetchData = () => {
		dispatch(fetchEvents(keyword, page))
			.catch((err) => {
				console.log(err);
				errorPopup(err);
			})
			.finally(() => setLoading(false));
	};

	const handleKeyword = (e) => {
		const { value } = e.target;
		setKeyword(value);
		setPage(1)
	};

	const handleSearch = () => {
		fetchData();
	};

	const handleEnter = (e) => {
		if (e.key === "Enter") {
			fetchData();
		}
	};

	const toDetail = (id) => () => {
		navigate("/detail/" + id);
	};

	useEffect(() => {
		fetchData();
	}, [page]);

	return (
		<div className="search-page">
			<div className="search-bar">
				<div>
					<i onClick={handleSearch} className="fa-solid fa-magnifying-glass"></i>
					<input onKeyPress={handleEnter} onChange={handleKeyword} type="text" placeholder="Search here..." />
				</div>
			</div>
			{!loading ? (
				<>
					<div>
						{events.items.map((event, idx) => (
							<div className="search-item" key={idx} onClick={toDetail(event.id)}>
								<div className="img">
									<img src={event.eventPoster} alt="" className="search-img" />
								</div>
								<div>
									<h1 className="fw-bold">{event.name}</h1>
									<span className="status" style={{ ...statusColor(event.eventStatus) }}>{event.eventStatus}</span>
									<div>
										<p><i className="bi bi-geo-alt-fill"></i> {event.Location.name}</p>
										<p><i className="bi bi-flag-fill"></i> {dateFormat(event.eventDate)}</p>
										<p><i className="bi bi-cash"></i> {rupiahFormat(event.price)}</p>
										<p><i className="fa-solid fa-gamepad"></i> {event.Game.name} <i className="fa-solid fa-slash"></i> {event.Game.genre}</p>
									</div>
								</div>
							</div>
						))}
					</div>
					<nav>
						<ul className="pagination">
							<li className="page-item">
								<a className="page-link" onClick={() => handlePage(events.currentPage - 1)}>
									<span aria-hidden="true">&laquo;</span>
								</a>
							</li>
							<li className="page-item pagination">
								{pageNumber(events.totalPages).map((x) => {
									return <a
										key={x}
										className={events.currentPage === x ? "page-link active" : "page-link"}
										onClick={() => handlePage(x)}>
										{x}
									</a>
								})}
							</li>
							<li className="page-item">
								<a className="page-link" onClick={() => handlePage(events.currentPage + 1)}>
									<span aria-hidden="true">&raquo;</span>
								</a>
							</li>
						</ul>
					</nav >
					<br></br>
				</>
			) : (
				<LoadingAnimation />
			)}
		</div>
	);
}
