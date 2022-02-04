import React from "react";
import {NotificationContainer, NotificationManager} from "react-notifications";
import BookStoreNavBar from "./BookStoreNavBar";
import {Button, Container, Form, Row} from "react-bootstrap";
import BooksDataTable from "./BooksDataTable";

class BookForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: '', year: '', price: 0.0, writer: {}, writers: [], books: []}
        this.onValueChangeName = this.onValueChangeName.bind(this);
        this.onValueChangeYear = this.onValueChangeYear.bind(this);
        this.onValueChangePrice = this.onValueChangePrice.bind(this);
        this.onValueChangeWriter = this.onValueChangeWriter.bind(this);
        this.sendPostBook = this.sendPostBook.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.valueWriterOnchange = {};
    }

    onValueChangeName(e) {
        this.setState({name: e.target.value})
    }

    onValueChangeYear(e) {
        this.setState({year: e.target.value})
    }

    onValueChangePrice(e) {
        this.setState({price: e.target.value})
    }

    onValueChangeWriter(e) {
        const id = parseInt(e.target.value);
        const writers = this.state.writers;
        const writer = writers.filter((value, index, array) => value.id === id).shift();
        this.setState({writer})
        this.valueWriterOnchange = e;
    }


    async componentDidMount() {
        const urlBooks = 'http://localhost:8080/books/find/all';

        const response = await fetch(urlBooks, {
                method: 'GET',
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: "follow",
                referrerPolicy: "no-referrer"
            }
        );
        response.json().then(data => {
            if (data) {
                const books = this.state.books;
                data.map(item =>(
                    books.push(item)
                ));
                this.setState({books})
            }
        });

        const urlWriters = 'http://localhost:8080/writer/find/all';

        const responseWriters = await fetch(urlWriters, {
                method: 'GET',
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: "follow",
                referrerPolicy: "no-referrer"
            }
        );
        responseWriters.json().then(data => {
            if (data) {
                const writers = this.state.writers;
                data.map(item =>(
                    writers.push(item)
                ));
                this.setState({writers})
            }
        });
    }

    async sendPostBook() {
        const book = {
            name: this.state.name,
            year: this.state.year,
            price: this.state.price,
            writer: this.state.writer
        };

        if (!book.name || !book.year || !book.price|| !book.writer || Object.keys(book.writer).length ===0) {
            NotificationManager.error('Field Empty');
            return;
        }

        const url = 'http://localhost:8080/books/save';

        const response = await fetch(url, {
                method: 'POST',
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(book)
            }
        );
        response.json().then(data => {
            if (data) {
                const books = this.state.books;
                books.push(data);
                NotificationManager.success('Success', '');
                this.setState({name: '', year: '', price: 0.0, writer:{}});
                this.valueWriterOnchange.target.value = 'Select Writer';
            }
        });
    }

    async removeItem(item) {
        const url = 'http://localhost:8080/books/delete';

        await fetch(url, {
                method: 'DELETE',
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(item)
            }
        );

        const books = this.state.books;
        const filteredBooks = books.filter((value, index, array) => value.id !== item.id)
        this.setState({books: filteredBooks});
    }

    render() {
        const name = this.state.name;
        const year = this.state.year;
        const price = this.state.price;
        const writers = this.state.writers;
        const books = this.state.books;
        return (
            <div>
                <BookStoreNavBar/>
                <Container fluid='sm'>
                    <h1>Books</h1>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group className='mb-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Type book's Name" value={name}
                                              onChange={this.onValueChangeName}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group className='mb-3'>
                                <Form.Label>year</Form.Label>
                                <Form.Control type="text" placeholder="Type book's year" value={year}
                                              onChange={this.onValueChangeYear}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group className='mb-3'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" placeholder="Type book's price" value={price}
                                              onChange={this.onValueChangePrice}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Select aria-label="Default select example" onChange={this.onValueChangeWriter}>
                                <option>Select Writer</option>
                                {
                                    writers.map(item => (
                                        <option key={item.id} value={item.id}>{item.name + ' ' + item.lastName}</option>
                                    ))
                                }
                            </Form.Select>
                        </Row>
                        <Button variant="success" onClick={this.sendPostBook}>
                            Submit
                        </Button>
                    </Form>

                </Container>
                <br/>
                <BooksDataTable books={books} removeItem={this.removeItem}/>
                <NotificationContainer/>
            </div>
        );
    }
}

export default BookForm;