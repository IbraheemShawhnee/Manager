import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (data.username.length && data.password.length) {
            try {
                const url = "/api/login";
                const { data: res } = await axios.post(url, data);
                if (res.success) {
                    window.open("/", "_self");
                }
                setMessage(res.message);
            } catch (error) {
                setMessage(error.message);
            }
        }
    };
    return (
        <section className="container">
            <div className="login-container">
                <div className="circle circle-one"></div>
                <div className="form-container">
                    <h1 className="opacity">LOGIN</h1>
                    <form onSubmit={handleSubmit}>
                        {message && <div>{message}</div>}
                        <input onChange={handleChange} name="username" type="text" placeholder="USERNAME" value={data.username} />
                        <input onChange={handleChange} name="password" type="password" placeholder="PASSWORD" value={data.password} />
                        <button type="submit" className="opacity">Login</button>
                    </form>
                </div>
                <div className="circle circle-two"></div>
            </div>
            <div className="theme-btn-container"></div>
        </section>
    )
}

export default Login;