import { useState } from "react";
import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// let navigate = useNavigate();
const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.username.length && data.password.length) {
            try {
                const url = "/api/login";
                const { data: res } = await axios.post(url, data);
                setMessage(res.message);
                window.open("/", "_self");
            } catch (error) {
                setMessage(error.response.data.message);
            }
        }
    };
    return (
        <Card>
            <Card.Header>Login</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    {/* <Card.Title>Login</Card.Title> */}
                    <FloatingLabel
                        controlId="floatingUsername"
                        label="Username"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Username" name="username" onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                    </FloatingLabel>
                    {message && <div>{message}</div>}
                    <Button
                        id="submit"
                        type="submit"
                        variant="success">
                        Login
                    </Button>
                </Form>
            </Card.Body>
        </Card >
    )
}

export default Login;