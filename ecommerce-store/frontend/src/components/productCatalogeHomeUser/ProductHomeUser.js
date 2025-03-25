import React, { useEffect, useState } from "react";
import Hero from "../hero/Hero";
import Categories from "../categories/Categories";
import { backendApiPrefix } from "../../constants/Constants";
import axios from "axios";

const ProductHomeUser = ({ setShowHeader }) => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${backendApiPrefix}/user/categories`);
      setCategories(res.data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      getAllCategories();
    }
  }, [categories]);

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);
  return (
    <div>
      <Hero />
      {categories.map((category, index) => (
        <Categories key={index} category={category.name} />
      ))}
    </div>
  );
};

export default ProductHomeUser;
