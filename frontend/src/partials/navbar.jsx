import { useState } from "react";
import { Flex, Button, Img, ButtonGroup, IconButton } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import nav_icon from "../images/nav_icon.png";

function Navbar() {
    let [display, changeDisplay] = useState("none");

    const handleTarget = (target) => window.location.href = `/${target}`;
    return (
        <Flex
            as="nav"
            aria-label="navbar"
            boxShadow="2xl"
        >
            {/* Desktop Navbar */}
            <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                padding="5px"
                backgroundColor="white"
                display={["none", "none", "flex", "flex"]}
            >
                <Flex
                    alignItems="center"
                    margin="0 10px"
                >
                    <Img
                        height="30px"
                        width="auto"
                        cursor="pointer"
                        src={nav_icon}
                        alt='smart_miners_banner_light'
                        onClick={() => handleTarget("")}
                    />
                    <ButtonGroup
                        margin="0 30px"
                    >
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Product"
                            my={5}
                            w="100%"
                            cursor="pointer"
                            onClick={() => handleTarget("product")}
                        >
                            Product
                        </Button>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Pricing"
                            my={5}
                            w="100%"
                            cursor="pointer"
                            onClick={() => handleTarget("pricing")}
                        >
                            Pricing
                        </Button>
                    </ButtonGroup>
                </Flex>
                <Flex
                    alignItems="center"
                    margin="0 10px"
                >
                    <ButtonGroup>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Login"
                            my={5}
                            w="100%"
                            cursor="pointer"
                            onClick={() => handleTarget("login")}
                        >
                            Log In
                        </Button>
                        <Button
                            as="a"
                            aria-label="Sign Up"
                            my={5}
                            w="100%"
                            cursor="pointer"
                            colorScheme="orange"
                            onClick={() => handleTarget("register")}
                        >
                            Sign Up
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Flex>
            
            {/* Mobile Navbar */}
            <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                padding="21px"
                backgroundColor="white"
                display={["flex", "flex", "none", "none"]}
                boxShadow="2xl"
            >
                <Img
                    height="30px"
                    width="auto"
                    cursor="pointer"
                    src={nav_icon}
                    alt='smart_miners_banner_light'
                    onClick={() => handleTarget("")}
                />
                <Flex
                    alignItems="center"
                >
                    <ButtonGroup
                        margin="0 10px"
                    >
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Login"
                            my={5}
                            w="100%"
                            cursor="pointer"
                            fontSize="13px"
                            onClick={() => handleTarget("login")}
                        >
                            Log In
                        </Button>
                        <Button
                            as="a"
                            aria-label="Sign Up"
                            my={5}
                            w="100%"
                            cursor="pointer"
                            colorScheme="orange"
                            fontSize="13px"
                            onClick={() => handleTarget("register")}
                        >
                            Sign Up
                        </Button>
                    </ButtonGroup>
                    <IconButton
                        aria-label="Open Menu"
                        size="lg"
                        mr={2}
                        icon={
                            <HamburgerIcon />
                        }
                        onClick={() => changeDisplay('flex')}
                        display={['flex', 'flex', 'none', 'none']}
                    />
                </Flex>
            </Flex>

            <Flex
                w='100vw'
                display={display}
                bgColor="gray.50"
                zIndex={20}
                h="100vh"
                pos="fixed"
                top="0"
                left="0"
                overflowY="auto"
                flexDir="column"
            >
                <Flex justify="flex-end">
                    <IconButton
                        mt={2}
                        mr={2}
                        aria-label="Open Menu"
                        size="lg"
                        icon={
                            <CloseIcon />
                        }
                        onClick={() => changeDisplay('none')}
                    />
                </Flex>

                <Flex
                    flexDir="column"
                    align="center"
                >
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Product"
                        my={5}
                        w="100%"
                        cursor="pointer"
                        onClick={() => handleTarget("product")}
                    >
                        Product
                    </Button>
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Pricing"
                        my={5}
                        w="100%"
                        cursor="pointer"
                        onClick={() => handleTarget("pricing")}
                    >
                        Pricing
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Navbar;