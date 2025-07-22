import React from "react";
import { QRCodeSVG } from "qrcode.react";

function QRCodeDisplay() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "2rem",
        padding: "1rem",
        maxWidth: "100%",
      }}
    >
      <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
        Scan to Mark Attendance
      </h2>
      <div style={{ display: "inline-block", width: "100%", maxWidth: "256px" }}>
        <QRCodeSVG
          value="https://getfit-frontend-jvs7.onrender.com/scan-attendance"
          size={256}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
     
    </div>
  );
}

export default QRCodeDisplay;
