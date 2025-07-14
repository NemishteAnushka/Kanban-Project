import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useAddUsersMutation } from "../../redux/slices/apiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateRegisterForm } from "../../utils/validation";
import ErrorMessage from "../../custom-components/ErrorMessage";

function Register() {
  const [addUser] = useAddUsersMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    contact: "",
    password: "",
    profilePic: null,
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePath = `uploads/${file.name}`;
      setFormData((prev) => ({
        ...prev,
        profilePic: filePath,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      let payload = await addUser(formData).unwrap();
      if (payload) {
        toast.success("User Register Successfully !!!");
        navigate("/");
      }
    } catch (error) {
      if (error) {
        toast.error("Unable To Register");
      }
    }
  };

  const handleLogInClick = () => {
    navigate("/");
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={12} md={8} lg={8}>
            <Card className="shadow p-2">
              <Card.Body>
                <h4 className="text-start mb-3 fs-4 fw-bold">
                  Register to Kanban
                </h4>
                <Form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "2px solid #ccc",
                        margin: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <FaUser size={40} color="#6c757d" />
                      )}
                    </div>
                  </div>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label className="fs-6 text-secondary">
                          Name *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <ErrorMessage message={errors.name} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="username">
                        <Form.Label className="fs-6 text-secondary">
                          Username *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder="Enter username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                        <ErrorMessage message={errors.username} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label className="fs-6 text-secondary">
                          Email *
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <ErrorMessage message={errors.email} />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-3" controlId="contact">
                        <Form.Label className="fs-6 text-secondary">
                          Contact Number (Optional)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="contact"
                          placeholder="Enter contact number"
                          value={formData.contact}
                          onChange={handleChange}
                        />
                        <ErrorMessage message={errors.contact} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label className="fs-6 text-secondary">
                          Password *
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

                      <Form.Group className="mb-3" controlId="profilePic">
                        <Form.Label className="fs-6 text-secondary">
                          Profile Picture (Optional)
                        </Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="success" type="submit" className="w-100">
                    Sign Up
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <small>
                    Already have an account? <span
                      onClick={handleLogInClick}
                      style={{
                        color: "#0d6efd",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Log In
                    </span>
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

export default Register;
