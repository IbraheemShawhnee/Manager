import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Container,
    FormWrap,
    Icon,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    Text
} from "./Elements";
import { UserContext } from "../../App";

const Login = () => {
    document.title = "Manager - Login";
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
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
            setMessage("");
            try {
                const url = "/api/login";
                const { data: res } = await axios.post(url, data);
                if (res.success) {
                    setMessage(res.message);
                    setUser(res.user);
                    if (location.state?.from) {
                        navigate(location.state.from.pathname);
                    }
                    else {
                        navigate("/");
                    }
                }
            } catch (error) {
                setMessage(error.message);
            }
        }
        else {
            setMessage("All feilds are required!");
        }
    };
    return (
        <>
            <Container>
                <FormWrap>
                    <FormContent>
                        <Form onSubmit={handleSubmit}>
                            <FormH1>Login to your acount</FormH1>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <FormInput type="text" name="username" onChange={handleChange}></FormInput>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormInput type="password" name="password" onChange={handleChange}></FormInput>
                            <FormButton>Login</FormButton>
                            {message &&
                                <Text>{message}</Text>
                            }
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default Login