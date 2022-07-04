import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import "./Products.css";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useState } from "react";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
  "Shoes",
];

const Products = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const params = useParams();

  const {
    products,
    resultsPerPage,
    productsCount,
    filteredProductsCount,
    loading,
    error,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(params.keyword, currentPage, price, category, ratings));
  }, [
    dispatch,
    error,
    params.keyword,
    currentPage,
    price,
    alert,
    category,
    ratings,
  ]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products && products.length > 0
              ? products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              : "No Items"}
          </div>

          <div className="paginationBox">
            {resultsPerPage < count && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            )}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
