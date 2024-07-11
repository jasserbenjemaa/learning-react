import { useState } from "react";

const useFetch = () => {
  const [IsLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState({});
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetch();
      setFetchedData(data);
    } catch (error) {
      setError({ message: error.message || "Failed to fetch data." });
    }
    setIsLoading(false);
  };
  fetchData();
  return {
    IsLoading,
    error,
    fetchedData,
  };
};

export default useFetch;
