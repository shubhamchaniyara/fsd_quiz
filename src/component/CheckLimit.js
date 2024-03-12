import React from "react";
import {QRCodeCanvas} from 'qrcode.react';  
function CheckLimit() {
  return (
    <div className="App">
    <header className="App-header">
      <p>Scan My QR Code</p>
      <QRCodeCanvas value="https://fsd-project-green.vercel.app/joinQuiz" size={250}/>,  {}
    </header>
  </div>
    );
}
export default CheckLimit;