import {useEffect, useState} from "react"
import { deleteEmployee, listEmployees } from "../services/EmployeeService"
import { useNavigate } from "react-router-dom"

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {

        getAllEmployees();

    }, [])

function getAllEmployees() {
    listEmployees().then((response) => {
        setEmployees(response.data);
    }).catch(error => {
        console.error(error);
    })
}

function addNewEmployee() {
    navigator('/add-employee')
}

function updateEmployee(id) {
    navigator(`/update-employee/${id}`)
}

function removeEmployee(id) {
    // eslint-disable-next-line no-unused-vars
    deleteEmployee(id).then((response) => {
        getAllEmployees();
    }).catch(error => {
        console.error(error);
    })
}

  return (
    <div className="container">
        <h2 className="ceiling">List of Employees</h2>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button id="update" className="btn btn-info" onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button id="delete" className="btn btn-danger" onClick={() => removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>)
                }
            </tbody>
        </table>
        <button className="btn btn-primary mb-2" onClick={addNewEmployee} id="addemp-button">Add</button>
    </div>
  )
}

export default ListEmployeeComponent