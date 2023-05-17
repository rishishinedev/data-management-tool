import React from 'react';
import './App.css';
import UploadFile from './UploadFile';

function App() {
  return (
    <div className="App">
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='max-auto min-h-[400px] max-w-[600px] border-2 border-gray-800 p-10 flex flex-col items-center'>
          <h1 className="text-3xl font-bold underline">Upload CSV File Here...</h1>
          <UploadFile />
        </div>
      </div>
    </div>
  );
}

export default App;
