import imgLogo from "../../Assets/Images/logo.png";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { PAGE} from "Configs/route";
import {
  Button,
  ButtonGroup,
  Image,
  Stack,
  Box,
  Flex,
  Heading,
  Text,
  Show,
  Hide,
  InputGroup,
  Input,
  InputRightElement,
  InputLeftElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spacer,
  useColorMode,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
// import { LoginValidtion } from "Validations/LoginValidtion";
import React from "react";
import { FaEye, FaEyeSlash, FaUserAlt, FaLock } from "react-icons/fa";
import { useAuthContext } from "Context/AuthContext";
import { ApiLogin } from "apis/ApiLogin";
export function LoginPage() {
  const [show, setShow] = React.useState(false);
  const [input, setInput] = React.useState("");
  const userNameRef = React.useRef();
  const passwordRef = React.useRef();
  const toast = useToast();
  const { setAuth } = useAuthContext();

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = input === "";
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const isLogin=localStorage.getItem("IS_LOGNIN")
  const toastExp = useToast();
  
  isLogin&&toastExp({
    containerStyle: {
      display: "flex",
      flexDirection: "row-reverse",
    },
    description: " زمان شما به پایان رسیده است دوباره وارد شوید",
    status: "warning",
    duration: 3000,
  });
  localStorage.removeItem("IS_LOGNIN")
  const handelLogin = async (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      username: userNameRef.current.value,
      password: passwordRef.current.value,
    });

    const res = await ApiLogin(data);
    
    if (res === true) {
      toast({
        containerStyle: {
          display: "flex",
          flexDirection: "row-reverse",
        },
        description: "ورود با موفقیت",
        status: "success",
        duration: 2000,
      });
      setTimeout(() => {
        navigate(PAGE.Admin_Order);
      }, 2000);
    } else {
      toast({
        description: "نام کاربری یا رمز عبور اشتباه است",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      dir="ltr"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      backdropFilter="auto"
      backdropBlur="8px"
      bg="#E5ECF4"
    >
      <Box
        display="flex"
        width="60%"
        height="80%"
        bg="#bec6e3c9"
        boxShadow="dark-lg"
        p="6"
        rounded="2xl"
      >
        {/* logo image     */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="40%"
        >
          <Image src={imgLogo} alt="Logo" />
        </Box>
        {/* login */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center "
          width="60%"
          height="100%"
        >
          <Flex
            height="70%"
            justifyContent="center"
            alignItems="center"
            boxShadow="inner"
            p="6"
            rounded="md"
          >
            <FormControl
              px={5}
              gap="3"
              display="flex"
              flexDirection="column"
              alignItems="center"
              color="#2c2c2c"
            >
              <Heading color="#2c2c2c">ورود کاربر</Heading>
              {/* Use Name */}
              <Box>
                <FormControl isInvalid={isError}>
                  <InputGroup width="300px">
                    <Input
                      _placeholder={{ color: "#a0c9dd" }}
                      textAlign="right"
                      variant="flushed"
                      placeholder="نام کاربری"
                      size="lg"
                      onChange={handleInputChange}
                      ref={userNameRef}
                    />
                    <InputRightElement
                      pointerEvents="none"
                      children={<FaUserAlt color="#4e7e95" />}
                    />
                  </InputGroup>
                  {!isError ? (
                    <FormHelperText></FormHelperText>
                  ) : (
                    <FormErrorMessage dir="rtl" color="#944e4e">
                      نام کاربری را وارد کنید
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Box>
              <Spacer />
              {/* password */}
              <Box>
                <FormControl isInvalid={isError}>
                  <InputGroup width="300px">
                    <InputRightElement
                      pointerEvents="none"
                      children={<FaLock color="#4e7e95" />}
                    />
                    <Input
                      _placeholder={{ color: "#a0c9dd" }}
                      textAlign="right"
                      type={show ? "text" : "password"}
                      variant="flushed"
                      placeholder="رمز عبور"
                      size="lg"
                      ref={passwordRef}
                    />
                    <InputLeftElement>
                      <Box onClick={handleClick}>
                        {show ? (
                          <FaEye color="#4e7e95" />
                        ) : (
                          <FaEyeSlash color="#4e7e95 " />
                        )}
                      </Box>
                    </InputLeftElement>
                  </InputGroup>

                  {!isError ? (
                    <FormHelperText></FormHelperText>
                  ) : (
                    <FormErrorMessage dir="rtl" color="#944e4e">
                      رمز عبور را وارد کنید
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Box>

              <Button
                py="4"
                fontSize="22px"
                textAlign="center"
                width="70%"
                bg="#4e7e95"
                color="#E5ecf4"
                variant="solid"
                colorScheme="whiteAlpha"
                type="submit"
                _hover={{
                  color: "#585858",
                  bg: "#e5ecf4",
                }}
                onClick={(e) => {
                  // navigate("/admin/product");
                  handelLogin(e);
                }}
              >
                ورود
              </Button>
            </FormControl>
          </Flex>
          {/* <form onSubmit={userLoginValidation.handleSubmit}>
          <label htmlFor="name">User Name</label>
          <input
            type="name"
            id="userName"
            name="userName"values
            onChange={userLoginValidation.handleChange}
            // value={userLoginValidation.values.userName}
          />
          <label htmlFor="password">User Name</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={userLoginValidation.handleChange}
            // value={userLoginValidation.values.userName}
          />
        <button type="submit">Submit</button>
        </form> */}
        </Box>
      </Box>
    </Box>
  );
}
