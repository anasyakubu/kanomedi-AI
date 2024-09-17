// import React from 'react'
import Nav from "../../components/Nav";
import { GoLinkExternal } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa";
import "./Hero.scss";
import toast from "react-hot-toast";

const Hero = () => {
  return (
    <div className="Hero">
      <Nav />
      <div className="p-20 my-24 lg:py-16 flex justify-center text-center">
        <div className="">
          <div className="">
            <h6 className="p-3">Kano Medi AI</h6>
            <h1
              className="mt-3 font-thin heroText"
              style={{ lineHeight: "1.1em" }}
            >
              Get answers. Get Diagnosis. <br /> Be more productive.
            </h1>
            <p className="mt-5 text-sm">
              Free to use. Easy to try. Just ask and chattybot can <br /> help
              with Diagnosis, symptoms, detection, and more.
            </p>
          </div>
          <div className="pt-16 flex justify-center text-center">
            <div className="flex gap-5">
              <button className="p-3 px-8 rounded-full bg-white text-black flex gap-3 font-semibold">
                <span>Start now</span>{" "}
                <span className="py-1">
                  <GoLinkExternal />
                </span>
              </button>
              <button
                className="border-b border-white p-0 flex gap-3"
                onClick={() => {
                  toast.error("App not Available Yet..");
                }}
              >
                <span>Download the app</span>{" "}
                <span className="py-1">
                  <FaChevronRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
