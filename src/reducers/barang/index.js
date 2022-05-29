import {
  GET_LIST_BARANG,
  ADD_BARANG,
  DELETE_BARANG,
  EDIT_BARANG,
  DETAIL_BARANG,
} from "../../actions/barangAction";

const initialState = {
  getListBarangResult: false,
  getListBarangloading: false,
  getListBarangError: false,

  addBarangResult: false,
  addBarangloading: false,
  addBarangError: false,

  delteBarangResult: false,
  delteBarangloading: false,
  delteBarangError: false,

  detailBarangResult: false,

  editBarangResult: false,
  editBarangloading: false,
  editBarangError: false,
};

const barang = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_BARANG:
      return {
        ...state,
        getListBarangResult: action.payload.data,
        getListBarangloading: action.payload.loading,
        getListBarangError: action.payload.errorMessage,
      };

    case ADD_BARANG:
      return {
        ...state,
        addBarangResult: action.payload.data,
        addBarangloading: action.payload.loading,
        addBarangError: action.payload.errorMessage,
      };

    case DELETE_BARANG:
      return {
        ...state,
        deleteBarangResult: action.payload.data,
        deleteBarangloading: action.payload.loading,
        deleteBarangError: action.payload.errorMessage,
      };

    case DETAIL_BARANG:
      return {
        ...state,
        detailBarangResult: action.payload.data,
      };

      case EDIT_BARANG:
        console.log("masuk reducer")
        return {
          ...state,
          editBarangResult: action.payload.data,
          editBarangloading: action.payload.loading,
          editBarangError: action.payload.errorMessage,
        };
    default:
      return state;
  }
};

export default barang;
