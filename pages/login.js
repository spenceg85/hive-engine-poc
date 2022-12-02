import React from "react";
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
  Progress
} from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import loginBackdrop from "../public/img/login-backdrop.jpg"; // Import using relative path

export const Login = (props) => {
    const [loading, setLoading] = React.useState(false);
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      props.submit();
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <Container
        display="flex"
        alignItems="center"
        justify="center"
        css={{ minHeight: "100vh", backgroundImage: loginBackdrop }}
      >
        <img src={"img/login-backdrop.jpg"} alt="loginoverlay" style={{position: "fixed", height: "100%", width: "100%"}} />
        <Card css={{ mw: "420px", p: "20px" }} variant="bordered">
          <Text
            size={24}
            weight="bold"
            css={{
              as: "center",
              mb: "20px",
            }}
          >
            HiveEngine Login
          </Text>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            contentLeft={<Mail fill="currentColor" />}
          />
          <Spacer y={1} />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            contentLeft={<Password fill="currentColor" />}
            css={{ mb: "6px" }}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
          <Spacer y={1} />
          {!loading ? (<Button onClick={() => handleSubmit()}>Sign in</Button>) : (<Progress
          indeterminated
          value={50}
          color="warning"
          status="secondary"
        />)}
        </Card>
      </Container>
    </div>
  );
};
