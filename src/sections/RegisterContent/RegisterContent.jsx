import { useState } from "react";
import "./RegisterContent.scss";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { IoIosArrowBack } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const RegisterContent = () => {
  // Signup with Google
  const googleSignup = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        // Check if the user already exists in the database
        const userDocRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          // If user does not exist, create a new document in the "Users" collection
          await setDoc(userDocRef, {
            email: user.email,
            firstName: user.displayName,
            photo: user.photoURL,
            lastName: "",
          });
          toast.success("User signed up successfully", {
            position: "top-center",
          });
        } else {
          toast.info("User already exists. Logging you in...", {
            position: "top-center",
          });
        }

        window.location.href = "/profile";
      }
    } catch (error) {
      console.error("Error during Google sign-up:", error);
      toast.error("Failed to sign up with Google. Please try again.", {
        position: "top-center",
      });
    }
  };

  // Signup with email and Password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          fullName: fullname,
          photo: "",
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!");
    } catch (error) {
      console.log(error);
      toast.error("Error Encounter...", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="RegisterContent text-white">
      <div className="p-64 py-10">
        <form onSubmit={handleRegister}>
          <div className="">
            {/* Back Button */}
            <div className="">
              <button
                type="button"
                className="bg-white text-black p-3 rounded-full"
                onClick={() => {
                  window.location.href = "/";
                }}
                aria-label="Go back"
              >
                <IoIosArrowBack size={15} />
              </button>
            </div>
            {/* Header */}
            <div className="my-5">
              <h2 className="text-3xl">Register</h2>
            </div>
            {/* Form Section */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="mt-5">
                <label className="label-style" htmlFor="">
                  Full Name
                </label>
                <input
                  className="input-style"
                  type="text"
                  placeholder="e.g : Anas Yakubu"
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
              <div className="mt-5">
                <label className="label-style" htmlFor="">
                  Email Address
                </label>
                <input
                  className="input-style"
                  type="email"
                  placeholder="e.g : yakubuanas04@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="label-style" htmlFor="">
                Password
              </label>
              <input
                className="input-style"
                type="password"
                placeholder="*******"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-5">
              <p className="text-sm">
                Password must contain a special character (e.g @, $, #) ,
                Capital letter (e.g A, B, C) , lowercase letter (e.g a, b, c) ,
                numbers (e.g 1, 2, 3)
              </p>
              <p className="mt-3 text-sm">
                Password must be at least 8 characters long
              </p>
            </div>
            <div className="mt-5">
              <button type="submit" className="btn">
                Register
              </button>
            </div>
            <div className="mt-5">
              <p className="text-sm">
                Already have an account?{" "}
                <span className="underline">
                  <a href="/auth">Login</a>
                </span>
              </p>
            </div>
            <div className="mt-5 text-center">
              <button
                type="button"
                className="google-btn"
                onClick={googleSignup}
              >
                <span className="py-1">
                  <FcGoogle size={15} />
                </span>
                <span className="text-sm">Continue with Google</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterContent;
