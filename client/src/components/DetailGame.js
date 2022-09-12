import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEventDetail } from "../store/actions";
import { dateFormat, rupiahFormat } from "../helpers";
import BracketViewer from "./BracketViewer";
import axios from "axios";

export default function DetailGame() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { eventDetailReducer } = useSelector((state) => state);
	const [detail, setDetail] = useState();
	const [location, setLocation] = useState({
		province: "",
		regency: "",
		district: "",
	});

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

	useEffect(() => {
		dispatch(fetchEventDetail(id)).then((data) => {
			return setDetail(data);
		});
	}, []);

	useEffect(() => {
		getFullLocation();
	}, [detail, location.province, location.regency]);

	const getFullLocation = async () => {
		try {
			const { data: provinces } = await axios.get(
				"https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
			);
			const province = provinces.filter(
				(province) => province.id == detail.Location.ProvinceId
			)[0];

			const { data: regencies } = await axios.get(
				`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${province.id}.json`
			);
			const regency = regencies.filter(
				(regency) => regency.id == detail.Location.RegencyId
			)[0];

			const { data: districts } = await axios.get(
				`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regency.id}.json`
			);
			const district = districts.filter(
				(district) => district.id == detail.Location.DistrictId
			)[0];

			setLocation({
				province: province.name,
				regency: regency.name,
				district: !district ? "" : district.name,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handlerOnClick = () => {
		if (localStorage.access_token) {
			navigate("/participant-registration", {
				state: {
					eventId: id,
					eventName: detail.name,
					eventPrice: +detail.price,
					eventDate: detail.eventDate,
				}
			})
		} else {
			navigate("/login")
		}
	}

	return detail ? (
		<div className='detail'>
			<div className='detail-img'>
				<img src={detail.eventPoster} alt='' />
			</div>

			<div>
				<h1 className="fw-bold">{detail.name}</h1>
				<span className='status' style={{ ...statusColor(detail.eventStatus) }}>{detail.eventStatus}</span>
				<h2>Description</h2>
				<p>{detail.description}</p>
				<h2>Rules</h2>
				<p>{detail.rules}</p>
				<div>
					<p><i className="bi bi-geo-alt-fill"></i>Jakarta Selatan</p>
					<p><i className="bi bi-flag-fill"></i>{dateFormat(detail.eventDate)}</p>
					<p><i className="bi bi-cash"></i>{rupiahFormat(detail.price)}</p>
					<p>
						<i className="fa-solid fa-map"></i>
						<a
							href="#"
							target="_blank"
							onClick={(event) => {
								event.preventDefault();
								showInMapClicked(
									`${location.province} ${location.regency} ${location.district}`
								);
							}}
						>
							{location.province} - {location.regency}{" "}
							{location.district ? `- ${location.district}` : ""}
						</a>
					</p>
				</div>
				<div className="button">
					<button onClick={handlerOnClick}>
						Register event!
					</button>
					<button onClick={() => navigate(-1)}>
						Back
					</button>
				</div>

				<BracketViewer state={JSON.parse(detail.Bracket)} />
			</div>
		</div>
	) : (
		<h1>Loading</h1>
	);
}

const showInMapClicked = (search) => {
	// window.open("https://maps.google.com?q="+your_lat+","+your_lng );
	window.open(`https://maps.google.com?q=${search}`);
};
