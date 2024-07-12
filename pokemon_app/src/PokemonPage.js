import React, { useEffect, useState } from "react";
import classes from "./PokemonPage.module.css";
import PokemonType from "./components/PokemonType";
import { useParams } from "react-router-dom";

const PokemonPage = () => {
  const param = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const name = param.pokemonName;
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        if (!response.ok) {
          throw new Error("fetching Pokemon datails went wrong");
        }
        const newData = await response.json();
        const formatedData = {
          id: newData.id,
          name: newData.name,
          types: [...newData.types].map((e) => e.type.name),
          sprite: newData.sprites.front_default,
          ability: newData.abilities[0].ability.name,
          height: newData.height,
          weight: newData.weight,
          stats: newData.stats.reduce((acc, stat) => {
            acc[stat.stat.name] = stat.base_stat;
            return acc;
          }, {}),
        };
        setData(formatedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [param]);
  if (!data.id) return;
  return (
    <div className={classes["container"]}>
      <div className={classes["sprite"]}>
        <img
          src={data.sprite}
          alt={`${data.name}`}
          className={classes["image"]}
        />
        <h1>{data.name}</h1>
      </div>
      <div className={classes["attributs"]}>
        <p>
          Height: <br />
          <span
            style={{
              color: "black",
              fontSize: "25px",
            }}
          >{`${data.height} cm`}</span>
        </p>
        <p>
          Weight:
          <br />
          <span style={{ color: "black", fontSize: "24px" }}>
            {" "}
            {`${data.weight} kg`}
          </span>
        </p>
        <p className={classes["ability"]}>
          Ability:
          <br />
          <span style={{ color: "black", fontSize: "24px" }}>
            {`${data.ability}`}
          </span>
        </p>
        <p className={classes["ability"]}>
          Type:
          <br />
          <br />
          <span>
            {data.types.map((e) => (
              <PokemonType type={e} key={e} />
            ))}
          </span>
        </p>
      </div>
      <div className={classes["stats"]}>
        <p className={classes["attribut"]}>
          hp:
          <br />
          <span style={{ color: "black", fontSize: "24px" }}>
            {`${data.stats["hp"]}`}
          </span>
        </p>
        <p className={classes["attribut"]}>
          Attack:
          <br />
          <span style={{ color: "black", fontSize: "24px" }}>
            {`${data.stats["attack"]}`}
          </span>
        </p>
        <p className={classes["attribut"]}>
          Defense:
          <br />
          <span style={{ color: "black", fontSize: "24px" }}>
            {`${data.stats["defense"]}`}
          </span>
        </p>
        <p className={classes["attribut"]}>
          Special attack:
          <br />
          <span style={{ color: "black", fontSize: "24px" }}>
            {`${data.stats["special-attack"]}`}
          </span>
        </p>
        <p className={classes["attribut"]}>
          Special defense:
          <br />
          <span style={{ color: "black", fontSize: "24px" }}>
            {`${data.stats["special-defense"]}`}
          </span>
        </p>
        <p className={classes["attribut"]}>
          speed:
          <br />
          <span
            style={{
              color: "black",
              fontSize: "24px",
            }}
          >
            {`${data.stats["speed"]}`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PokemonPage;
