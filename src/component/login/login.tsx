import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import careSoft from "../../assets/pm.png";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const validCredentials = {
    email: "rahmansyedayaz@gmail.com",
    password: "Ayaz",
  };

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedUserName = userName.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUserName || !trimmedPassword) {
      toast.error("Username and password are required.", {
        position: "top-right",
      });
      return;
    }

    if (trimmedUserName !== validCredentials.email) {
      toast.error("Invalid username.", { position: "top-right" });
      return;
    }

    if (trimmedPassword !== validCredentials.password) {
      toast.error("Invalid password.", { position: "top-right" });
      return;
    }

    toast.success("Logged in successfully! 🎉", { position: "top-right" });
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "userName") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ToastContainer autoClose={3000} hideProgressBar />{" "}
        <div
          className="d-flex shadow p-4"
          style={{
            width: "1000px",
            borderRadius: "10px",
            backgroundColor: "#fff",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center p-3"
            style={{ flex: 1 }}
          >
            <img
              src={careSoft}
              alt="CareSoft Logo"
              className="img-fluid"
              style={{ maxWidth: "80%" }}
            />
          </div>

          <div className="p-4" style={{ flex: 1 }}>
            <h3 className="text-primary text-center">Login</h3>
            <p className="text-muted text-center">
              Streamlining Project Management
            </p>

            <form onSubmit={onLogin}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  value={userName}
                  name="userName"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    value={password}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your password"
                    onChange={handleOnChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <RemoveRedEyeIcon />
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>

            <div className="text-center mt-3">
              <Link to="/" className="text-primary">
                Forgot Password?
              </Link>
            </div>
            <div className="text-center mt-3">
              <span>Don't have an account? </span>
              <Link to="/" className="text-primary">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
