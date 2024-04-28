import { useEffect, useState } from "react"
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService"
import { useNavigate, useParams } from "react-router-dom"

const AddEmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const {id} = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    }) 

    const navigator = useNavigate();

    function handleFirstName(event) {
        setFirstName(event.target.value);
    }

    function handleLastName(event) {
        setLastName(event.target.value);
    }

    function handleEmail(event) {
        setEmail(event.target.value);
    }

    function getBack() {
        navigator('/employees');
    }

    useEffect(() => {

        if(id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    function saveEmployee(event) {
        event.preventDefault();

        if(validateForm()) {

            const employee = {firstName, lastName, email}

            if(id) {
                updateEmployee(id, employee).then((response) => {
                    response.data
                    navigator('/employees');
                }).catch(error => {
                    console.error(error)
                })
            }
            else {
                createEmployee(employee).then((response) => {
                    response.data
                    navigator('/employees');
                }).catch(error => {
                    console.error(error)
                })
            }
        }
    }

    function validateForm() {

        let valid = true;
        const errorsCopy = {...errors}

        if(firstName.trim()) {
            errorsCopy.firstName = '';
        }
        else {
            errorsCopy.firstName = 'Field required.';
            valid = false;
        }

        if(lastName.trim()) {
            errorsCopy.lastName = '';
        }
        else {
            errorsCopy.lastName = 'Field required.';
            valid = false;
        }

        if(email.trim()) {
            errorsCopy.email = '';
        }
        else {
            errorsCopy.email = 'Field required.';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle() {
        if(id) {
            return <h2 className="text-center" id="title">Update Employee</h2>
        }
        else {
            return <h2 className="text-center" id="title">Add Employee</h2>
        }
    }

  return (
    <div className="container">
    <br /> <br />
        <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
                { pageTitle() }
                <div className="card-body">
                    <form>
                        <div className="form-group mb-2">
                            <input className={`form-control ${ errors.firstName ? 'is-invalid': '' }`}
                                   type="text" 
                                   placeholder="First Name" 
                                   name="firstName" 
                                   value={firstName}
                                   onChange={handleFirstName}>
                            </input>
                            { errors.firstName && <div className="invalid-feedback"> { errors.firstName } </div> }
                        </div>
                        <div className="form-group mb-2">
                            <input className={`form-control ${ errors.lastName ? 'is-invalid': '' }`} 
                                   type="text" 
                                   placeholder="Last Name" 
                                   name="lastName" 
                                   value={lastName}
                                   onChange={handleLastName}>
                            </input>
                            { errors.lastName && <div className="invalid-feedback"> { errors.lastName } </div> }
                        </div>
                        <div className="form-group mb-2">
                            <input className={`form-control ${ errors.email ? 'is-invalid': '' }`} 
                                   type="text" 
                                   placeholder="Email" 
                                   name="email" 
                                   value={email}
                                   onChange={handleEmail}>
                            </input>
                            { errors.email && <div className="invalid-feedback"> { errors.email } </div> }
                        </div>
                        <br></br>
                        <button className="btn btn-success" id="sb" onClick={saveEmployee}>Save</button>
                        <button className="btn btn-danger" id="back" onClick={getBack}>Back</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddEmployeeComponent