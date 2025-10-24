import { useEffect, useRef } from "react";
import { Button } from "../components/Button";
import InputBox from "../components/InputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  async function signup() {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });

      alert("Account created successfully!");
      navigate("/signin");
      
    } catch (error: any) {
      if (error.response?.data?.message === "User already exists") {
        alert("User already exists. Redirecting to Sign In...");
        navigate("/signin");
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  }

  return (
    <div className="h-screen w-screen bg-slate-500 flex justify-center items-center">
      <div className="bg-white rounded-2xl border min-w-48 p-8">
        <InputBox ref={usernameRef} placeholder="Username" />
        <InputBox ref={passwordRef} placeholder="Password" />
        <div className="flex items-center justify-center pt-4">
          <Button
            onClick={signup}
            size="lg"
            text="Sign Up"
            variant="primary"
            fullWidth={true}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
