import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Project {
  id: number;
  name: string;
  description: string;
  status: "pending" | "in progress" | "completed";
  dueDate: string;
}

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  project: Project | null;
}

const ProjectModal: React.FC<ModalProps> = ({
  show,
  onClose,
  onSave,
  project,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending" | "in progress" | "completed">(
    "pending"
  );
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setStatus(project.status);
      setDueDate(project.dueDate);
    } else {
      setName("");
      setDescription("");
      setStatus("pending");
      setDueDate("");
    }
  }, [project]);

  const handleSubmit = () => {
    if (!name || !description || !dueDate) {
      toast.error("All fields are required!");
      return;
    }

    onSave({
      id: project ? project.id : Date.now(),
      name,
      description,
      status,
      dueDate,
    });

    toast.success(
      project ? "Project updated successfully!" : "Project added successfully!"
    );
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <ToastContainer />
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ background: "#252627", color: "white" }}
          >
            <h5 className="modal-title">
              {project ? "Edit Project" : "Add Project"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as "pending" | "in progress" | "completed"
                  )
                }
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
