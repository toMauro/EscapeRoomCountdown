import React, { Component } from 'react';
import './TriggerForm.css';
import twitter from './images/twitter.svg'
import creditcard from './images/creditcard.svg'
import weather from './images/weather.svg'

import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';

let data = {
    triggerName: null,
    triggerType: null,
    creditCard: {
        name: null,
        number: null,
        cvc: null,
        expire: null
    },
    twitter: {
        username: null,
        hashtag: null
    },
    weather: {
        type: null,
    },
    amount: 0.00,
    maxAmount: 0.00,
    account: null,
};

class TriggerModal extends Component {
    constructor() {
        super();

        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    componentDidMount() {
        this.setState({
            modal: this.props.isOpen
        });
    }

    toggle() {
        this.props.modalState(!this.state.modal);

        this.setState({
            modal: !this.state.modal
        });
    }

    submitData() {
        // Trigger name
        data.triggerName = document.getElementById("trigger-name").value;

        // Trigger type
        const triggerType = document.getElementById("triggerType");
        if(triggerType.selectedIndex === 1) {
            data.triggerType = "CreditCard";
            data.creditCard.name = document.getElementById("card-name").value;
            data.creditCard.number = document.getElementById("card-number").value;
            data.creditCard.cvc = document.getElementById("card-cvc").value;
            data.creditCard.expire = document.getElementById("card-expiration").value;
        } else if(triggerType.selectedIndex  === 2) {
            data.triggerType = "Twitter";
            data.twitter.username = document.getElementById("twitter-username").value;
            data.twitter.hashtag = document.getElementById("twitter-hashtag").value;
        } else if(triggerType.selectedIndex  === 3) {
            data.triggerType = "Weather";
            const weatherCondition = document.getElementById("weather-dropdown");
            if(weatherCondition.selectedIndex === 0) {
                data.weather.type = "Rainy"
            } else if(weatherCondition.selectedIndex  === 1) {
                data.weather.type = "Cloudy"
            } else if(weatherCondition.selectedIndex  === 2) {
                data.weather.type = "Sunny"
            }
        }

        // Other
        data.amount = document.getElementById("amount").value;
        data.maxAmount = document.getElementById("maxAmount").value;
        data.account = document.getElementById("account").value;

        // Submit the data
        fetch('http://localhost:8080/triggers-new/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        this.props.modalState(!this.state.modal);
        this.setState({
            modal: !this.state.modal
        });

        // Submit data to App.js
        const twitterInfo = require('../app/twitterTrigger');
        const mainPageInfo = require('../app/mainPageInfo');
        const weather = require('../app/weather');
        twitterInfo.findHashtagInstances(data.twitter.username, data.twitter.hashtag);

        const backupData = [{
          TRIGGER_NAME: data.triggerName,
          TRIGGER_TYPE: data.triggerType,
          Amount: data.amount,
          Amount_MAX: data.maxAmount,
          ON_OFF: "true",
          SAVED: 0,
          WEATHER_TYPE: data.weather.type,
          TWITTER_USERNAME: data.twitter.username,
          TWITTER_HASHTAG: data.twitter.hashtag
        }];

        this.props.backupData(mainPageInfo.getMainPageInfo(backupData, 0, weather.getWeather()));
    }

    render() {
        return (
            <Form id="new-trigger-form">
                <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg" id="new-dialog-modal">
                    <ModalHeader id="modal-header" toggle={this.toggle}>New Trigger</ModalHeader>
                    <ModalBody>
                        <TriggerForm />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submitData}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Form>
        );
    }
}

class TriggerForm extends Component {
    constructor() {
        super();

        this.state = {
            triggerType: null
        };

        this.handleTrigger = this.handleTrigger.bind(this);
        this.showSelectedTriggerForm = this.showSelectedTriggerForm.bind(this);
    }

