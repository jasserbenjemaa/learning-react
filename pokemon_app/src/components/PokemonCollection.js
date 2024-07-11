import React, { useState, useCallback, useEffect, useRef } from "react";
import PokemonCard from "./PokemonCard";
import classes from "./PokemonCollection.module.css";
const PokemonCollection = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const loaderRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    //fetch
    setItems((prevItems) => [...prevItems, ...Array(10 * index)]);
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
        const response = Array(10).fill("");
        //fetch
        setItems(response);
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
            <PokemonCard />
          ))}
        </div>
        <div ref={loaderRef}>hello</div>
      </div>
    </>
  );
};
export default PokemonCollection;
