import { combineReducers } from "redux";
import KontakReducer from "./kontak";
import BarangReducer from "./barang"

export default combineReducers({
  KontakReducer, BarangReducer
});
