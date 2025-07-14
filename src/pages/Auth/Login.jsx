import { useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { generateCaptcha } from "../../utils/generateCaptcha";
import { useGetusersQuery } from "../../redux/slices/apiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateLoginForm } from "../../utils/validation";
import ErrorMessage from "../../custom-components/ErrorMessage";
import { setUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

function Login() {
  const { data: usersData } = useGetusersQuery();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    captcha: "",
    userCaptcha: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      captcha: generateCaptcha(),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (formData.userCaptcha !== formData.captcha) {
      toast.error("CAPTCHA doesn't match!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(formData.usernameOrEmail);

    const user = usersData?.find((u) =>
      isEmail
        ? u.email === formData.usernameOrEmail
        : u.username === formData.usernameOrEmail
    );

    if (!user) {
      toast.error("User not registered yet!");
      return;
    }

    if (user.password !== formData.password) {
      toast.error("Invalid password!");
      return;
    }
    dispatch(setUser(user));
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    toast.success("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={12} md={8} lg={6}>
            <Card className="shadow p-5">
              <Card.Body>
                <h4 className="text-start mb-3 fs-4 fs-md-3 fs-lg-2 fw-bold">
                  Login to Kanban
                </h4>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formUsernameOrEmail">
                    <Form.Label className="fs-6 text-secondary">
                      Username/Email
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="usernameOrEmail"
                      placeholder="Enter username or email"
                      value={formData.usernameOrEmail}
                      onChange={handleChange}
                    />
                    <ErrorMessage message={errors.usernameOrEmail} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label className="fs-6 text-secondary">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <ErrorMessage message={errors.password} />
                  </Form.Group>

                  <div className="text-center">
                    <h5>CAPTCHA: {formData.captcha}</h5>
                  </div>

                  <Form.Group className="mb-3" controlId="formCaptchaInput">
                    <Form.Label className="fs-6 text-secondary">
                      Enter CAPTCHA
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="userCaptcha"
                      placeholder="Enter CAPTCHA"
                      value={formData.userCaptcha}
                      onChange={handleChange}
                    />
                    <ErrorMessage message={errors.userCaptcha} />
                  </Form.Group>

                  <Button variant="success" type="submit" className="w-100">
                    Log In
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <small>
                    Don’t have an account? <a href="/register">Register</a>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
