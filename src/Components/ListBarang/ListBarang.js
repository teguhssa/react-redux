import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getListBarang,
  deleteBarang,
  detailBarang,
} from "../../actions/barangAction";
import AddBarang from "../AddBarang/AddBarang";
import "../../asset/style.css";
import Button from "@mui/material/Button";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export default function ListBarang() {
  const dispatch = useDispatch();
  const {
    getListBarangResult,
    getListBarangLoading,
    getListBarangError,
    deleteBarangResult,
  } = useSelector((state) => state.BarangReducer);

  useEffect(() => {
    // console.log("1. masuk useEffect");
    dispatch(getListBarang());
  }, [dispatch]);

  useEffect(() => {
    if (deleteBarangResult) {
      dispatch(getListBarang());
      console.log("Masuk useEffect hapus");
    }
  }, [deleteBarangResult, dispatch]);

  const handleGenerate = () => {
    axios({
      method: "POST",
      url: "http://localhost:8000/generate",
      timeout: 1200000,
      data: {
        data_barang: [
          ...getListBarangResult.map((itm) => {
            return {
              nama_barang: itm.nama_barang,
              keterangan: itm.keterangan,
              qty: itm.qty,
              harga: itm.harga,
            };
          }),
        ],
      },
    }).then((response) => {
      console.log(response);
      axios
        .get(
          "http://localhost:8000/" +
            response.data.filepath +
            "/" +
            response.data.filename
        )
        .then((res) => {
          console.log(res);
        });
    });

    // console.log(getListBarangResult)
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<FileDownloadOutlinedIcon />}
        onClick={handleGenerate}
      >
        Generate to Pdf
      </Button>
      <table>
        <caption>Data Barang</caption>
        <thead>
          <tr>
            <th scope="col">Nama Barang</th>
            <th scope="col">Keterangan Barang</th>
            <th scope="col">QTY</th>
            <th scope="col">Harga Barang</th>
            <th scope="col">Gambar Barang</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {getListBarangResult ? (
            getListBarangResult.map((barang) => {
              return (
                <tr key={barang.id_barang}>
                  <td>{barang.nama_barang}</td>
                  <td>{barang.keterangan}</td>
                  <td>{barang.qty}</td>
                  <td>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(barang.harga * barang.qty)}
                  </td>
                  <td>
                    <img
                      src={"http://localhost:8000/" + barang.gambar}
                      className="prev"
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => dispatch(detailBarang(barang))}
                      className="btn-action"
                    >
                      Edit
                    </button>{" "}
                    |{" "}
                    <button
                      onClick={() => dispatch(deleteBarang(barang.id_barang))}
                      className="btn-action"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })
          ) : getListBarangLoading ? (
            <p>Loading . . . .</p>
          ) : (
            <p>{getListBarangError ? getListBarangError : "Data Kosong"}</p>
          )}
        </tbody>
      </table>
      <AddBarang />
    </div>
  );
}
