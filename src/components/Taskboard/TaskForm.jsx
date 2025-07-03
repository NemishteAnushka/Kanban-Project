import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import {
  useAddTaskMutation,
  useEditTaskMutation,
  useGetTaskIdQuery,
} from "../../redux/slices/apiSlice";
import { validateTaskForm } from "../../utils/validation";
import ErrorMessage from "../../custom-components/ErrorMessage";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
function TaskForm({ show, handleClose, taskId }) {
  const edit = taskId ? true : false;
  const { data: taskById } = useGetTaskIdQuery(taskId);
  const [addTaskData] = useAddTaskMutation();
  const [editTaskData] = useEditTaskMutation();
  const [addtask, setAddTask] = useState({
    name: "",
    priority: "",
    deadline: "",
    status:"Backlog",
  });
  console.log(addtask)
  const [errors, setErrors] = useState({});
  //get user Id
  const user = useSelector((state)=>state.auth.user);
  const user_id = user?.id

  console.log(user?.id)
  useEffect(() => {
    if (edit && taskById) {
      const payload = {
        name: taskById?.name,
        priority: taskById?.priority,
        deadline: taskById?.deadline,
        status:taskById?.status
      };
      setAddTask(payload);
    }
  }, [taskById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateTaskForm(addtask);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const payoad = {
      id: edit ? taskById?.id : uuid(),
      user_id : user_id,
      ...addtask,
    };

    if (edit) {
      try {
        let payloadData = await editTaskData(payoad);
        if (payloadData) {
          toast.success("Task Updated Successfully!!!");
          handleClose();
        }
      } catch (error) {
        if (error) {
          toast.error("Error While Updating Task !!!");
        }
      }
    } else {
      try {
        let payloadData = await addTaskData(payoad);
        if (payloadData) {
          toast.success("Task Added Successfully!!!");
          handleClose();
        }
      } catch (error) {
        if(error){
          toast.error("Error While Adding Task !!!")
        }
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{edit ? "Edit Task" : "Create New Task"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label className="fs-6 text-secondary">
                  Task Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Task Name"
                  value={addtask.name}
                  onChange={handleChange}
                />
                <ErrorMessage message={errors.name} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="priority">
                <Form.Label className="fs-6 text-secondary">
                  Priority
                </Form.Label>
                <Form.Select
                  name="priority"
                  value={addtask.priority}
                  onChange={handleChange}
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Form.Select>
                <ErrorMessage message={errors.priority} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="priority">
                <Form.Label className="fs-6 text-secondary">
                  Status
                </Form.Label>
                <Form.Select
                  name="status"
                  value={addtask.status}
                  onChange={handleChange}
                >
                  {/* <option value="">Select Priority</option> */}
                  <option value="Backlog">Backlog</option>
                  <option value="To Do">To do</option>
                  <option value="In Progress">In progress</option>
                  <option value="Done">Done</option>
                </Form.Select>
                <ErrorMessage message={errors.priority} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formDueDate">
                <Form.Label className="fs-6 text-secondary">
                  Due Date
                </Form.Label>
                <Form.Control
                  type="date"
                  name="deadline"
                  value={addtask.deadline}
                  onChange={handleChange}
                />
                <ErrorMessage message={errors.deadline} />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary">
            {edit ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TaskForm;
