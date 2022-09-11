import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEventDetail } from "../store/actions";
import { dateFormat, rupiahFormat } from "../helpers";
import BracketViewer from "./BracketViewer";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DetailGame() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { eventDetailReducer } = useSelector((state) => state);
  const [detail, setDetail] = useState();
  const [location, setLocation] = useState({
    province: "",
    regency: "",
    district: "",
  });

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

  return detail ? (
    <div className='detail'>
      <div className='detail-img'>
        <img src={detail.eventPoster} alt='' />
      </div>

      <div>
        <h1>{detail.eventName}</h1>
        <span className='status'>{detail.eventStatus}</span>
        <h2>Description</h2>
        <p>{detail.description}</p>
        <h2>Rules</h2>
        <p>{detail.rules}</p>
        <div>
          <p>Lokasi: Jakarta Selatan</p>
          <p>Mulai: {dateFormat(detail.eventDate)}</p>
          <p>Registration Fee: {rupiahFormat(detail.price)}</p>
          <p>
            Maps :{" "}
            <a
              href='/'
              onClick={(event) => {
                showInMapClicked(
                  `${location.province} ${location.regency} ${location.district}`
                );
              }}
            >
              {location.province} - {location.regency}{" "}
              {location.district ? `- ${location.district}` : ""}
            </a>
          </p>
          <p>{JSON.stringify(detail)}</p>
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
