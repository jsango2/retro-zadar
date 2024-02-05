import React, { useState } from "react";

import Slider from "@mui/material/Slider";

// const useStyles = makeStyles({
//   root: {
//     position: "relative",
//     display: "flex",
//     flexDirection: "column",
//     // paddingRight: "10px",
//     width: "45%",
//     height: "51%",
//     // top: "100px",
//     // right: "30px",
//     margin: "10px auto 0 10px",
//     "@media (max-width: 630px)": {
//       width: "85vw",
//       margin: "40px auto",
//       height: "35%",
//     },
//   },
//   title: {
//     position: "relative",
//     fontSize: "14px",
//     fontWeight: "bold",
//     textAlign: "center",
//     zIndex: "1",
//     top: "-7px",

//     color: "#7b7b7b",
//   },
// })

function valuetext(value) {
  return `${Number(value[0])} godina do ${Number(value[1])} `;
}

export default function SliderGodina() {
  const [value, setValue] = React.useState([1950, 2000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="slider">
      <Slider
        getAriaLabel={() => "Raspon godina"}
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
        min={1880}
        max={2024}
        orientation="vertical"
        valueLabelDisplay="on"
      />
    </div>
  );
}
