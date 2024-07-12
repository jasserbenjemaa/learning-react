import React, { useEffect, useState } from "react";
import classes from "./PokemonCard.module.css";
import PokemonType from "./PokemonType";

const PokemonCard = (props) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(props.url);
        if (!response.ok) {
          throw new Error("fetching pokemon data went wrong");
        }
        const newData = await response.json();
        const formatedData = {
          id: newData.id,
          name: newData.name,
          types: [...newData.types].map((e) => e.type.name),
          sprite: newData.sprites.front_default,
        };
        setData(formatedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemon();
  }, [props.url]);
  if (!data.id) {
    return;
  }

  return (
    <div className={classes["card"]}>
      <div className={classes["img-box"]}>
        <img src={data.sprite} alt={data.name + " image"} />
      </div>
      <div className={classes["content"]}>
        <div className={classes["detail"]}>
          <p className={classes["name"]}>
            {data.name}
            <br />
            <span className={[classes["id"]]}>
              #{data.id.toString().padStart(3, "0")}
            </span>
          </p>
          <div className={classes["types"]}>
            {data.types.map((e) => (
              <PokemonType type={e} key={e} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
