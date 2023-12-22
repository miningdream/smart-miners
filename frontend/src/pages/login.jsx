import styled from "styled-components";
import config from "../config.json";
import Navbar from "../partials/navbar";

import { getUser } from "../api";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
    FormControl, Input, Text,
    Img, Button, Heading, Wrap,
    WrapItem, Link, FormHelperText
} from "@chakra-ui/react";

import banner_dark from "../images/banner_dark.jpg";
import google_icon from "../images/google_icon.png";

const Container = styled.div`
display: flex;
justify-content: right;
align-items: center;
width: 100%;
height: 91vh;
`;

const SubContainer = styled.div`
display: flex;
background-color: white;
justify-content: center;
align-items: center;
flex-wrap: wrap;
height: 100%;
width: 50%;

@media only screen and (max-width: 670px) {
    width: 100%;
}
`;

const FormContainer = styled.div`
margin: 10px 0;
width: 50%;

@media only screen and (max-width: 900px) {
    width: 80%;
}
`;

const Form = styled.form`
margin: 15px 0;
`;

function Login() {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    const initialize = async() => {
        let user = null;
        try {
            user = await getUser();
        } catch (error) {
            console.log(error);
        }
        if(user && user.data) window.location.href = "/profile";
    }
    
    const handleSubmit = () => {
        window.location.href = `${config.domain}/login`;
    }

    useEffect(() => {
        initialize();
    }, []);
    
    return (
        <>
            <Helmet>
                <meta name="description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="og:title" content="Log In │ Smart Miners" />
                <meta property="og:url" content="/login" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={banner_dark} />
                <meta property="og:image:width" content="1920" />
                <meta property="og:image:height" content="1080" />
                <meta property="og:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="twitter:title" content="Log In │ Smart Miners" />
                <meta property="twitter:image" content={banner_dark} />
                <meta property="twitter:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <title>Log In │ Smart Miners</title>
            </Helmet>
            <Navbar />
            <Container>
                <SubContainer>
                    <FormContainer>
                        <Heading
                            as="h2"
                            color="#FF906D"
                            textAlign="center"
                            fontWeight="bold"
                        >
                            Log In
                        </Heading>
                        <Form>
                            <FormControl m="30px 0">
                                <Input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    variant="flushed"
                                    placeholder="Username"
                                    borderColor="#494949"
                                />
                            </FormControl>
                            <FormControl m="30px 0">
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    variant="flushed"
                                    placeholder="Password"
                                    borderColor="#494949"
                                />
                                <FormHelperText
                                    color="#E54B19"
                                    cursor="pointer"
                                    m="0"
                                >
                                    Forget Password?
                                </FormHelperText>
                            </FormControl>
                        </Form>
                        <Text
                            color="#8A8A8A"
                            align="center"
                            size="30px"
                        >
                            or
                        </Text>
                        <Wrap
                            margin="30px 0"
                        >
                            <WrapItem
                                w="100%"
                            >
                                <Button
                                    w="100%"
                                    colorScheme="none"
                                    borderRadius="0"
                                    border="solid 0.2px #4E4E4E"
                                    color="black"
                                >
                                    <Img
                                        height="20px"
                                        width="auto"
                                        src={google_icon}
                                        margin="0 5px"
                                    />
                                    <Text
                                        margin="0 5px"
                                    >
                                        Log In with Google
                                    </Text>
                                </Button>
                            </WrapItem>
                            <WrapItem
                                w="100%"
                            >
                                <Button
                                    w="100%"
                                    type="submit"
                                    bgColor="#FF9345"
                                    colorScheme="orange"
                                    borderRadius="0"
                                    onClick={handleSubmit}
                                >
                                    <Text>Log In</Text>
                                </Button>
                            </WrapItem>
                            <WrapItem
                                w="100%"
                            >
                                <Text
                                    w="100%"
                                    size="16px"
                                    textAlign="center"
                                >
                                    Don't have account yet? <Link href="/register" color="#FF9345">Sign In</Link>
                                </Text>
                            </WrapItem>
                        </Wrap>
                    </FormContainer>
                </SubContainer>
            </Container>
        </>
    )
}

export default Login;