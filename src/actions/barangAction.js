import axios from "axios";

export const GET_LIST_BARANG = "GET_LIST_BARANG";
export const ADD_BARANG = "ADD_BARANG";
export const DELETE_BARANG = "DELETE_BARANG";
export const DETAIL_BARANG = "DETAIL_BARANG";
export const EDIT_BARANG = "EDIT_BARANG";

export const getListBarang = () => {
  // console.log("2. masuk ke action");
  return (dispatch) => {
    dispatch({
      type: GET_LIST_BARANG,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // get API
    axios({
      method: "GET",
      url: "http://localhost:8000/barang/info-barang",
      timeout: 1200000,
    })
      .then((response) => {
        // console.log("3. dapet data", response.data)
        dispatch({
          type: GET_LIST_BARANG,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // console.log("3. gagal dapet data", error);
        dispatch({
          type: GET_LIST_BARANG,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addBarang = (data) => {
  console.log("2. masuk ke action");
  return (dispatch) => {
    dispatch({
      type: ADD_BARANG,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    const formData = new FormData();
    formData.append("nama_barang", data.nama_barang);
    formData.append("keterangan", data.keterangan);
    formData.append("qty", data.qty);
    formData.append("harga", data.harga);
    formData.append("gambar", data.gambar);

    // get API
    axios({
      method: "POST",
      url: "http://localhost:8000/barang/tambah-barang",
      timeout: 1200000,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log("3. dapet data", response.data);
        dispatch({
          type: ADD_BARANG,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("3. gagal dapet data", error);
        dispatch({
          type: ADD_BARANG,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const deleteBarang = (id) => {
  // console.log("2. masuk ke action");
  return (dispatch) => {
    dispatch({
      type: DELETE_BARANG,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // get API
    axios({
      method: "DELETE",
      url: "http://localhost:8000/barang/hapus-barang/" + id,
      timeout: 1200000,
    })
      .then((response) => {
        // console.log("3. dapet data", response.data)
        dispatch({
          type: DELETE_BARANG,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // console.log("3. gagal dapet data", error);
        dispatch({
          type: DELETE_BARANG,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const detailBarang = (data) => {
  return (dispatch) => {
    dispatch({
      type: DETAIL_BARANG,
      payload: {
        data: data,
      },
    });
  };
};

export const editBarang = (data) => {
  console.log("2. masuk ke action", data);
  return (dispatch) => {
    dispatch({
      type: EDIT_BARANG,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    const formData = new FormData();
    formData.append("nama_barang", data.nama_barang);
    formData.append("keterangan", data.keterangan);
    formData.append("qty", data.qty)
    formData.append("harga", data.harga);
    if (data.gambar !== null) {
      formData.append("gambar", data.gambar);
    }

    // get API
    axios({
      method: "PUT",
      url: "http://localhost:8000/barang/edit-barang/" + data.id_barang,
      timeout: 1200000,
      // data: {
      //   nama_barang: data.nama_barang,
      //   keterangan: data.keterangan,
      //   harga: data.harga,
      //   gambar: data.gambar
      // }
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        // console.log("3. dapet data", response.data)
        console.log("data id is here", data.id_barang);
        console.log("gambar edit", data.gambar);
        console.log("Disini datanya", formData);
        dispatch({
          type: EDIT_BARANG,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // console.log("3. gagal dapet data", error);
        dispatch({
          type: EDIT_BARANG,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
