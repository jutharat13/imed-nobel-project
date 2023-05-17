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

  // const nobelElements = post.map((post, index) => {
  //   return <Details key={index} posts={post} />;
  // });
  const [searchYear, setSearchYear] = useState("");

  const nobelElements = post.filter((post) => {
    return post.awardYear.includes(searchYear);
  }).map((post, index) => {
    return <Details key={index} posts={post} />;
  });

  // const [searchYear, setSearchYear] = useState("");

  // const FilteredYear = post.filter((post) => {
  //   return post.awardYear.includes(searchYear);
  // });
  // console.log(FilteredYear);


  function onFilteredClick() {
    const FilteredYear = post.filter((post) => {
      return post.awardYear.includes(searchYear);
    }).map((post, index) => {
      return <Details key={index} posts={post} />;
    });
    console.log(FilteredYear);
    FilteredYear = nobelElements;
  }
//   if(!!FilteredYear) {
// console.log("test");
//   }
  // if (!!FilteredYear) {
  //   const nobelFiltered = FilteredYear.map((post, index) => {
  //     return <Details key={index} posts={post} />;
  //   });
  // }


  // if(!!FilteredYear){
  //   filteredNonel = <Details posts={nobelFiltered} />
  //   console.log("test")
  // }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Filter />
            <Form.Label>AwardYear</Form.Label>
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
            <p>Nobel Prize</p>
            <Table>
              <thead>
                <tr>
                  <th>AwardYear</th>
                  <th>Category</th>
                  <th>CategoryFullName</th>
                  <th>DateAwarded</th>
                </tr>
              </thead>
            </Table>
            {nobelElements}
            {/* {FilteredYear} */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
