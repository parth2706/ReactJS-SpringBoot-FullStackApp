import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((response) => {
            this.setState({ employee: response.data });
        });
    }

    back() {
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> View Employee Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> Employee First Name: </label>
                            <div>{this.state.employee.firstName}</div>
                        </div>
                        <div className="row">
                            <label> Employee Last Name: </label>
                            <div>{this.state.employee.lastName}</div>
                        </div>
                        <div className="row">
                            <label> Employee Email Id: </label>
                            <div> {this.state.employee.emailId}</div>
                        </div>
                        <button className="btn btn-info" onClick={this.back.bind(this)} style={{ marginLeft: "10px" }}>Back</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewEmployeeComponent;