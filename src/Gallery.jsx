import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useGlobalContext } from "./Context";
const url = `https://api.unsplash.com/search/photos?client_id=bYuc8xtvVNy3cJAcKGFoAPw67LxjKJ-brLJG1Gs8cvU`;

const Gallery = () => {
  const { searchTerm, setSearchTerm } = useGlobalContext();

  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    },
  });

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }

  const results = response.data.results;

  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    );
  }

  return (
    <section className="image-container">
      {results.map((image) => {
        const imageUrl = image?.urls?.regular;
        return <img key={image?.id} src={imageUrl} alt={image?.alt_description} className="img" />;
      })}
    </section>
  );
};

export default Gallery;
