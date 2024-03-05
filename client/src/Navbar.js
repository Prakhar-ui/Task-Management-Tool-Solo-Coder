import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNavbar = styled(Navbar)`
  padding-top: 10px;
  padding-bottom: 10px;
  position: fixed;
  max-width: 100vw;
  width: 100%;
`;

const StyledContainer = styled(Container)`
  &&& {
    padding-left: 0;
  }
`;

const NavLinkStyle = {
  color: "#fd18fe",
  fontSize: "1.25rem",
  margin: 0,
  padding: 0,
  flexGrow: 1,
  textAlign: "center",
};

const EqualSpaceNav = styled(Nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100vw;
  width: 100%;
`;

const CustomNavbar = () => {
  return (
    <StyledNavbar bg="dark" expand="lg" variant="dark">
      <StyledContainer fluid>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <EqualSpaceNav className="ms-auto">
            <Nav.Link as={Link} to="/" style={NavLinkStyle}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/monthly-calendar" style={NavLinkStyle}>
              Monthly Calendar
            </Nav.Link>
            <Nav.Link as={Link} to="/weekly-calendar" style={NavLinkStyle}>
              Weekly Calendar
            </Nav.Link>
            <Nav.Link as={Link} to="/create-event" style={NavLinkStyle}>
              Create Event
            </Nav.Link>
          </EqualSpaceNav>
        </Navbar.Collapse>
      </StyledContainer>
    </StyledNavbar>
  );
};

export default CustomNavbar;