    handleTrigger(event) {
        const optionIndex = event.currentTarget.selectedIndex;

        if(optionIndex === 1) {
            this.setState({triggerType: <CreditCardTrigger />});
        } else if(optionIndex === 2) {
            this.setState({triggerType: <TwitterTrigger />});
        } else if(optionIndex === 3) {
            this.setState({triggerType: <WeatherTrigger />})
        }
    }

    showSelectedTriggerForm() {
        if(this.state.triggerType !== null) {
            return (<div id="trigger-box">{this.state.triggerType}</div>);
        }

        return '';
    }

    render() {
        return (
            <div id="form-data">
                <FormGroup>
                    <Label for="trigger-name">Name of your trigger:</Label>
                    <Input type="text" name="trigger-name" id="trigger-name" placeholder="ex. Rainy Day Fund" />
                </FormGroup>

                <FormGroup>
                    <Label for="triggerType">What type of trigger do you want?</Label>
                    <Input type="select" name="triggerType" id="triggerType" onChange={this.handleTrigger}>
                        <option selected disabled>Choose a trigger</option>
                        <option>Credit Card</option>
                        <option>Twitter</option>
                        <option>Weather</option>
                    </Input>

                    {this.showSelectedTriggerForm()}
                </FormGroup>

                <FormGroup>
                    <Label for="amount">How much money should be contributed?</Label>
                    <Input type="number" name="amount" id="amount" placeholder="0.00" />
                </FormGroup>
                <FormGroup>
                    <Label for="max-amount-frequency">Max contribution amount per year:</Label>
                    <Input type="number" name="maxAmount" id="maxAmount" placeholder="0.00" />
                </FormGroup>
                <FormGroup>
                    <Label for="account">Account where the money will go (401(k) or another fund account):</Label>
                    <Input type="text" name="account" id="account" />
                </FormGroup>
            </div>
        );
    }
}

// =================== Triggers ===================
class CreditCardTrigger extends Component {
    render() {
        return (
            <Container id="credit-card">
                <Row id="credit-card-header">
                    <Col xs="12">
                        <p>Please enter your credit card information as shown on your card.</p>
                    </Col>
                </Row>

                <Row id="credit-card-information">
                    <Col xs="12">
                        <FormGroup>
                            <Label for="card-name">Cardholder Name:</Label>
                            <Input type="text" name="card-name" id="card-name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="card-number">Credit Card Number:</Label>
                            <Input type="text" name="card-number" id="card-number" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="card-cvc">CVC (3-digit number on the back):</Label>
                            <Input type="text" name="card-cvc" id="card-cvc" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="card-expiration">Expiration Date:</Label>
                            <Input type="text" name="card-expiration" id="card-expiration" />
                        </FormGroup>
                    </Col>
                </Row>
            </Container>
        )
    };
}

class TwitterTrigger extends Component {
    render() {
        return (
            <Row id="twitter">
                <Col className="trigger-left" xs="3">
                    Twitter Details:
                    <img src={twitter} alt="Twitter" className="trigger-logo" />
                </Col>

                <Col className="trigger-right" xs="9">
                    <FormGroup>
                        <Label for="twitter-username">Which username would you like to watch?</Label>
                        <Input type="text" name="twiter-username" id="twitter-username" placeholder="Enter a username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="twitter-hashtag">The tweets should contain the following hashtag:</Label>
                        <Input type="text" name="twiter-hashtag" id="twitter-hashtag" placeholder="Enter a hashtag" />
                    </FormGroup>
                </Col>
            </Row>
        )
    };
}

class WeatherTrigger extends Component {
    render() {
        return (
            <Row id="weather">
                <Col className="trigger-left" xs="3">
                    Weather Details:
                    <img src={weather} alt="Weather" className="trigger-logo" />
                </Col>

                <Col className="trigger-right" xs="9">
                    <Label for="trigger-dropdown">Weather Condition:</Label>
                    <Input type="select" name="weather-dropdown" id="weather-dropdown">
                        <option>Rainy</option>
                        <option>Cloudy</option>
                        <option>Sunny</option>
                    </Input>
                </Col>
            </Row>
        )
    };
}

export default TriggerModal;
