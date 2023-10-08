import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
export default function Home() {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItems, setfoodItems] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:4000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setfoodCat(response[1]);
    setfoodItems(response[0]);
    // console.log(response[0],response[1])
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div
          id="carouselExample"
          style={{ objectFit: "contain !important" }}
          className="carousel slide"
        >
          <div className="carousel-inner" id="cor">
            <div
              className="carousel-caption"
              style={{ zIndex: "10", filter: "brightness(80%)" }}
            >
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success text-light"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?US"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(20%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?India"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(20%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?anime"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(20%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItems !== [] ? (
                  foodItems
                    .filter((item) => item.CategoryName === data.CategoryName)
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            // foodName={filterItems.name}
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                            // imgSrc={filterItems.img}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>no such data</div>
                )}
              </div>
            );
          })
        ) : (
          <div>"""""""</div>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
