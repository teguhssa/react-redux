import { AddBarang, AddKontak, ListKontak, Navbar } from "./Components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListBarang from "./Components/ListBarang/ListBarang";

function App() {
  return (
    <div className="App" style={{ padding: "30px" }}>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="barang" element={<ListBarang />}/>
      </Routes>
      </BrowserRouter>
            {/* <AddKontak /> */}
            {/* <ListKontak /> */}
    </div>
  );
}

export default App;
