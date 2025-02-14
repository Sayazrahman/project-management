import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectModal from "../modal/add-project";
import "./dashboard.css";
import noData from "../../assets/noData.png";

interface Project {
  id: number;
  name: string;
  description: string;
  status: "pending" | "in progress" | "completed";
  dueDate: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    setProjects(savedProjects);
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleSaveProject = (project: Project) => {
    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? project : p))
      );
      toast.success("Project updated successfully!");
    } else {
      setProjects((prev) => [...prev, { ...project, id: Date.now() }]);
      toast.success("Project added successfully!");
    }
    setShowModal(false);
    setEditingProject(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.error("Project deleted successfully!");
    }
  };
  const filteredProjects = projects.filter((project) => {
    const statusMatch =
      statusFilter === "all" || project.status === statusFilter;
    const dateMatch = dateFilter === "" || project.dueDate <= dateFilter;
    return statusMatch && dateMatch;
  });
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-5 pt-4">
      <ToastContainer />
      <div className="title d-flex justify-content-between">
        <div>Dashboard</div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Project
        </button>
      </div>
      <div className="row mt-3 justify-content-end mb-3">
        <div className="col-md-3">
          <label className="form-label font-bold mb-1">Sort by status</label>
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label mb-1">Filter by Date</label>
          <input
            type="date"
            className="form-control"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="no-data text-center">
          <p>No Available Projects</p>
          <img src={noData} alt="No Data" className="no-data-img" />
        </div>
      ) : (
        <>
          <table className="table-custom table table-bordered mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.status}</td>
                  <td>{project.dueDate}</td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <FaEdit
                        onClick={() => {
                          setEditingProject(project);
                          setShowModal(true);
                        }}
                      />
                      <FaTrash
                        color="red"
                        onClick={() => handleDelete(project.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-secondary me-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="align-self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-secondary ms-2"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {showModal && (
        <ProjectModal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingProject(null);
          }}
          onSave={handleSaveProject}
          project={editingProject}
        />
      )}
    </div>
  );
}
