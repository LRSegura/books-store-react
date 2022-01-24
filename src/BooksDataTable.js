import React from "react";
import {Button, Container, Table} from "react-bootstrap";

class BooksDataTable extends React.Component {

    render() {
        const titles = ['ID', 'Name', 'Year', 'Price', 'Writer'];
        const books = this.props.books;
        console.log(books);
        return (
            <Container fluid='md'>
                <Table striped bordered hover>
                    <thead>
                    <tr>{
                        titles.map(title =>(
                            <th key={title}>{title}</th>
                        ))
                    }
                    </tr>
                    </thead>
                    <tbody>
                    {books.map(book => (

                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.name}</td>
                            <td>{book.year}</td>
                            <td>{book.price}</td>
                            <td>{book.writer}</td>

                            <td><Button variant="danger" onClick={() => {this.props.removeItem(book) }}>
                                Delete
                            </Button></td>
                        </tr>
                    ))
                    }
                    </tbody>
                </Table>
            </Container>
        );
    }
}
export default BooksDataTable;