import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const getProv = async (cb) => {
	try {
		const { data } = await axios.get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
		const prov = data.map((el) => ({ value: el.id, label: el.name }));
		cb(prov);
	} catch (error) {
		console.log(error);
	}
};

const getKota = async (provId, cb) => {
	try {
		const { data } = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`);
		const kota = data.map((el) => ({ value: el.id, label: el.name }));
		cb(kota);
	} catch (error) {
		console.log(error);
	}
};

const getKec = async (kotaId, cb) => {
	try {
		const { data } = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kotaId}.json`);
		const kec = data.map((el) => ({ value: el.id, label: el.name }));
		cb(kec);
	} catch (error) {
		console.log(error);
	}
};

export default function SelectLocation({ state }) {
	const [provData, setProvData] = useState({});
	const [kotaData, setKotaData] = useState({});
	const [kecData, setKecData] = useState({});
	const [dataLocation, setDataLocation] = useState({ ProvinceId: "", RegencyId: "", DistrictId: "" });
	const [isDisabled, setIsDisabled] = useState({
		isProv: true,
		isKota: true,
	});

	useEffect(() => {
		getProv((prov) => setProvData(prov));
	}, []);

	const fetchKota = (e) => {
		const { value } = e;
		getKota(value, (kota) => setKotaData(kota));
		setDataLocation({ ...dataLocation, ProvinceId: value });
		setIsDisabled({ ...isDisabled, isProv: false });
	};

	const fetchKec = (e) => {
		const { value } = e;
		getKec(value, (kec) => setKecData(kec));
		setDataLocation({ ...dataLocation, RegencyId: value });
		setIsDisabled({ ...isDisabled, isKota: false });
	};

	const setDistrict = (e) => {
		const { value } = e;
		setDataLocation((prev) => ({ ...prev, ...dataLocation, DistrictId: value }));
		state((prev) => ({ ...prev, ...dataLocation, DistrictId: value }));
	};
	return (
		<>
			<Select onChange={fetchKota} options={provData} name="ProvinceId" />
			<Select isDisabled={isDisabled.isProv} onChange={fetchKec} options={kotaData} key={kotaData} name="RegencyId" />
			<Select isDisabled={isDisabled.isKota} options={kecData} name="DistrictId" onChange={setDistrict} />
		</>
	);
}
