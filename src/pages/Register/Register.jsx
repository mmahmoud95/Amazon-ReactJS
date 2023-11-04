import { useState } from "react";
import amzonlogo from "../../assets/download.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import {  useNavigate } from "react-router-dom";
import "./Register.css";
import { registerr } from "../../services/auth";
import toast, { Toaster } from "react-hot-toast";
const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        ConfirmPassword: "",
    });
    const [errors, setErrors] = useState({
        nameError: "",
        passwordError: "",
        emailError: "",
        ConfirmPasswordError: "",
    });

    const [visible, setvisible] = useState(false);
    const navigate=useNavigate()
    const handelChange = (eve) => {
        // console.log(eve.target);
        var regex = /^[a-zA-Z0-9]{2,}(@)(gmail)(.com)$/;
        var regex2 =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-+.]).{8,20}$/;
        if (eve.target.name == "name") {
            setUser({ ...user, name: eve.target.value });
            setErrors({
                ...errors,
                nameError:
                    eve.target.value.length == 0
                        ? "Name is Required"
                        : eve.target.value.length < 3
                        ? "Name must be at least 3 characters"
                        : "",
            });
        } else if (eve.target.name == "email") {
            setUser({ ...user, email: eve.target.value });
            setErrors({
                ...errors,
                emailError:
                    eve.target.value.length == 0
                        ? "Email is Required"
                        : regex.test(eve.target.value)
                        ? ""
                        : "Invalid Email",
            });
        } else if (eve.target.name == "password") {
            setUser({ ...user, password: eve.target.value });
            setErrors({
                ...errors,
                passwordError:
                    eve.target.value.length == 0
                        ? "password is Required"
                        : regex2.test(eve.target.value)
                        ? ""
                        : "Your password must have at least one lower case letter ,number,upperCase,symbol",
            }),
                // eslint-disable-next-line no-undef
                setPassword(eve.target.value);
        } else if (eve.target.name == "ConfirmPassword") {
            setUser({ ...user, ConfirmPassword: eve.target.value });
            setErrors({
                ...errors,
                ConfirmPasswordError:
                    eve.target.value.length == 0
                        ? "password is Required"
                        : eve.target.value !== user.password
                        ? "confirm password must matches"
                        : "",
            });
        }
    };
    const handleSubmit =async (evt) => {
        evt.preventDefault();
        if(errors.emailError||errors.passwordError||errors.nameError||errors.ConfirmPasswordError){
      toast.error("validation error ,try again",{position:"top-center"})
        }else{
            try{
             const res=await registerr(user)
             navigate('/login')
             console.log(res);   
            }catch(err){
           toast.error("Error registration,server crashed",{position:"top-center"})
            }
       
        }
    }
    return (
        <>
            <div className='vh-100 '>
                <div className='mask d-flex align-items-center gradient-custom-3'>
                    <div className='container '>
                        <div className='row d-flex justify-content-center '>
                            <a href='/'>
                                <div className='text-center'>
                                    <img src={amzonlogo} className='rounded' />
                                </div>
                            </a>
                        </div>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4 '>
                                <div
                                    className='card'
                                    style={{ borderRadius: "15px" }}
                                >
                                    <div className='card-body'>
                                        <h2>Create account</h2>
                                        <form
                                            form
                                            autoComplete='off'
                                            onSubmit={(e) => { handleSubmit(e) }}
                                        >
                                            <div className='form-outline mb-3'>
                                                <label
                                                    className='form-label'
                                                    htmlFor='form3Example1cg'
                                                >
                                                    Your name
                                                </label>
                                                <input
                                                    type='text'
                                                    id='form3Example1cg'
                                                    className={`form-control
              ${errors.nameError ? "border-danger shadow-none" : ""}`}
                                                    name='name'
                                                    placeholder='Please Enter Name'
                                                    value={user.name}
                                                    onChange={(e) => {
                                                        handelChange(e);
                                                    }}
                                                />
                                                <p className='text-danger'>
                                                    {errors.nameError}
                                                </p>
                                            </div>

                                            <div className='form-outline mb-3'>
                                                <label
                                                    className='form-label'
                                                    htmlFor='form3Example3cg'
                                                >
                                                    Mobile number or email
                                                </label>
                                                <input
                                                    type='text'
                                                    className={`form-control ${
                                                        errors.emailError
                                                            ? "border-danger shadow-none"
                                                            : ""
                                                    }`}
                                                    id='formGroupExampleInput2'
                                                    name='email'
                                                    required
                                                    placeholder='Please Enter Email'
                                                    value={user.email}
                                                    onChange={(e) => {
                                                        handelChange(e);
                                                    }}
                                                />
                                                <p className='text-danger'>
                                                    {errors.emailError}
                                                </p>
                                            </div>

                                            <div className='form-outline mb-3'>
                                                <label
                                                    className='form-label'
                                                    htmlFor='form3Example4cg'
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type={
                                                        visible
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    required
                                                    id='formGroupExampleInput'
                                                    className={`form-control
              ${errors.passwordError ? "border-danger shadow-none" : ""}`}
                                                    name='password'
                                                    placeholder='Please Enter password'
                                                    value={user.password}
                                                    onChange={(e) => {
                                                        handelChange(e);
                                                    }}
                                                />
                                                <div
                                                    onClick={() =>
                                                        setvisible(!visible)
                                                    }
                                                >
                                                    {visible ? (
                                                        <FaRegEye />
                                                    ) : (
                                                        <FaRegEyeSlash />
                                                    )}
                                                    <p className='text-danger'>
                                                        {errors.passwordError}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='form-outline mb-3'>
                                                <label
                                                    className='form-label'
                                                    htmlFor='form3Example4cg'
                                                >
                                                    Re-enter password
                                                </label>
                                                <input
                                                    type={
                                                        visible
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    required
                                                    id='formGroupExampleInput'
                                                    className={`form-control
              ${errors.ConfirmPasswordError ? "border-danger shadow-none" : ""}`}
                                                    name='ConfirmPassword'
                                                    placeholder='Please confirm password'
                                                    value={user.ConfirmPassword}
                                                    onChange={(e) => {
                                                        handelChange(e);
                                                    }}
                                                />
                                                <div
                                                    onClick={() =>
                                                        setvisible(!visible)
                                                    }
                                                >
                                                    {visible ? (
                                                        <FaRegEye />
                                                    ) : (
                                                        <FaRegEyeSlash />
                                                    )}
                                                    <p className='text-danger'>
                                                        {errors.ConfirmPasswordError}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='form-outline mb-5'>
                                           {/* <NavLink to='/'>  */}
                                            <input
                                                    type='submit'
                                                    id='form3Example4cdg'
                                                    className='form-control submit '
                                                    value='Continue'
                                                />
                                                {/* </NavLink>  */}
                                            </div>
                                            <div className='form-check d-flex justify-content-center mb-3 ptn'>
                                                <p>
                                                    By creating an account, you
                                                    agree to Amazons
                                                    <a href=''>
                                                        Conditions of Use
                                                    </a>
                                                    and
                                                    <a href=''>
                                                        Privacy Notice
                                                    </a>
                                                    .
                                                </p>
                                            </div>
                                            <p className=' text-muted mt-3 mb-0'>
                                                Already have an account?
                                                <a href='./Login'>
                                                    <u> sign in</u>
                                                </a>
                                            </p>
                                         
                                        </form>  
                                         <Toaster/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='foot mt-5 d-flex pt-3 col-12'>
                                        <a href='../help-page/help.html'>
                                            Conditions of Use
                                        </a>
                                        <a href='../help-page/help.html'>
                                            Privacy Notice
                                        </a>
                                        <a href='../help-page/help.html'>
                                            Help
                                        </a>
                                    </div>
                                </div>
                                <p
                                    style={{
                                        fontWeight: "lighter",
                                        fontSize: "12px",
                                    }}
                                    className='text-center mt-4'
                                >
                                    ©1996–2023, Amazon.com, Inc. or its
                                    affiliates
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
