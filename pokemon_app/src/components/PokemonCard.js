import React from "react";
import classes from "./PokemonCard.module.css";
import PokemonType from "./PokemonType";

const PokemonCard = (props) => {
  const sprite =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png";
  return (
    <div className={classes["card"]}>
      <div className={classes["img-box"]}>
        <img src={sprite} alt={props.name + " image"} />
      </div>
      <div className={classes["content"]}>
        <div className={classes["detail"]}>
          <p className={classes["name"]}>
            charmander
            <br /> <span className={[classes["id"]]}>#004</span>
          </p>
          <div className={classes["types"]}>
            <PokemonType type="flying" />
            <PokemonType type="fighting" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
