import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from "axios";
// components
import basestyle from './signup.module.css'
import Iconify from '../../../components/iconify';




// ----------------------------------------------------------------------

export default function SignupForm  ({ setUserState })  {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    username: "",
      email: "",
      password: "",
      MobileNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const mobex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    if (!values.username) {
      error.username = "User Name is required";
    }
   
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    
    if (!values.password) {
        error.password = "Password is required";
      } else if (values.password.length < 4) {
        error.password = "Password must be more than 4 characters";
      } else if (values.password.length > 10) {
        error.password = "Password cannot exceed more than 10 characters";
      }

      
      if (!values.MobileNumber) {
        error.MobileNumber = "Mobile Number is required";
      } else if (!mobex.test(values.MobileNumber)) {
        error.MobileNumber = "This is not a valid Mobile Number format!";
      }
    return error;
  };

  const signupHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {

    // }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      axios.post("http://localhost:8081/api/admin/signup/", user).then((res) => {
        alert(res.data.message);
        navigate("/login", { replace: true });
      });
    }
  }, [formErrors, isSubmit, navigate, setUserState, user]);
  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
      <TextField
            type="text"
              name="username"
              label="User Name"
              id="username"
              placeholder="User Name"
              onChange={changeHandler}
              value={user.username}
           />
            <p className={basestyle.error}>{formErrors.username}</p>
        <TextField type="email"
          name="email"
          label="Email"
          id="email"
          placeholder="Email"
          onChange={changeHandler}
          value={user.email} />
      <p className={basestyle.error}>{formErrors.email}</p>
        <TextField
          name="password"
          label="Password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <p className={basestyle.error}>{formErrors.password}</p>
        <TextField
              type="tele"
              name="MobileNumber"
              label="Mobile Number"
              id="MobileNumber"
              placeholder="Mobile Number"
              onChange={changeHandler}
              value={user.MobileNumber}
            />
            <p className={basestyle.error}>{formErrors.MobileNumber}</p>
            
          
          
      </Stack>
      <NavLink to="/login">Already registered? Login</NavLink>
      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}> */}
        {/* <Checkbox name="remember" label="Remember me" /> */}
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      {/* </Stack> */}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" className={basestyle.button_common} onClick={signupHandler}>
        Signup
      </LoadingButton>
    </>
  );
}
