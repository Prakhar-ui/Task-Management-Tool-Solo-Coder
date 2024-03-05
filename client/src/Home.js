import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";

const HomeStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 5rem;
`;

const Home = () => {
  return (
    <div>
      <Navbar />
      <HomeStyle> Hi Keep Doing Better !</HomeStyle>
    </div>
  );
};

export default Home;
