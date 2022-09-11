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
	const { setLocation, Location } = state;
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
		if (Location) {
			setIsDisabled({ ...isDisabled, isProv: false, isKota: false });
			const { ProvinceId, RegencyId } = Location;
			getKota(ProvinceId, (kota) => setKotaData(kota));
			getKec(RegencyId, (kec) => setKecData(kec));
		}
	}, [Location]);

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
		if (Location.RegencyId && Location.ProvinceId) {
			{
				setDataLocation({ ...dataLocation, ProvinceId: Location.ProvinceId, RegencyId: Location.RegencyId });
			}
		}
		setDataLocation((prev) => ({ ...prev, ...dataLocation, DistrictId: value }));
		setLocation({ ...dataLocation, DistrictId: value });
	};

	return (
		<>
			<Select
				onChange={fetchKota}
				defaultValue={provData.length && provData.filter((x) => x.value == Location.ProvinceId)}
				options={provData}
				name="ProvinceId"
			/>

			<Select
				isDisabled={isDisabled.isProv}
				defaultValue={kotaData.length && kotaData.filter((x) => x.value == Location.RegencyId)}
				onChange={fetchKec}
				options={kotaData}
				key={kotaData}
				name="RegencyId"
			/>

			<Select
				isDisabled={isDisabled.isKota}
				defaultValue={kecData.length && kecData.filter((x) => x.value == Location.RegencyId)}
				options={kecData}
				name="DistrictId"
				onChange={setDistrict}
			/>
		</>
	);
}
