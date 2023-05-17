## Data Management Tool

Objective: The task is to build a application that allows users to upload csv file with
50,00000 data from the FE and BE will validate that csv by checking the duplicate data and store data in the databse.

API Documentation :-

https://documenter.getpostman.com/view/11445516/2s93kxdSFR

Source Code:-

github - https://github.com/rishishinedev/data-management-tool

Features:

- User Upload a csv by selecting or drag & drop from FE.
- Then upload csv file at BE.
- Check the duplicate data and filter that data.
- Store that data in Database.
- In response it will send Total Records Inserted, Total Duplicate Record In CSV, Total Duplicate Record In DB.
- Then showing that data to the FE.

Tech Stack for FE:
[React] for UI
[Typescript] for development
[axios] for api request
[tailwind-css] for design
[react-dropzone] for droping/uploading a csv file

Tech Stack for BE:
[Javascript] for development
[Nodejs] for backend
[multer] for file upload
[express] for server
[mongoose] for database
[csv-parser] for convert CSV into JSON

[Environment Variables For BE] [.env]

DB_URL=""
PORT=8080

[Before local setup]

- git clone - https://github.com/rishishinedev/data-management-tool
- cd data-management-tool

[Local-Setup-Steps FE]

- cd client
- npm install
- npm start

[Local-Setup-Steps BE]

- cd server
- set env
- npm install --force
- npm run start
