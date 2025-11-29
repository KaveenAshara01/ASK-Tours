import React, { useState } from "react";
import CommonSection from "./../shared/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import TourCard from "./../shared/TourCard";
import NewsLetter from './../shared/Newsletter'

const SearchResultList = () => {
  const location = useLocation();
  const [data] = useState(location.state);
  console.log(data);

  return (
    <>
      <CommonSection title={"Tour Search Results"} />
      <section>
        <Container>
          <Row>
            {data.length === 0 ? (
              <h4 className="text-center">No tour found</h4>
            ) : (
              data?.map((tour) => (
                <Col className="mb-4" lg="3" key={tour._id}>
                  
                  <TourCard tour={tour}></TourCard>
                  
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <NewsLetter></NewsLetter>
    </>
  );
};

export default SearchResultList;
