import React from "react";
import {Button, Container, Table} from "react-bootstrap";

class CustomerDataTable extends React.Component {

    render() {
        const titles = ['ID', 'name', 'Last Name', 'Actions'];
        const customers = this.props.customers;
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
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.lastName}</td>
                            <td><Button variant="danger" onClick={() => {this.props.removeItem(customer) }}>
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

export default CustomerDataTable;