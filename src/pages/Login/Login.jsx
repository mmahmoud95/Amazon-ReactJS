import amzonlogo from "../../assets/download.png";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { NavLink } from "react-router-dom";
// import { login } from "../../services/auth";
// import { instance } from "../../services/axios/instance";
import { login } from "../../services/auth";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const navigate = useNavigate();
  const handelChange = (eve) => {
    var regex = /^[a-zA-Z0-9]{2,}(@)(gmail)(.com)$/;

    if (eve.target.name == "email") {
      setUser({ ...user, email: eve.target.value });
      setErrors({
        ...errors,
        emailError:
          eve.target.value.length == 0
            ? "Email is Required"
            : regex.test(eve.target.value)
            ? ""
            : "Invalid Email (must contain @ and .come)",
      });
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (errors.emailError || errors.passwordError) {
      toast.error("Validation error, try again", { position: "top-center" });
    } else {
      try {
        const res = await login(user, {email:user.email})

        if (res.data.message==="valid Email") {
          // Email exists, navigate to 'loginStep2'
          navigate("./loginStep2", { state: { Email: user.email } });
          console.log(res);
        }else{
            toast.error("Email not found. Please sign up", { position: "top-center" });

        }

      } catch (err) {
        // toast.error("Error during email check or server crashed", {
        //   position: "top-center",
        // });
      }
    }
  };

  return (
    <>
      <div className="vh-100 ">
        <div className="mask d-flex align-items-center gradient-custom-3">
          <div className="container ">
            <div className="row d-flex justify-content-center ">
              <a href="/">
                <div className="text-center">
                  <img src={amzonlogo} className="rounded" />
                </div>
              </a>
            </div>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4 ">
                <div className="card" style={{ borderRadius: " 15px" }}>
                  <div className="card-body">
                    <h2>Sign in</h2>

                    <form
                      autoComplete="off"
                      onSubmit={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="form3Example3cg">
                          Mobile number or email
                        </label>
                        <input
                          type="email"
                          className={`form-control ${
                            errors.emailError ? "border-danger shadow-none" : ""
                          }`}
                          id="formGroupExampleInput2"
                          name="email"
                          required
                          placeholder="Please Enter Email"
                          value={user.email}
                          onChange={(e) => {
                            handelChange(e);
                          }}
                        />
                        <p className="text-danger" style={{ color: "red" }}>
                          {errors.emailError}
                        </p>
                      </div>
                      <div className="form-outline mb-5">
                        <input
                          type="submit"
                          id="form3Example4cdg"
                          className="form-control submit "
                          value="Continue"
                        />
                      </div>
                      <div className="form-check d-flex justify-content-center mb-3 ptn">
                        <p>
                          By creating an account, you agree to
                          <a href="">Conditions of Use</a>
                          and
                          <a href="">Privacy Notice</a>.
                        </p>
                      </div>
                      <a id="lab">
                        <i className="fa-solid fa-arrow-right"></i>
                        Need help?
                      </a>
                      <a id="para" style={{ display: "none" }}>
                        Forgot your password?
                      </a>
                      <a id="par2" style={{ display: "none" }}>
                        Other issues with Sign-In
                      </a>
                    </form>
                    <Toaster />
                  </div>
                </div>
                <h6 id="tex" className="mt-5">
                  <span>New to Amazon?</span>
                </h6>
                <NavLink to="/signup">
                  <button className="sub p-2 col-12 " type="submit">
                    Create your Amazon account
                  </button>
                </NavLink>
                <div className="row">
                  <div className="foot mt-5 d-flex pt-3 col-12">
                    <a href="../help-page/help.html"> Conditions of Use </a>
                    <a href="../help-page/help.html"> Privacy Notice </a>
                    <a href="../help-page/help.html"> Help </a>
                  </div>
                </div>
                <p
                  style={{
                    fontWeight: " lighter",
                    fontSize: "12px",
                  }}
                  className="text-center mt-4"
                >
                  ©1996–2023, Amazon.com, Inc. or its affiliates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
