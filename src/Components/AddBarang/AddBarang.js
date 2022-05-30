import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBarang,
  getListBarang,
  editBarang,
} from "../../actions/barangAction";
import "../../asset/style.css";
import SimpleReactValidator from "simple-react-validator";
import { useRef } from "react";

export default function AddBarang() {
  const [namaBarang, setNamaBarang] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [harga, setHarga] = useState("");
  // const [gambar, setGambar] = useState("");
  const [idBarang, setIdBarang] = useState("");
  const [image, setImage] = useState(null);
  const [thumb, setThumb] = useState(null);

  // state error
  // const [namaError, setNamaError] = useState("");

  // validator
  // const simpleValidator = useRef(
  //   new SimpleReactValidator()
  // );
  const [, forceUpdate] = useState();
  const simpleValidator = useRef(
    new SimpleReactValidator({ autoForceUpdate: { forceUpdate: forceUpdate } })
  );

  const dispatch = useDispatch();

  const { addBarangResult, detailBarangResult, editBarangResult } = useSelector(
    (state) => state.BarangReducer
  );

  // const validate = () => {
  //   let namaErr = "";

  //   if (!namaBarang) {
  //     namaErr = "Nama tidak boleh kosong";
  //   }

  //   if (namaErr) {
  //     setNamaError(namaErr);
  //     return false;
  //   }

  //   return true;
  // };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);

    setThumb(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("masuk submit");

    // console.log("image files", image);
    // const isValid = validate();

    // if (isValid) {
    //   console.log("error");
    // }

    if (simpleValidator.current.allValid()) {
      if (idBarang) {
        console.log("state gambar edit", image);
        dispatch(
          editBarang({
            id_barang: idBarang,
            nama_barang: namaBarang,
            keterangan: keterangan,
            harga: harga,
            gambar: typeof image === "object" ? image : null,
          })
        );
      } else {
        dispatch(
          addBarang({
            nama_barang: namaBarang,
            keterangan: keterangan,
            harga: harga,
            gambar: image,
          })
        );
      }
      // setThumb(null)
    } else {
      simpleValidator.current.showMessages();
    }
  };

  useEffect(() => {
    if (addBarangResult) {
      dispatch(getListBarang());
      setNamaBarang("");
      setKeterangan("");
      setHarga("");
      setImage(null);
      // setThumb("");
    }
  }, [addBarangResult, dispatch]);

  useEffect(() => {
    if (detailBarangResult) {
      setNamaBarang(detailBarangResult.nama_barang);
      setKeterangan(detailBarangResult.keterangan);
      setHarga(detailBarangResult.harga);
      setImage(detailBarangResult.gambar);
      setIdBarang(detailBarangResult.id_barang);
      // log
      // console.log("id barang here", detailBarangResult.id_barang)
      console.log("nama barang here", detailBarangResult.gambar);
      console.log("nama barang here", typeof detailBarangResult.gambar);
      // console.log(detailBarangResult.keterangan)
      // console.log("detail barang result here", detailBarangResult)
    }
  }, [detailBarangResult, dispatch]);

  useEffect(() => {
    if (editBarangResult) {
      dispatch(getListBarang());
      setNamaBarang("");
      setKeterangan("");
      setHarga("");
      setImage(null);
      // setGambar("");
    }
  }, [editBarangResult, dispatch]);

  return (
    <div className="box-form">
      <h4>{idBarang ? "Edit Barang " : "Tambah Barang"}</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nama Barang"
            name="nama_barang"
            value={namaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
            // onBlur={() => simpleValidator.current.showMessageFor("keterangan")}
          />
          {/* <div style={{ color: "red" }}>{namaError}</div> */}
          <input
            type="text"
            placeholder="Keterangan barang"
            name="keterangan"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            onBlur={() => simpleValidator.current.showMessageFor("keterangan")}
          />
          {simpleValidator.current.message(
            "keterangan",
            keterangan,
            "required"
          )}
          <input
            type="text"
            placeholder="Harga barang"
            name="harga"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            // required
          />
          {/* <input
            type="text"
            placeholder="Gambar barang"
            name="gambar"
            value={gambar}
            onChange={(e) => setGambar(e.target.value)}
          /> */}
          <div className="preview">
            <input
              type="file"
              onChange={(e) => imageHandler(e)}
              name="gambar"
            />
            {thumb && <img src={thumb} className="thumbnail" alt="thumbnail" />}
            {/* <img src={"http://localhost:8000/" + image} className="thumbnail"/> */}
            {typeof image == "string" ? (
              <img
                src={"http://localhost:8000/" + image}
                className="thumbnail"
              />
            ) : null}
          </div>
          <button className="btn-save">Save</button>
        </div>
      </form>
    </div>
  );
}
