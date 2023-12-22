import styled from "styled-components";
import { Instagram, Facebook, Twitter, Discord } from "react-bootstrap-icons";
import { Flex, Text, Heading, Divider, Stack, Input, Button, Img } from "@chakra-ui/react";
import footer_icon from "../images/footer_icon.png";

const Container = styled.div`;
width: 100%;
display: flex;
justify-content: space-between;
margin: 0 2.5rem;

@media only screen and (max-width: 536px) {
    flex-wrap: wrap;
    justify-content: center;
}
`;

const SubContainer = styled.div`
color: #DFDFDF;
margin: 1rem 0;


`;

const Card = styled.div`
width: 25%;

@media only screen and (max-width: 632px) {
    width: 80%;
}
`;

function Footer() {
    return (
        <Flex
            as="footer"
            aria-label="footer"
            height="40vh"
            width="100%"
            backgroundColor="#222222"
            justifyContent="space-between"
        >
            <Flex
                width={["100%", "100%", "100%", "80%"]}
                flexWrap={["wrap", "wrap", "nowrap", "nowrap"]}
                alignItems="center"
            >
                <Img
                    height={["80vh", "80vh", "40vh", "40vh"]}
                    width="auto"
                    src={footer_icon}
                    display={["none", "none", "none", "flex"]}
                />
                <Container>
                    <Card>
                        <SubContainer>
                            <Text>PT. Mining Dreams</Text>
                            <Text>Jl. Indonesia</Text>
                        </SubContainer>
                        <SubContainer>
                            <Heading
                                as="h1"
                                size="md"
                            >
                                Social Media
                            </Heading>
                            <Flex
                                margin="10px 0"
                                alignItems="center"
                            >
                                <Instagram
                                    size="0.9rem"
                                    cursor="pointer"
                                    style={{ margin: "0 5px" }}
                                />
                                <Facebook 
                                    size="0.9rem"
                                    cursor="pointer"
                                    style={{ margin: "0 5px" }}
                                />
                                <Twitter
                                    size="0.9rem"
                                    cursor="pointer"
                                    style={{ margin: "0 5px" }}
                                />
                                <Discord
                                    size="0.9rem"
                                    cursor="pointer"
                                    style={{ margin: "0 5px" }}
                                />
                            </Flex>
                        </SubContainer>
                    </Card>
                    <Card>
                        <SubContainer>
                            <Heading
                                as="h1"
                                size="md"
                            >
                                Services
                            </Heading>
                            <Text>Course</Text>
                            <Text>Consultation</Text>
                            <Text>Job Vacancy</Text>
                        </SubContainer>
                    </Card>
                    <Card>
                        <SubContainer>
                            <Heading
                                as="h1"
                                size="md"
                            >
                                Support
                            </Heading>
                            <Text>Customer Service</Text>
                            <Text>FAQ</Text>
                        </SubContainer>
                    </Card>
                </Container>
            </Flex>
            <Flex
                width="20%"
                alignItems="center"
                display={["none", "none", "none", "flex"]}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    h="50%"
                    p={4}
                >
                    <Divider
                        margin="0 1rem"
                        orientation="vertical"
                    />
                    <SubContainer>
                        <Heading
                            as="h1"
                            size="md"
                        >
                            News Subscription
                        </Heading>
                        <Input
                            type="text"
                            size="sm"
                            margin="1rem 0"
                            backgroundColor="#DFDFDF"
                            borderRadius="20px"
                            color="black"
                        />
                        <Button
                            colorScheme="orange"
                            borderRadius="20px"
                            color="#DFDFDF"
                        >
                            Subscribe
                        </Button>
                    </SubContainer>
                </Stack>
            </Flex>
        </Flex>
    );
}

export default Footer;