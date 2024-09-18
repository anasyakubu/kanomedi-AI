// import React from 'react'
import "./Login.scss";
import LoginContent from "../../sections/LoginContent/LoginContent";
import LoginImage from "../../assets/Login-bro.svg";

const Login = () => {
  return (
    <div className="Login">
      <div className="grid lg:grid-cols-2">
        {/* Banner */}
        <div className="Banner p-24 py-16">
          <div className="">
            <h2 className="text-4xl font-bold">Botz AI</h2>
            <div className="py-5">
              <img src={LoginImage} alt="" />
            </div>
            <div className="">
              <p className="underline font-bold">Privacy & Policy</p>
              <p className="mt-3 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias facilis debitis necessitatibus ipsam explicabo quasi
                doloremque eveniet earum vero? Sit.
              </p>
            </div>
          </div>
        </div>
        {/* Login Content */}
        <div className="LoginContent">
          <LoginContent />
        </div>
      </div>
    </div>
  );
};

export default Login;
