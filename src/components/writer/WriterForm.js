import React from "react";
import {Button, Container, Form, Row} from "react-bootstrap";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'bootstrap/dist/css/bootstrap.min.css';
import customStyle from "../../styles/customStyle.css";
import WriterDataTable from "./WriterDataTable";
import BookStoreNavBar from "../../components/navBar/BookStoreNavBar";

class WriterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: '', lastName: '', writers: []}
        this.onValueChangeName = this.onValueChangeName.bind(this);
        this.onValueChangeLastName = this.onValueChangeLastName.bind(this);
        this.sendPostWriter = this.sendPostWriter.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    onValueChangeName(e) {
        this.setState({name: e.target.value})
    }

    onValueChangeLastName(e) {
        this.setState({lastName: e.target.value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/writer/find/all';

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
                const writers = this.state.writers;
                data.map(item =>(
                    writers.push(item)
                ));
                this.setState({writers})
            }
        });
    }

    async sendPostWriter() {
        const writer = {
            name: this.state.name,
            lastName: this.state.lastName
        };

        if (!writer['name'] || !writer['lastName']) {
            NotificationManager.error('Field Empty');
            return;
        }

        const url = 'http://localhost:8080/writer/save';

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
                body: JSON.stringify(writer)
            }
        );
        response.json().then(data => {
            if (data) {
                const writers = this.state.writers;
                writers.push(data);
                NotificationManager.success('Success', '');
                this.setState({name: '', lastName: ''});
            }
        });
    }

    async removeItem(item) {
        console.log(item);
        const url = 'http://localhost:8080/writer/delete';

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

        const writers = this.state.writers;
        const filteredWriters = writers.filter((value) => value.id !== item.id)
        this.setState({writers: filteredWriters});
    }

    render() {
        const name = this.state.name;
        const lastName = this.state.lastName;
        const writers = this.state.writers;
        return (
            <div>
                <BookStoreNavBar/>
                <Container fluid='sm'>
                    <h1>Writers</h1>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group className='mb-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Type writer's Name" value={name}
                                              onChange={this.onValueChangeName}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group className='mb-3'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Type writer's last name" value={lastName}
                                              onChange={this.onValueChangeLastName}/>
                            </Form.Group>
                        </Row>
                        <Button variant="success" onClick={this.sendPostWriter}>
                            Submit
                        </Button>
                    </Form>

                </Container>
                <br/>
                <WriterDataTable titles={['ID','name', 'Last Name', 'Actions']} writers={writers} removeItem={this.removeItem}/>
                <NotificationContainer/>
            </div>
        );
    }

}

export default WriterForm;