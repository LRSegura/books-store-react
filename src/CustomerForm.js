import React from "react";
import {NotificationContainer, NotificationManager} from "react-notifications";
import BookStoreNavBar from "./BookStoreNavBar";
import {Button, Container, Form, Row} from "react-bootstrap";
import CustomerDataTable from "./CustomerDataTable";

class CustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', lastName: '', customers: []}
        this.onValueChangeName = this.onValueChangeName.bind(this);
        this.onValueChangeLastName = this.onValueChangeLastName.bind(this);
        this.sendPostCustomer = this.sendPostCustomer.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    onValueChangeName(e) {
        this.setState({name: e.target.value})
    }

    onValueChangeLastName(e) {
        this.setState({lastName: e.target.value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/customer/find/all';

        const response = await fetch(url, {
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
                const customers = this.state.customers;
                data.map(item =>(
                    customers.push(item)
                ));
                this.setState({customers})
            }
        });
    }

    async sendPostCustomer() {
        const customer = {
            name: this.state.name,
            lastName: this.state.lastName
        };

        if (!customer['name'] || !customer['lastName']) {
            NotificationManager.error('Field Empty');
            return;
        }

        const url = 'http://localhost:8080/customer/save';

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
                body: JSON.stringify(customer)
            }
        );
        response.json().then(data => {
            if (data) {
                const customers = this.state.customers;
                customers.push(data);
                NotificationManager.success('Success', '');
                this.setState({name: '', lastName: ''});
            }
        });
    }

    async removeItem(item) {
        console.log(item);
        const url = 'http://localhost:8080/customer/delete';

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

        const customers = this.state.customers;
        const filteredCustomers = customers.filter((value, index, array) => value.id !== item.id)
        this.setState({customers: filteredCustomers});
    }

    render() {
        const name = this.state.name;
        const lastName = this.state.lastName;
        const customers = this.state.customers;

        return (
            <div>
                <BookStoreNavBar/>
                <Container fluid='sm'>
                    <h1>Customers</h1>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group className='mb-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Type customer's Name" value={name}
                                              onChange={this.onValueChangeName}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group className='mb-3'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Type customer's last name" value={lastName}
                                              onChange={this.onValueChangeLastName}/>
                            </Form.Group>
                        </Row>
                        <Button variant="success" onClick={this.sendPostCustomer}>
                            Submit
                        </Button>
                    </Form>

                </Container>
                <br/>
                <CustomerDataTable customers={customers} removeItem={this.removeItem}/>
                <NotificationContainer/>
            </div>
        );
    }
}

export default CustomerForm;