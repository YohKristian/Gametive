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
				<i onClick={handleSearch} className="fa-solid fa-magnifying-glass"></i>
				<input onKeyPress={handleEnter} onChange={handleKeyword} type="text" placeholder="Search here..." />
			</div>
			{!loading ? (
				<>
					<div>
						{events.items.map((event, idx) => (
							<div className="search-item" key={idx} onClick={toDetail(event.id)}>
								<div className="img">
									<img src={event.eventPoster} alt="" />
								</div>
								<div>
									<h1>{event.name}</h1>
									<span className="status">{event.eventType}</span>
									<div>
										<p>Lokasi: {event.Location.name}</p>
										<p>Mulai: {dateFormat(event.eventDate)}</p>
										<p>Regestration Fee: {rupiahFormat(event.price)}</p>
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
				</>
			) : (
				<LoadingAnimation />
			)}
		</div>
	);
}
