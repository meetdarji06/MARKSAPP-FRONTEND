import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2, HomeIcon, User2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { BACKEND_URL } from "../constants";

const tsubjects = [
  {
    name: "Numerical Methods",
    scode: "301",
  },
  {
    name: "System Analysis and Design",
    scode: "302",
  },
  {
    name: "Introduction To Algorithms",
    scode: "303",
  },
  {
    name: "Client Server Architecture & Interface",
    scode: "304",
  },
  {
    name: "DBMS",
    scode: "305",
  },
];

const psubject = [
  {
    name: "P - Introduction To Algorithms",
    scode: "303P",
  },
  {
    name: "P - Client Server Architecture & Interface",
    scode: "304P",
  },
  {
    name: "P - DBMS",
    scode: "305P",
  },
];

const InsertMarks = () => {
  const { admin } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      return navigate("/");
    }
  });
  const [theoryForm, setTheoryForm] = useState({
    rollNumber: "",
    subject: "",
    totalmarks : "",
    marks: "",
  });
  const [practicalForm, setPracticalForm] = useState({
    rollNumber: "",
    subject: "",
    totalmarks : "",
    marks: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleTheoryChange = (e) => {
    setTheoryForm({ ...theoryForm, [e.target.name]: e.target.value });
  };

  const handlePracticalChange = (e) => {
    setPracticalForm({ ...practicalForm, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (value, formType) => {
    if (formType === "theory") {
      setTheoryForm({ ...theoryForm, subject: value });
    } else {
      setPracticalForm({ ...practicalForm, subject: value });
    }
  };

  const handleSubmit = async (e, formType) => {
    e.preventDefault();
    const form = formType === "theory" ? theoryForm : practicalForm;
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/marks/add-marks`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: admin ? "Bearer " + admin : null,
          },
        }
      );
      if (data.success) {
        toast.success("Marks Added !");
      } else {
        toast.error("Failed to add marks. Please try again.");
      }
      if (formType === "theory") {
        setTheoryForm({
          rollNumber: "",
          subject: theoryForm.subject,
          totalmarks : theoryForm.totalmarks,
          marks: "",
        });
      } else {
        setPracticalForm({
          rollNumber: "",
          subject: practicalForm.subject,
          totalmarks : practicalForm.totalmarks,
          marks: "",
        });
      }
    } catch (error) {
      // setStatus({ type: "error", message: `Error adding ${formType} marks` });
      console.log(error);
    }
  };

  const renderForm = (formType, form, handleChange) => (
    <form onSubmit={(e) => handleSubmit(e, formType)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${formType}RollNumber`} className="text-gray-200">
          Roll Number
        </Label>
        <Input
          id={`${formType}RollNumber`}
          name="rollNumber"
          placeholder="Enter Roll Number"
          value={form.rollNumber}
          onChange={handleChange}
          className="bg-gray-700 bg-opacity-50 text-gray-100 border-gray-600"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formType}Subject`} className="text-gray-200">
          Subject
        </Label>
        <Select
          value={form.subject}
          onValueChange={(value) => handleSubjectChange(value, formType)}
        >
          <SelectTrigger className="bg-gray-700 bg-opacity-50 text-gray-100 border-gray-600">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="math">Mathematics</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="history">History</SelectItem> */}
            {formType == "theory"
              ? tsubjects.map((s) => (
                  <SelectItem key={s.scode} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))
              : psubject.map((s) => (
                  <SelectItem key={s.scode} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
      </div>
      <div className=" flex items-center justify-between">
        <div>
          <Label htmlFor={`${formType}Marks`} className="text-gray-200">
            Marks
          </Label>
          <Input
            id={`${formType}Marks`}
            name="marks"
            type="number"
            placeholder="Enter Marks"
            value={form.marks}
            onChange={handleChange}
            className="bg-gray-700 bg-opacity-50 text-gray-100 mt-2  border-gray-600"
          />
        </div>
        <div>
          <Label htmlFor={`${formType}Marks`} className="text-gray-200">
            Total Marks
          </Label>
          <Input
            id={`${formType}TotalMarks`}
            name="totalmarks"
            type="number"
            placeholder="Enter Marks"
            value={form.totalmarks}
            onChange={handleChange}
            className="bg-gray-700 bg-opacity-50 mt-2 text-gray-100 border-gray-600"
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-violet-600 hover:bg-violet-700 text-white"
      >
        Submit Marks
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
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
            Add Student Marks
          </CardTitle>
          <CardDescription className="text-gray-300">
            Enter the student's theory or practical exam marks below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="theory" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-700 bg-opacity-50">
              <TabsTrigger value="theory" className="text-gray-200">
                Theory Exam
              </TabsTrigger>
              <TabsTrigger value="practical" className="text-gray-200">
                Practical Exam
              </TabsTrigger>
            </TabsList>
            <TabsContent value="theory">
              {renderForm("theory", theoryForm, handleTheoryChange)}
            </TabsContent>
            <TabsContent value="practical">
              {renderForm("practical", practicalForm, handlePracticalChange)}
            </TabsContent>
          </Tabs>

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
};

export default InsertMarks;
