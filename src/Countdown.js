import ReactCountdownClock from 'react-countdown-clock'
import React, {Component} from 'react';

export default class Countdown extends Component {

    timeExpired(){

    }

    render() {
        return (
            <div className="App">
                <ReactCountdownClock seconds={2400}
                                     color="#000"
                                     alpha={0.9}
                                     size={300}
                                     onComplete={this.timeExpired} />
            </div>

        );
    }

}