import InputBox from "../components/InputBox";
import { Button } from "../components/Button";
import { useRef, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setToken, isAuthenticated } = useAuth();

 
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });

      const jwt = response.data.token;

   
      localStorage.setItem("token", jwt);


      setToken(jwt);


      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials, please try again.");
    }
  }

  return (
    <div className="h-screen w-screen bg-slate-500 flex justify-center items-center">
      <div className="bg-white rounded-2xl border min-w-48 p-8">
        <InputBox ref={usernameRef} placeholder="Username" />
        <InputBox ref={passwordRef} placeholder="Password" />
        <div className="flex items-center justify-center pt-4">
          <Button
            onClick={signin}
            size="lg"
            text="Sign In"
            variant="primary"
            fullWidth={true}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
