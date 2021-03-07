import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employees: []
        }

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
    }

    addEmployee() {
        this.props.history.push("/add-employee/_add");
    }

    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    deleteEmployee(id) {
        //rest api call
        EmployeeService.deleteEmployee(id).then((res) => {
            //instead of conventionally calling EmployeeService.getEmployees, we reduce our API calls and retrieve the employees array except this one and show it on screen - For Performance Improvement
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
        });
    }

    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }
    //
    // https://stackoverflow.com/questions/45337165/react-render-is-being-called-before-componentdidmount#:~:text=When%20a%20component%20is%20mounted,once%20after%20the%20first%20render.
    //Knowledge from StackOverflow - order of life-cycle function calls in REACT -> componentWillMount (similar to constructor()) -> render() -> componentDidMount()
    //Similar to above, we also have other life-cycle functions ->  componentWillRecieveProps --> shouldComponentUpdate-->componentWillUpdate -->render-->componentDidUpdate
    componentDidMount() {
        // As soon as the component is mounted, this function is called
        // This is the best place to make an AJAX call, or call a REST API
        EmployeeService.getEmployees().then((res) => {
            console.log(res.data);
            this.setState({ employees: res.data }); // this setState will tell React to rerender
        });
    }


    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row">
                    <button className="btn btn-primary" style={{ marginBottom: "15px" }} onClick={this.addEmployee}> Add Employee</button>
                </div>

                <div className="row">
                    <table className="table table-stripped table-bordered">

                        <thead>
                            <tr>
                                <th> Employee First Name</th>
                                <th> Employe Last Name</th>
                                <th> Employee Email Id</th>
                                <th> Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td> {employee.firstName} </td>
                                            <td> {employee.lastName} </td>
                                            <td> {employee.emailId} </td>
                                            <td>
                                                <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(employee.id)} className="btn btn-info">View</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;