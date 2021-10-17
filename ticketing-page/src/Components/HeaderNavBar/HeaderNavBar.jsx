import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

export default function HeaderNavBar(){
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/Sports">Sports</Nav.Link>
                        <Nav.Link href="/Music">Music</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}