import { AddKontak, ListKontak } from "./Components";

function App() {
  return (
    <div className="App" style={{ padding: "30px" }}>
      <h3>Redux Management!</h3>
      <hr />
      <AddKontak />
      <hr />
      <ListKontak />
    </div>
  );
}

export default App;
