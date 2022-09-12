import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

// const getProv = async (cb) => {
// 	try {
// 		const { data } = await axios.get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
// 		const prov = data.map((el) => ({ value: el.id, label: el.name }));
// 		cb(prov);
// 		return prov;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// const getKota = async (provId, cb) => {
// 	try {
// 		const { data } = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`);
// 		const kota = data.map((el) => ({ value: el.id, label: el.name }));
// 		cb(kota);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// const getKec = async (kotaId, cb) => {
// 	try {
// 		const { data } = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kotaId}.json`);
// 		const kec = data.map((el) => ({ value: el.id, label: el.name }));
// 		cb(kec);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

async function getProv() {
	return axios
		.get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
		.then(({ data }) => {
			const prov = data.map((el) => ({ value: el.id, label: el.name }));
			return prov;
		})
		.catch(console.log);
}

async function getKota(provId) {
	return axios
		.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`)
		.then(({ data }) => {
			const kota = data.map((el) => ({ value: el.id, label: el.name }));
			return kota;
		})
		.catch(console.log);
}

async function getKec(kotaId) {
	return axios
		.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kotaId}.json`)
		.then(({ data }) => {
			const kec = data.map((el) => ({ value: el.id, label: el.name }));
			return kec;
		})
		.catch(console.log);
}

export default function SelectLocation({ state }) {
	/**
	 *
	 * @state : { setEventData, Location }
	 * @setEventData => normal/void/useState function
	 * @Location : object -> { ProvinceId, RegencyId, DistrictId }
	 *
	 * how to use it as component
	 *
	 * <SelectLocation state={setEventData, Location} >
	 *
	 */

	let { setEventData, Location } = state;

	const [loading, setLoading] = useState(true);
	const [provData, setProvData] = useState({});
	const [kotaData, setKotaData] = useState({});
	const [kecData, setKecData] = useState({});
	const [dataLocation, setDataLocation] = useState({ ProvinceId: "", RegencyId: "", DistrictId: "" });
	const [valueSelect, setValueSelect] = useState({});
	const [isDisabled, setIsDisabled] = useState({
		isProv: true,
		isKota: true,
	});
	let test = {};
	useEffect(() => {
		if (Location) {
			setIsDisabled({ ...isDisabled, isProv: false, isKota: false });
			const { ProvinceId, RegencyId, DistrictId } = Location;
			getProv()
				.then((prov) => {
					setProvData(prov);
					test = { prov_: prov.filter((x) => x.value == ProvinceId) };
					return getKota(ProvinceId);
				})
				.then((kota) => {
					setKotaData(kota);
					test = { ...test, kota_: kota.filter((x) => x.value == RegencyId) };

					return getKec(RegencyId);
				})
				.then((kec) => {
					setKecData(kec);
					test = { ...test, kec_: kec.filter((x) => x.value == DistrictId) };

					setValueSelect(test);
				})
				.finally(() => setLoading(false));
		} else {
			getProv()
				.then((prov) => {
					setProvData(prov);
				})
				.finally(() => setLoading(false));
		}
	}, []);

	const fetchKota = (e) => {
		const { value } = e;
		getKota(value).then((kota) => setKotaData(kota));
		setDataLocation({ ...dataLocation, ProvinceId: value });
		setIsDisabled({ ...isDisabled, isProv: false });
	};

	const fetchKec = (e) => {
		const { value } = e;
		getKec(value).then((kec) => setKecData(kec));
		setDataLocation({ ...dataLocation, RegencyId: value });
		setIsDisabled({ ...isDisabled, isKota: false });
	};

	const setDistrict = (e) => {
		const { value } = e;
		if (Location && Location.RegencyId && Location.ProvinceId) {
			{
				setDataLocation({ ...dataLocation, ProvinceId: Location.ProvinceId, RegencyId: Location.RegencyId });
			}
		}
		setDataLocation((prev) => ({ ...prev, ...dataLocation, DistrictId: value }));
		setEventData((prev) => ({ ...prev, ...dataLocation, DistrictId: value }));
		console.log(dataLocation);
	};
	// console.log(provData?.filter((x) => x.value == Location.ProvinceId));

	// console.log(valueSelect);

	if (!loading) {
		return (
			<>
				<Select defaultValue={valueSelect.prov_} options={provData} key={provData} name="ProvinceId" onChange={fetchKota} />

				<Select
					isDisabled={isDisabled.isProv}
					defaultValue={valueSelect.kota_}
					options={kotaData}
					// key={kotaData}
					name="RegencyId"
					onChange={fetchKec}
				/>

				<Select
					isDisabled={isDisabled.isKota}
					defaultValue={valueSelect.kec_}
					options={kecData}
					// key={kecData}
					name="DistrictId"
					onChange={setDistrict}
				/>
			</>
		);
	}
}
