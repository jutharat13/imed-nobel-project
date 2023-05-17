/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */

import "./App.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Header from "./components/Header";
import Filter from "./components/Filter";
import Details from "./components/Details";

import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = "https://api.nobelprize.org/2.1";

function App() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line no-undef
    axios.get(`${baseURL}/nobelPrizes`).then((response) => {
      setPost(response.data.nobelPrizes);
      console.log(response.data.nobelPrizes);
    });
  }, []);

  if (!post) return null;

  const nobelElements = post.map((post, index) => {
    return <Details key={index} posts={post} />;
  });
  
  const [searchYear, setSearchYear] = useState("");


  function onFilteredClick() {

    axios.get(`${baseURL}/nobelPrizes?nobelPrizeYear=${searchYear}`).then((response) => {
      setPost(response.data.nobelPrizes);
      console.log(response.data.nobelPrizes);
    });

  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Filter />
            <Form.Label className="labelForm">AwardYear</Form.Label>
            <Form.Control
              id="search-input"
              type="number"
              placeholder="Year"
              value={searchYear}
              onChange={(event) => {
                setSearchYear(event.target.value);
              }}
            />
            <Button 
            className="ButtonFilter"
              onClick={() => {
                onFilteredClick((event) => {
                  setSearchYear(event.target.value);
                });
              }}
            >
              Filter
            </Button>
          </Col>
          <Col sm={8}>
            <p className="headre"><h5>Nobel Prize</h5></p>
            <Table>
              <thead>
                <tr>
                  <th>AwardYear</th>
                  <th>Category</th>
                  <th>CategoryFullName</th>
                  <th>DateAwarded</th>
                  <th>Amount</th>

                </tr>
              </thead>
              {nobelElements}
              {/* <tr>
                <th>Amount</th>
                <th></th>
                  <th></th>
                  <th></th>
                <th>1000</th>
              </tr> */}
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
