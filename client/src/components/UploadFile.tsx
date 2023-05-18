import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import Loading from "./Loading";
import ShowResponse from "./ShowResponse";
import Error from "./Error";

interface IShowResponse {
  totalDuplicateRecordInCSV: number;
  totalDuplicateRecordInDB: number;
  totalRecordsInserted: number;
}

const UploadFile = () => {
  const [file, setFile] = useState<any>("");
  const [heading, setHeading] = useState<string>("Upload CSV File Here...");
  const [uploading, setUploading] = useState<boolean>(false);
  const [resSuccess, setResSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [resData, setResData] = useState<IShowResponse>({
    totalRecordsInserted: 0,
    totalDuplicateRecordInCSV: 0,
    totalDuplicateRecordInDB: 0,
  });

  const handleAcceptedFiles = (files: any) => {
    setFile(files);
  };

  useEffect(() => {
    if (file) {
      setUploading(true);
      setHeading("Uploading CSV data...");
      const formData = new FormData();
      formData.append("file", file[0]);

      axios({
        url: "http://localhost:8080/api/v1/users/upload-csv",
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        data: formData,
      })
        .then((res: any) => {
          setResData({ ...res.data });
          setUploading(false);
          setFile("");
          setResSuccess(true);
          setHeading("Uploaded data summary...");
        })
        .catch((err: any) => {
          // eslint-disable-next-line
          console.log(err)
          setError(true);
          setUploading(false);
          setFile("");
          setHeading("Only CSV files are allowed...");
        });
    }
  }, [file]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{heading}</h1>
      {!uploading && !resSuccess && !error && (
        <Dropzone
          maxFiles={1}
          onDrop={(acceptedFiles) => {
            handleAcceptedFiles(acceptedFiles);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone flex-flex-col items-center justify-center">
              <div
                className="dz-message needsclick mt-2 flex items-center flex-col border-2 p-10 bg-white"
                {...getRootProps()}
              >
                <input name="image" {...getInputProps()} />
                <div className="mb-3">
                  <img src={"upload-icon.png"} alt="upload csv" />
                </div>
                <h4>Drop files here or click to upload.</h4>
              </div>
            </div>
          )}
        </Dropzone>
      )}
      {uploading && <Loading />}
      {resSuccess && (
        <ShowResponse
          totalRecordsInserted={resData.totalRecordsInserted}
          totalDuplicateRecordInDB={resData.totalDuplicateRecordInDB}
        />
      )}
      {error && <Error />}
    </>
  );
};

export default UploadFile;
