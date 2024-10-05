import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle2, HomeIcon, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { BACKEND_URL } from "../constants";
export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const { admin, setAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin) {
      return navigate("/insert-marks");
    }
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        // "http://localhost:5000/admin/login",
        `${BACKEND_URL}/admin/login`,
        form
      );
      if (data.success) {
        toast.success("Success");
        setAdmin(data.token);
        navigate("/insert-marks");
      } else {
        toast.error("Failed");
      }
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
      <Button
        className="absolute top-4 right-4"
        variant="secondary"
        onClick={() => navigate("/")}
      >
        <HomeIcon className="h-4 w-4" />
      </Button>
      <div className="text-white text-[12px] absolute bottom-1 left-1/2 -translate-x-1/2">
        <h5>Copyright ©️Meet Darji</h5>
      </div>
      <Card className="w-full max-w-md bg-gray-800 bg-opacity-30 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-100">
            Teacher Login
          </CardTitle>
          <CardDescription className="text-gray-300">
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-200">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                className="bg-gray-700 bg-opacity-50 text-gray-100 border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="bg-gray-700 bg-opacity-50 text-gray-100 border-gray-600"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white"
            >
              Log In
            </Button>
          </form>

          {status.type && (
            <Alert
              variant={status.type === "success" ? "default" : "destructive"}
              className={`mt-4 ${
                status.type === "success" ? "bg-green-900" : "bg-red-900"
              } bg-opacity-70 text-gray-100 border border-gray-600`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {status.type === "success" ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
