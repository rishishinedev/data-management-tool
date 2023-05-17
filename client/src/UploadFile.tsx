import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import Loading from "./Loading";
import ShowResponse from "./ShowResponse";

interface IShowResponse {
  totalDuplicateRecordInCSV: number,
  totalDuplicateRecordInDB: number,
  totalRecordsInserted: number,
}

const UploadFile = () => {
  const [file, setFile] = useState<any>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [resSuccess, setResSuccess] = useState<boolean>(false);
  const [resData, setResData] = useState<IShowResponse>({totalRecordsInserted: 0, totalDuplicateRecordInCSV: 0, totalDuplicateRecordInDB: 0});

  function handleAcceptedFiles(files: any) {
    setFile(files);
  }

  useEffect(() => {
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file[0]);

      axios({
        url: "http://localhost:8080/api/v1/users/upload-csv",
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        data: formData,
      })
        .then((res) => {
          setResData({...res.data});
          setUploading(false);
          setFile('');
          setResSuccess(true);
        })
        .catch((err) => console.log(err));
    }
  }, [file])

  return (
    <>
      {!uploading && !resSuccess && <Dropzone
        maxFiles={1}
        onDrop={acceptedFiles => {
          handleAcceptedFiles(acceptedFiles)
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone flex-flex-col items-center justify-center">
            <div
              className="dz-message needsclick mt-2"
              {...getRootProps()}
            >
              <input name="image" {...getInputProps()} />
              <div className="mb-3">
                <img src={'upload-icon.png'} alt="upload csv" />
              </div>
              <h4>Drop files here or click to upload.</h4>
            </div>
          </div>
        )}
      </Dropzone>}
      {uploading &&  <Loading />}
      {resSuccess &&  <ShowResponse 
        totalRecordsInserted={resData.totalRecordsInserted} 
        totalDuplicateRecordInCSV={resData.totalDuplicateRecordInCSV} 
        totalDuplicateRecordInDB={resData.totalDuplicateRecordInDB} 
      />}
    </>
  )
}

export default UploadFile;
