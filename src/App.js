import React, { useState } from "react";
import Browse from "./components/Browse/Browse";

function App() {
  const [trends, setTrends] = useState([]);

  //useFetch(API_CONSTS.TRENDING, trends, setTrends, 1);
  //console.log(trends);
  //useFetch(API_CONSTS.TRENDING, trends, setTrends, 2);

  //console.log("Inside App", trends);

  return (
    <div>
      <Browse />
    </div>
  );
}

export default App;
