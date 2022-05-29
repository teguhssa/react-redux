import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addKontak,
  getListKontak,
  updateKontak,
} from "../../actions/kontakAction";

export default function AddKontak() {
  const [nama, setNama] = useState("");
  const [nohp, setNohp] = useState("");
  const [id, setId] = useState("");

  const { addKontakResult, detailKontakResult, updateKontakResult } =
    useSelector((state) => state.KontakReducer);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // update
      dispatch(updateKontak({ id: id, nama: nama, nohp: nohp }));
    } else {
      // add data
      dispatch(addKontak({ nama: nama, nohp: nohp }));
    }
  };

  useEffect(() => {
    if (addKontakResult) {
      dispatch(getListKontak());
      setNama("");
      setNohp("");
      // console.log("SET NAMA IS HERE", setNama)
    }
  }, [addKontakResult, dispatch]);

  useEffect(() => {
    if (detailKontakResult) {
      setNama(detailKontakResult.nama);
      setNohp(detailKontakResult.nohp);
      setId(detailKontakResult.id);
    }
  }, [detailKontakResult, dispatch]);

  useEffect(() => {
    if (updateKontakResult) {
      dispatch(getListKontak());
      setNama("");
      setNohp("");
      setId("")
      // console.log("SET NAMA IS HERE", setNama)
    }
  }, [updateKontakResult, dispatch]);

  return (
    <div>
      <h4>{id ? "Edit Kontak" : "Add Kontak"}</h4>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="name"
          placeholder="text here"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <input
          type="text"
          name="nohp"
          value={nohp}
          placeholder="text here"
          onChange={(e) => setNohp(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
