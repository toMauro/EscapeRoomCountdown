import React, {Component} from 'react';

import './App.css';

import ReactCountdownClock from 'react-countdown-clock'


const Countdown = React.createClass({

    render () {
        return (
            <div className="App">
                <ReactCountdownClock seconds={2400}
                                     color="#000"
                                     alpha={0.9}
                                     size={300}
                                     onComplete={App.timeExpired} />
            </div>
        );
    }
});

class App extends Component {

    constructor(props) {
        super();

        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    timeExpired(){

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {

        var entered = this.state.value.toString();

        if(entered === "compass"){
            alert('Correct');
        }else{
            alert('Wrong Try Again');
        }

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Countdown/>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

            </div>
        );
    }
}

export default App;
