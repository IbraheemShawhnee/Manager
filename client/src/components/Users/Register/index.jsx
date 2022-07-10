import React from "react";
import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: ""
    });

    const [available, setAvailable] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const checkUsername = async ({ currentTarget: usernameInput }) => {
        const username = { username: usernameInput.value }
        if (username.username.length) {
            const url = "/api/checkUsername";
            const { data: res } = await axios.post(url, username);
            console.log(res);
            if (res.available) {
                console.log("a7a")
                setMessage("");
                setAvailable(true);
            }
            else {
                setAvailable(false);
                setMessage("Username already taken");
            }
        }
    };

    function validate() {
        if (
            data.name &&
            (data.username.length && available) &&
            data.password.length &&
            (data.password === data.confirmPassword)
        ) {
            return true;
        }
        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const url = "/api/register";
                const { data: res } = await axios.post(url, data);
                setMessage(res.message);
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setMessage(error.response.data.message);
                }
            }
        }
    };
    return (
        <Card>
            <Card.Header>Register a new Worker</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingFullName"
                        label="Full Name"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Full Name" name="name" onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingUsername"
                        label="Username"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Username" name="username" onChange={handleChange} onBlur={checkUsername} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingConfirmPassword"
                        label="Confirm Password"
                        className="mb-3"
                    >
                        <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingEmail"
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="Email" name="email" onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingPhoneNumber"
                        label="Phone Number"
                        className="mb-3"
                    >
                        <Form.Control type="string" placeholder="Phone Number" name="phoneNumber" onChange={handleChange} />
                    </FloatingLabel>
                    {message && <div>{message}</div>}
                    <Button
                        id="submit"
                        type="submit"
                        variant="success">
                        Register
                    </Button>
                </Form>
            </Card.Body>
        </Card >
    )
}

export default Register;