import React from "react";
import classes from "./PokemonType.module.css";
const PokemonType = (props) => {
  return (
    <span
      className={`${classes["pill"]} ${
        classes["background-color-" + props.type]
      }`}
    >
      {props.type}
    </span>
  );
};

export default PokemonType;
