import React from "react";
import {Button, Container, Table} from "react-bootstrap";

class SaleDataTable extends React.Component {

    render() {
        const titles = ['ID', 'Customer', 'Book', 'Date','Amount', 'Total', 'Actions'];
        const sales = this.props.sales;
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
                    {sales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.customer.name}</td>
                            <td>{sale.book.name}</td>
                            <td>{sale.saleDate}</td>
                            <td>{sale.amount}</td>
                            <td>{sale.total}</td>
                            <td><Button variant="danger" onClick={() => {this.props.removeItem(sale) }}>
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

export default SaleDataTable;