import React from "react";
import {QRCodeCanvas} from 'qrcode.react';  
function CheckLimit() {
  return (
    <div>
      <h3>Scan QR Code</h3>
      <QRCodeCanvas value="https://fsd-project-green.vercel.app/joinQuiz" size={250}/>,  {}
  </div>
    );
}
export default CheckLimit;