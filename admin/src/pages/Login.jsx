import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(credentials),
            });

            const result = await res.json();

            if (!res.ok) return alert(result.message);

            if (result.role !== "admin") {
                return alert("You are not authorized to access the admin panel.");
            }

            dispatch({ type: "LOGIN_SUCCESS", payload: { ...result.data, role: result.role } });
            navigate("/");
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.message });
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col lg="6" className="m-auto">
                    <h2 className="text-center mb-4">Admin Login</h2>
                    <Form onSubmit={handleClick}>
                        <FormGroup>
                            <Input
                                type="email"
                                placeholder="Email"
                                required
                                id="email"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="password"
                                placeholder="Password"
                                required
                                id="password"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <Button color="primary" block type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
