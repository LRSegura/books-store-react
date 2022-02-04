import React from "react";
import SaleDataTable from "./SaleDataTable";
import BookStoreNavBar from "./BookStoreNavBar";
import {Button, Container, Form, Row} from "react-bootstrap";
import {NotificationContainer} from "react-notifications";

class SaleForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {customer: {}, book: {}, saleDate: new Date(), amount: 0,
            total: 0.0, customers: [], books: [], sales: []}
    }

    async componentDidMount() {
        const urlCustomer = 'http://localhost:8080/customer/find/all';

        const responseCustomer = await fetch(urlCustomer, {
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
        responseCustomer.json().then(data => {
            if (data) {
                const customers = this.state.customers;
                data.map(item =>(
                    customers.push(item)
                ));
                this.setState({customers})
            }
        });

        const urlBooks = 'http://localhost:8080/books/find/all';

        const responseBooks = await fetch(urlBooks, {
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
        responseBooks.json().then(data => {
            if (data) {
                const books = this.state.books;
                data.map(item =>(
                    books.push(item)
                ));
                this.setState({books})
            }
        });
    }

    onValueChangeCustomer(e) {

    }

    render() {
        const customers = this.state.customers;
        const books = this.state.books;
        const sales = this.state.sales;
        return (
            <div>
                <BookStoreNavBar/>
                <Container fluid='sm'>
                    <h1>Sales</h1>
                    <Form>
                        {/*<Row className="mb-3">*/}
                        {/*    <Form.Group className='mb-3'>*/}
                        {/*        <Form.Label>Name</Form.Label>*/}
                        {/*        <Form.Control type="text" placeholder="Type writer's Name" value={name}*/}
                        {/*                      onChange={this.onValueChangeName}/>*/}
                        {/*    </Form.Group>*/}
                        {/*</Row>*/}
                        {/*<Row className="mb-3">*/}
                        {/*    <Form.Group className='mb-3'>*/}
                        {/*        <Form.Label>Last Name</Form.Label>*/}
                        {/*        <Form.Control type="text" placeholder="Type writer's last name" value={lastName}*/}
                        {/*                      onChange={this.onValueChangeLastName}/>*/}
                        {/*    </Form.Group>*/}
                        {/*</Row>*/}
                        <Row className="mb-3">
                            <Form.Select aria-label="Default select example" onChange={this.onValueChangeCustomer}>
                                <option>Select customer</option>
                                {
                                    customers.map(item => (
                                        <option key={item.id} value={item.id}>{item.name + ' ' + item.lastName}</option>
                                    ))
                                }
                            </Form.Select>
                        </Row>
                        <Row className="mb-3">
                            <Form.Select aria-label="Default select example" onChange={this.onValueChangeBooks}>
                                <option>Select Book</option>
                                {
                                    books.map(item => (
                                        <option key={item.id} value={item.id}>{item.name + ' ' + item.writer.name + ' ' + item.writer.lastName }</option>
                                    ))
                                }
                            </Form.Select>
                        </Row>
                        <Button variant="success" onClick={this.sendPostSale}>
                            Submit
                        </Button>
                    </Form>

                </Container>
                <br/>
                <SaleDataTable titles={['ID','name', 'Last Name', 'Actions']} sales={sales} removeItem={this.removeItem}/>
                <NotificationContainer/>
            </div>
        );
    }


    onValueChangeBooks(e) {

    }

    sendPostSale() {

    }
}

export default SaleForm;