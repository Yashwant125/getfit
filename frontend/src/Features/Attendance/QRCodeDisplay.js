import React from "react";
import { QRCodeSVG } from "qrcode.react";

function QRCodeDisplay() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Scan to Mark Attendance</h2>
      <QRCodeSVG value="http://192.168.29.227:3000/scan-attendance" size={256} />

      <p>Scan this code at the gym entrance to mark your attendance.</p>
    </div>
  );
}

export default QRCodeDisplay;
