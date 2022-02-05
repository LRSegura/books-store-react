import React from "react";
import SaleDataTable from "./SaleDataTable";
import BookStoreNavBar from "./BookStoreNavBar";
import {Button, Container, Form, Row} from "react-bootstrap";
import {NotificationContainer, NotificationManager} from "react-notifications";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class SaleForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {customer: {}, book: {}, saleDate: new Date(), amount: 0,
            total: 0.0, customers: [], books: [], sales: []}
        this.onValueChangeAmount = this.onValueChangeAmount.bind(this);
        this.sendPostSale = this.sendPostSale.bind(this)
        this.onValueChangeCustomer = this.onValueChangeCustomer.bind(this);
        this.onValueChangeBooks = this.onValueChangeBooks.bind(this);
        this.valueCustomerOnchange = null;
        this.valueBookOnchange = null;
    };

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
        const id = parseInt(e.target.value);
        const customers = this.state.customers;
        const customer = customers.filter((value, index, array) => value.id === id).shift();
        this.setState({customer})
        this.valueCustomerOnchange = e;
    }
    onValueChangeAmount(amount) {
        this.setState({amount});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // const date = this.state.saleDate;
        // console.log(date.get);
    }

    render() {
        const customers = this.state.customers;
        const books = this.state.books;
        const sales = this.state.sales;
        const amount = this.state.amount;
        return (
            <div>
                <BookStoreNavBar/>
                <Container fluid='sm'>
                    <h1>Sales</h1>
                    <Form>
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
                        <Row className="mb-3">
                            <DatePicker selected={this.state.saleDate} onChange={(saleDate) => this.setState({saleDate}) }/>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group className='mb-3'>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="text" placeholder="Type amount" value={this.state.amount}
                                              onChange={(event) => this.setState({amount: event.target.value})}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group className='mb-3'>
                                <Form.Label>Total</Form.Label>
                                <Form.Control type="text" placeholder="Type Total" value={this.state.total}
                                              onChange={(event) => this.setState({total: event.target.value})}/>
                            </Form.Group>
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
        const id = parseInt(e.target.value);
        const books = this.state.books;
        const book = books.filter((value, index, array) => value.id === id).shift();
        this.setState({book})
        this.valueBookOnchange = e;
    }

     async sendPostSale() {
         const sale = {
             customer: this.state.customer,
             book: this.state.book,
             saleDate: this.state.saleDate,
             amount: this.state.amount,
             total: this.state.total
         };
         const valueCustomer = this.valueCustomerOnchange;
         valueCustomer.target.value = null;
         const valueBook = this.valueBookOnchange;
         valueBook.target.value = null;
         console.log(sale);

         for (const valueSale in sale) {
             if (!sale[valueSale]) {
                 NotificationManager.error('Field Empty');
                 console.log(sale[valueSale]);
                 return;
             }
         }

         const url = 'http://localhost:8080/sales/save';

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
                 body: JSON.stringify(sale)
             }
         );
         response.json().then(data => {
             if (data) {
                 const sales = this.state.sales;
                 sales.push(data);
                 NotificationManager.success('Success', '');
                 this.setState({sales});
             }
         });
     }
}

export default SaleForm;