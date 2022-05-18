import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteKontak, detailKontak, getListKontak } from "../../actions/kontakAction";

export default function ListKontak() {
  const {
    getListKontakResult,
    getListKontakLoading,
    getListkontakError,
    deleteKontakResult,
  } = useSelector((state) => state.KontakReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("1. useEffect");
    // panggil action getlistkontak
    dispatch(getListKontak());
  }, [dispatch]);

  useEffect(() => {
    if (deleteKontakResult) {
      dispatch(getListKontak());
      // console.log("SET NAMA IS HERE", setNama)
    }
  }, [deleteKontakResult, dispatch]);

  
  return (
    <div>
      <h4>List Kontak</h4>
      {getListKontakResult ? (
        getListKontakResult.map((kontak) => {
          return (
            <p key={kontak.id}>
              {kontak.nama} - {kontak.nohp} -{" "}
              <button onClick={() => dispatch(deleteKontak(kontak.id))}>
                Hapus
              </button>
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => dispatch(detailKontak(kontak))}
              >
                Edit
              </button>
            </p>
          );
        })
      ) : getListKontakLoading ? (
        <p>Loading. . . .</p>
      ) : (
        <p>{getListkontakError ? getListkontakError : "Data Kosong"}</p>
      )}
    </div>
  );
}
