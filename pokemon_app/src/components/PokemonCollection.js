import React, { useState, useCallback, useEffect, useRef } from "react";
import PokemonCard from "./PokemonCard";
import classes from "./PokemonCollection.module.css";
const PokemonCollection = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(1);
  const loaderRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${10 * index}`
    );
    if (!response.ok) {
      throw new Error("fectching new data went wrong");
    }
    const data = await response.json();
    if (data.length === 0) {
      setIsLoading(false);
      return;
    }
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
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10" //&offset=10"
        );
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
    <>
      <div>
        <div className={classes["container"]}>
          {items.map((e, i) => (
            <PokemonCard key={i} url={e.url} />
          ))}
        </div>
        <div className={classes["loading"]} ref={loaderRef}>
          <div className={classes["loader"]}></div>
        </div>
      </div>
    </>
  );
};
export default PokemonCollection;
