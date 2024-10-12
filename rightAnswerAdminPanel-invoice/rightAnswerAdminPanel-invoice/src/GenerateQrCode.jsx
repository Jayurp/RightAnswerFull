import React from "react";
import Sidebar from "./Sidebar";
import GenerateQr from "./GenerateQr";

function GenerateQrCode() {
  return (
    <div>
      <div className="grid-container">
        <Sidebar />
        <GenerateQr />
      </div>
    </div>
  );
}

export default GenerateQrCode;
