import React from "react";
import Dropzone from "react-dropzone";

const UploadFile = () => {

  function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  function handleAcceptedFiles(files: Array<any>) {
    // validation.setFieldValue("image", files[0])
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    console.log(files);
  }

  return (
    <>
      <Dropzone
        maxFiles={1}
        onDrop={acceptedFiles => {
          handleAcceptedFiles(acceptedFiles)
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone">
            <div
              className="dz-message needsclick mt-2"
              {...getRootProps()}
            >
              <input name="image" {...getInputProps()} />
              <div className="mb-3">
                <i className="display-4 text-muted bx bxs-cloud-upload" />
                <img  src={'upload-icon.png'} alt="fireSpot" />
              </div>
              <h4>Drop files here or click to upload.</h4>
            </div>
          </div>
        )}
      </Dropzone>
    </>
  )
}

export default UploadFile;
