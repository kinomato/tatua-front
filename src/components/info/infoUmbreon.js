import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

export default class InfoUmbreon extends Component {
    render() {
        return (
            <div>
                <Jumbotron style={{height:'30rem'}}>
                    <h1>Welcome to Umbreon</h1>
                    <p>
                        The best store tea milk in the world. Tastes will make you feel flying to the heaven
                        You can't irresitible. Serving you is my pleasure!!!!
                    </p>
                    <p>
                        <Button variant="primary">Learn more</Button>
                    </p>
                </Jumbotron>
            </div>
        )
    }
}
