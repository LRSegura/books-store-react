import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

class BookStoreNavBar extends React.Component {
    render() {
        return(
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        {/*<Nav.Link href="#home">Home</Nav.Link>*/}

                        {/*<Nav.Link href="#writers">Writers</Nav.Link>*/}
                        {/*<Nav.Link href="#books">Books</Nav.Link>*/}
                        {/*<Nav.Link href="#customers">Customers</Nav.Link>*/}
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default BookStoreNavBar;