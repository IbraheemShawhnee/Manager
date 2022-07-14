import { useState } from "react";
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
            setMessage("");
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