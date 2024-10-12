import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./GenerateQr.css";

function GenerateQr() {
  const [tableNumber, setTableNumber] = useState("");
  const [qrString, setQrString] = useState("http://localhost:3000/Gujrati/1");
  const qrRef = useRef(null); // Reference to the hidden QR code canvas

  const setTable = (e) => {
    const table = e.target.value;
    setTableNumber(table);
    setQrString("http://localhost:3000/Gujrati/" + table);
  };

  const downloadQRCode = () => {
    // Use a hidden canvas to generate the QR code
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `table_${tableNumber}_QRCode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="qrParent">
      <div className="empty"> </div>

      <div className="mainContent">
        <div className="heading">
            <h2>Select Table Number</h2>
        </div>
        <div className="options">
        <select className="tableSelect" onChange={setTable}>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>

        <button className="downloadButton" onClick={downloadQRCode}>
          Download QR Code
        </button>
        </div>
      </div>

      {/* Render QR code invisibly */}
      <div style={{ display: "none" }}>
        {qrString && (
          <div ref={qrRef}>
            <QRCodeCanvas value={qrString} size={256} />
          </div>
        )}
      </div>
    </div>
  );
}

export default GenerateQr;
