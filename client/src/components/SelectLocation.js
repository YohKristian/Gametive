import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const getProv = async (cb) => {
  try {
    const { data } = await axios.get(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    );
    const prov = data.map((el) => ({ value: el.id, label: el.name }));
    cb(prov);
  } catch (error) {
    console.log(error);
  }
};

const getKota = async (provId, cb) => {
  try {
    const { data } = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`
    );
    const kota = data.map((el) => ({ value: el.id, label: el.name }));
    cb(kota);
  } catch (error) {
    console.log(error);
  }
};

const getKec = async (kotaId, cb) => {
  try {
    const { data } = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kotaId}.json`
    );
    const kec = data.map((el) => ({ value: el.id, label: el.name }));
    cb(kec);
  } catch (error) {
    console.log(error);
  }
};

export default function SelectLocation() {
  const [provData, setProvData] = useState();
  const [kotaData, setKotaData] = useState();
  const [kecData, setKecData] = useState();
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
    setIsDisabled({ ...isDisabled, isProv: false });
  };

  const fetchKec = (e) => {
    const { value } = e;
    getKec(value, (kec) => setKecData(kec));
    setIsDisabled({ ...isDisabled, isKota: false });
  };
  // useEffect(() => console.log(provData), [provData]);
  return (
    <>
      <Select onChange={fetchKota} options={provData} />
      <Select
        isDisabled={isDisabled.isProv}
        onChange={fetchKec}
        options={kotaData}
      />
      <Select isDisabled={isDisabled.isKota} options={kecData} />
    </>
  );
}
