import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, User2Icon } from "lucide-react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BACKEND_URL } from "../constants";

export function Home() {
  const [rollNumber, setRollNumber] = useState("");
  const [studentMarks, setStudentMarks] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (rollNumber < 1 || rollNumber > 330) {
      return toast.error("Roll Number must be between 1 and 330");
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/marks/get-marks/${rollNumber}`
      );
      setStudentMarks(response.data);
      console.log(response.data);
      setError("");
    } catch (error) {
      setError("Error fetching marks. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
      <Button
        className="absolute top-4 right-4"
        variant="secondary"
        onClick={() => navigate("/admin")}
      >
        <User2Icon className="h-4 w-4" />
      </Button>
      <div className="text-white text-[12px] absolute bottom-1 left-1/2 -translate-x-1/2">
        <h5>Copyright ©️Meet Darji</h5>
      </div>
      <div className="w-full max-w-4xl bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-100 text-center mb-8">
          Student Marks Lookup
        </h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            type="Number"
            min="1"
            max="330"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter Roll Number"
            className="flex-grow bg-gray-700 bg-opacity-50 placeholder-gray-400 text-gray-100 border-gray-600"
          />
          <Button
            onClick={handleSearch}
            className="bg-violet-600 hover:bg-violet-700 text-white"
          >
            Search
          </Button>
        </div>

        {error && (
          <Alert
            variant="destructive"
            className="bg-red-900 bg-opacity-70 text-gray-100 border border-red-700"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {studentMarks.length > 0 && (
          <div className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden">
            <Table>
              <TableCaption className="text-gray-300 mb-4">
                Marks for Roll Number: {rollNumber}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-200">Subject</TableHead>
                  <TableHead className="text-right text-gray-200">
                    Marks
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentMarks.map((mark) => (
                  <TableRow
                    key={mark._id}
                    className="hover:bg-gray-700 hover:bg-opacity-50"
                  >
                    <TableCell className="font-medium text-gray-300">
                      {mark.subject}
                    </TableCell>
                    <TableCell className="text-right text-gray-300">
                      {mark.marks} / {mark.totalmarks}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
