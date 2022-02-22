import React from "react";
import { CSVReader } from "react-papaparse";
const Axios = require("axios");

export default function MyComponent() {
  function handleOnDrop(email) {
    console.log("---------------------------", email);

    console.log(email);
    console.log("---------------------------");

    const newArr = email.map((element) => {
      const data = {
        email: element.data[0],
        pwd: element.data[1],
        proxyIP: element.data[2],
        proxyPort : element.data[3],
        proxyUsername: element.data[4],
        proxyPassword: element.data[5],
        seedNo: element.data[6],
        recovery: element.data[7],
        browserNo: element.data[10],
        from: element.data[11],
        to: element.data[12],
        subject: element.data[13],
        hasword: element.data[14],
        doesntHave: element.data[15]

      };

      return data;
    });
    console.log(newArr);
    Axios.post("http://localhost:7008/create", newArr).then((res) => {
      window.location.reload();
    });
  }

  function handleOnError(err, file, inputElem, reason) {
    console.log(err);
  }

  function handleOnRemoveFile(data) {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  }
  const onFileLoad = (data) => {};

  return (
    <>
      {/* <h6>Click and Drag Upload</h6> */}
      <CSVReader
        onError={handleOnError}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
        onFileLoad={handleOnDrop}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
    </>
  );
}
