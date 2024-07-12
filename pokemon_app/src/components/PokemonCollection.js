import React, { useState, useCallback, useEffect, useRef } from "react";
import PokemonCard from "./PokemonCard";
import classes from "./PokemonCollection.module.css";
import { Link } from "react-router-dom";
const PokemonCollection = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(1);
  const loaderRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (isLoading) return;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${20 * index}`
    );
    if (!response.ok) {
      throw new Error("fectching new data went wrong");
    }
    const data = await response.json();
    if (data.results.length === 0) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setItems((prevItems) => [...prevItems, ...data.results]);
    setIndex((prevIndex) => prevIndex + 1);
    setIsLoading(false);
  }, [isLoading, index]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchData();
      }
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchData]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        setItems(data.results);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    getData();
  }, []);
  return (
    <div className={classes["flex"]}>
      <div>
        <input
          type="text"
          placeholder="search..."
          className={classes["search-bar"]}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={classes["container"]}>
          {items
            .filter((value) => value.name.slice(0, search.length) === search)
            .map((e, i) => (
              <Link to={`/${e.name}`}>
                <PokemonCard key={i} url={e.url} />
              </Link>
            ))}
        </div>
        <div className={classes["loading"]} ref={loaderRef}>
          {isLoading && <div className={classes["loader"]}></div>}
        </div>
      </div>
    </div>
  );
};
export default PokemonCollection;
