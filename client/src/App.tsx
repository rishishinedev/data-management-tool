import React from "react";
import "./App.css";
import UploadFile from "./components/UploadFile";

function App() {
  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="max-auto min-h-[300px] max-w-[700px] border-2 border-gray-200 bg-gray-100 p-10 flex flex-col items-center justify-center">
          <UploadFile />
        </div>
      </div>
    </div>
  );
}

export default App;
