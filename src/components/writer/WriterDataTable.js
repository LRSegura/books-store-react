import React from "react";
import {Button, Container, Table} from "react-bootstrap";

class WriterDataTable extends React.Component {

    render() {
        const titles = this.props.titles;
        const writers = this.props.writers;
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
                    {writers.map(writer => (
                        <tr key={writer.id}>
                            <td>{writer.id}</td>
                            <td>{writer.name}</td>
                            <td>{writer.lastName}</td>
                            <td><Button variant="danger" onClick={() => {this.props.removeItem(writer) }}>
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

export default WriterDataTable;