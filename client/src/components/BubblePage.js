import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        console.log('Colors data:', res);
        setColorList(res.data);
        console.log('Colors state:', colorList);
      })
      .catch(err => console.log("getData FAILED:", err))
  }, [colorList]);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
