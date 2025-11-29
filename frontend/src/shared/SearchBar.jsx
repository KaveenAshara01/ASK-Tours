import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup, Input } from "reactstrap";
import { BASE_URL } from "../utils/config.js";
import {useNavigate} from 'react-router-dom';

const SearchBar = () => {
  const tourTypeRef = useRef(null);
  const priceRef = useRef(null);

  const navigate = useNavigate()

  const handleSearch = async() => {
    console.log("Selected Tour Type:", tourTypeRef.current.value);
    console.log("Entered Price:", priceRef.current.value);

    const tourType = tourTypeRef.current.value;
    const maxPrice = priceRef.current.value;

    if (tourType === "" || maxPrice === "") {
      return alert("All fields are required!");
    }

    const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?tourType=${encodeURIComponent(tourType)}&maxPrice=${encodeURIComponent(maxPrice)}`)

    if(!res.ok) alert('Something went wrong' )

    const result = await res.json();

    console.log(result);

    navigate(`/tours/search?tourType=${tourType}&maxPrice=${maxPrice}`,{state: result.data})
  };

  return (
    <Col lg="10">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          {/* Tour Type Dropdown */}
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-pages-line"></i>
            </span>
            <div>
              <h6>Tour Type</h6>
              <Input
                type="select"
                id="tourType"
                name="tourType"
                className="custom-select"
                innerRef={tourTypeRef}
              >
                <option value="Cultural">Cultural</option>
                <option value="Adventure">Adventure</option>
                <option value="Wildlife">Wildlife</option>
                <option value="Beach">Beach</option>
              </Input>
            </div>
          </FormGroup>
          {/* Max Price Input */}
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-currency-fill"></i>
            </span>
            <div>
              <h6>Max Price</h6>
              <Input
                type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="Enter maximum price"
                innerRef={priceRef}
              />
            </div>
          </FormGroup>
          <span className="search__icon" type="submit" onClick={handleSearch}>
            <i class="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
