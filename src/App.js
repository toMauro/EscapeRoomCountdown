import React, {Component} from 'react';
import {Container, Row, Col, Table, Button, ButtonGroup } from 'reactstrap';
import {Pie, PieChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Cell} from 'recharts';
import './App.css';
import TriggerModal from "./TriggerForm";

let data01 = [{name: 'Facebook College Fund', value: 2154}, {name: 'Rainy Day Fund', value: 550},
    {name: 'Spare Change', value: 276}, {name: 'Hawaii Fund', value: 874}]

const COLORS = ['#99d7ea','#5bc0de','#34b0d5','#186177'];

const data = [
    {name: 'Jan', RainyDay: 40, Facebook: 24, SpareChange: 30,Hawaii: 33,amt: 24},
    {name: 'Feb', RainyDay: 30, Facebook: 13, SpareChange: 20,Hawaii: 26,amt: 22},
    {name: 'Mar', RainyDay: 20, Facebook: 98, SpareChange: 13,Hawaii: 76,amt: 22},
    {name: 'Apr', RainyDay: 27, Facebook: 39, SpareChange: 11,Hawaii: 13,amt: 20},
    {name: 'May', RainyDay: 18, Facebook: 48, SpareChange: 8,Hawaii: 11,amt: 21},
    {name: 'Jun', RainyDay: 23, Facebook: 38, SpareChange: 3,Hawaii: 7,amt: 25},
    {name: 'Jul', RainyDay: 34, Facebook: 43, SpareChange: 26,Hawaii: 34,amt: 21},
];



var triggers = [{
    ON_OFF:true,
    TRIGGER_NAME: "Facebook College Fund",
    Amount:'$50',
    Amount_MAX:'$500',
    SAVED: '$2154'
}, {
    ON_OFF:true,
    TRIGGER_NAME: "Rainy Day Fund",
    Amount:'$60',
    Amount_MAX:'$200',
    SAVED: '$550'
}, {
    ON_OFF:true,
    TRIGGER_NAME: "Spare Change",
    Amount:'$65',
    Amount_MAX:'$100',
    SAVED: '$276'
},{
    ON_OFF:true,
    TRIGGER_NAME: "Hawaii fund",
    Amount:'$30',
    Amount_MAX:'$200',
    SAVED: '$874'
}];


const RadioButtons = React.createClass( {

    onRadioBtnClick(rSelected) {
        this.setState({ rSelected });
    },

    setActive(event) {
        console.log(event.target.value);
    },

    render() {
        this.state={};
        var selected=true;

        return (
            <ButtonGroup>
                <Button color={selected===true ? "primary" : "secondary"} onClick={() => selected=false} ON_OFF={this.state.rSelected === 1}>On</Button>
                <Button color={selected===true ? "secondary" :"primary"} onClick={() => selected=true} ON_OFF={this.state.rSelected === 2}>Off</Button>
            </ButtonGroup>
        )
    }
});

const StraightAnglePieChart = React.createClass({
    render () {
        return (
            <PieChart width={800} height={400}>
                <Pie data={data01} cx={200} cy={200} outerRadius={80} fill='#0088FE'>
                    {
                        data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                </Pie>
            </PieChart>
        );
    }
});

const SimpleLineChart = React.createClass({
    render () {
        return (
            <LineChart width={600} height={300} data={data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="RainyDay" stroke="#cd5360" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="Facebook" stroke="#438496" />
                <Line type="monotone" dataKey="SpareChange" stroke="#338436" />
                <Line type="monotone" dataKey="Hawaii" stroke="#238496" />
            </LineChart>
        );
    }
});


class TableRow extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        console.log("state in row", this.props.trigger)
        return (

            <tr className="table-success">
                <td><RadioButtons isactive={this.props.trigger.ON_OFF}/></td>
                <td>{this.props.trigger.TRIGGER_NAME}</td>
                <td>{this.props.trigger.Amount}</td>
                <td>{this.props.trigger.Amount_MAX}</td>
                <td>{this.props.trigger.SAVED}</td>
            </tr>
        )
    }
}

class TableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            triggers: this.props.triggers,
            rows: []
        };
        console.log("tb triggers", this.props.triggers);
    }

    setRows(){
        var rows = [];
        console.log("props triggers in tb", this.props.triggers);
        this.props.triggers.forEach((trigger) => rows.push(<TableRow trigger={trigger} />));

        this.setState({rows: rows});
    }

    render() {
        console.log("state in table body", this.state);
            return (
                <Table responsive hover>
                    <thead>
                    <tr>
                        <th>Active</th>
                        <th>Name</th>
                        <th>Per Event Deposit Amount</th>
                        <th>Monthly Max Deposit</th>
                        <th>SAVED</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.rows}
                    </tbody>
                </Table>
            )}

    componentDidMount(){
        this.setRows();

    }
}



class App extends Component {

    constructor(props) {
        super();
        this.getData();

        this.state = {
            showModal: false,
            triggers: triggers
        };

        this.modalState = this.modalState.bind(this);
        this.showTriggerModal = this.showTriggerModal.bind(this);
        this.setBackupData = this.setBackupData.bind(this);
    }

    showTriggerModal() {
        this.setState({showModal: true});
    }

    modalState(value) {
        this.setState({showModal: value});
    }

    getData(){
        console.log("Carlos:" + this);
        var THAT = this;
        fetch('http://localhost:8080/triggers/', {
            method: 'GET'
        }).then((resp) => resp.json()).then(function(data){
            THAT.setState({triggers:data});

            return data;
        });

        console.log("state after get data",this.state);
    }

    setBackupData(data) {
        console.log(data);
        this.setState({
            triggers: this.state.triggers.push(data[0])
        });
        console.log(this.state.triggers);
    }

    render() {
        console.log("state at render: ",this.state.triggers);
        return (

            <Container>
                <div className="App">
                    <Row>
                        {/*Title header*/}
                        <Col>
                            <div className="App-header">
                                <h2>Crow's nest</h2>
                                <h3>See your savings differently</h3>

                            </div>
                        </Col>
                    </Row>

                    <Row className="chartsRow">
                        {/*graph of spending*/}
                        <Col md={{size: 4}}>

                            <StraightAnglePieChart triggers={this.state.triggers}/>
                        </Col>
                        <Col md={{size: 2}}>
                            <SimpleLineChart triggers={this.state.triggers}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className="App-intro">
                                You have saved $3,854 so far this year!
                            </p>

                            <div></div>

                        </Col>
                    </Row>

                    <Row className="newTriggerRow">
                        {/*Savings total*/}
                        <Col> <TriggerModal triggers={this.state.triggers}></TriggerModal></Col>
                        <Col md={{size: 3, offset:9}}>
                        <Button color="info" onClick={this.showTriggerModal}>New Trigger</Button>{' '}
                        {this.state.showModal ? <TriggerModal isOpen={this.state.showModal} modalState={this.modalState} backupData={this.setBackupData} /> : null}
                        </Col>
                        </Row>


                    <Row>
                        <Col>
                            <TableBody triggers={this.state.triggers}/>
                        </Col>
                        {/*Triggers */}
                    </Row>
                    <Row>
                        <Col/>
                    </Row>
                </div>
            </Container>
        );
    }
    componentDidMount(){
        this.setState({triggers:this.getData()});
        this.forceUpdate();
    }
}

export default App;
