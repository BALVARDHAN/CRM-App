import { useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import ShowUser from "./components/ShowUser";

function App() {
  const [isDataReady, setIsDataReady] = useState(false);
  const [fetchedData, setFetchedData] = useState({});

  if (isDataReady) {
    fetch("http://localhost:5000/fetch-data")
      .then((res) => res.json())
      .then((data) => {
        setFetchedData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="p-5 bg-sky-300 min-h-screen">
      <UserForm setIsDataReady={setIsDataReady} />
      {isDataReady ? (
        <ShowUser fetchedData={fetchedData} setIsDataReady={setIsDataReady} />
      ) : null}
    </div>
  );
}

export default App;
