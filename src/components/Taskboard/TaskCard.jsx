import { useState } from "react";
import { Card, Badge, Dropdown } from "react-bootstrap";
import {
  FaEllipsisV,
  FaArrowLeft,
  FaArrowRight,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import CustomDeleteModal from "../../custom-components/CustomDeleteModal";
import { useDeleteTaskMutation } from "../../redux/slices/apiSlice";
import { toast } from "react-toastify";

function TaskCard({
  task,
  column,
  onMove,
  setTaskId,
  handleOpen,
  setActiveCard,
}) {
  const getCardColor = (priority) => {
    switch (priority) {
      case "High":
        return "#ffe5e5";
      case "Medium":
        return "#fff4e5";
      case "Low":
        return "#e5f5ff";
      default:
        return "#f5faff";
    }
  };

  //delete modal
  const [deleteTask] = useDeleteTaskMutation();
  const [deleteModal, setDeleteModal] = useState(false);
  const handleClose = () => setDeleteModal(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(deleteId);
      setDeleteModal(false);
      toast.success("Task Deleted Successfully !!!");
    } catch (error) {
      if (error) {
        toast.error("Error While Deleting Task !!!");
      }
    }
  };

  const deleteTaskModal = (id) => {
    if (deleteModal) {
      return (
        <CustomDeleteModal
          show={deleteModal}
          close={handleClose}
          message="Are you sure you want to delete the task"
          buttonText="Delete"
          onConfirm={handleDeleteTask}
        />
      );
    }
  };
  return (
    <>
      {deleteTaskModal()}
      <Card
        className="mb-3 shadow-sm"
        style={{ backgroundColor: getCardColor(task.priority) }}
        draggable
        onDragStart={() => setActiveCard(task.id)}
        onDragEnd={() => setActiveCard(null)}
      >
        <Card.Body className="p-2">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="fw-bold">{task.name}</div>
              <div>
                <Badge bg="info" className="me-1">
                  {task.priority}
                </Badge>

                <Badge bg="secondary">
                  {new Date(task.deadline).toLocaleDateString("en-GB")}
                </Badge>
              </div>
            </div>

            <Dropdown align="end">
              <Dropdown.Toggle
                variant="light"
                size="sm"
                className="border-0"
                id={`dropdown-${task.id}`}
              >
                <FaEllipsisV />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  disabled={column === "Backlog"}
                  onClick={() => onMove(task.id, -1)}
                >
                  <FaArrowLeft className="me-2" />
                  Move Back
                </Dropdown.Item>
                <Dropdown.Item
                  disabled={column === "Done"}
                  onClick={() => onMove(task.id, 1)}
                >
                  <FaArrowRight className="me-2" />
                  Move Forward
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    handleOpen(), setTaskId(task.id);
                  }}
                >
                  <FaEdit className="me-2" />
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleDeleteOpen(task.id)}
                  className="text-danger"
                >
                  <FaTrash className="me-2" />
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default TaskCard;
