import React, { useState } from 'react'; 
// import "../qrScanner/qrScanner.js"; 
import { QrReader } from 'react-qr-reader'; 
import { Route, Routes, BrowserRouter, Link} from "react-router-dom";
// import { Button } from 'bootstrap';

import { Modal, Button} from 'react-bootstrap';

 
const ScanQR = (props) => { 
  const [data, setData] = useState('');


  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleScan = (result) => {
    if (result) {
      setData(result.text);
      setShowPopup(true);
    }
  };

  const handleError = (error) => {
    console.log(error);
  };




 
   
  return ( 
    
    <div className='box' style={{width: "330px", margin : "17vh auto", border:"4px solid white"}}> 
    
      <QrReader
        onResult={(result, error) => { 

          if (!!result) { 
            setData(result?.text); 
          } 
 
          if (!!error) { 
            console.info(error); 
          } 
        }} 
        style={{ width: '500px', height: "500px", border:"4px solid white !important"}} 
      /> 





<p>{data}</p>





{data && (
  <div style={{ display: 'flex', justifyContent: 'center', marginBottom:"16px"}}>
        <Button class="popup-btn" onClick={handleShowPopup} style={{background:"radial-gradient(circle, rgba(88,54,69,1) 0%, rgba(74,88,103,1) 100%)", border:"none"}}>
          <a href={data} style={{fontSize: "25px", color:"white", padding:"5px 5px"}}>play Mines</a>
          </Button>
        </div>
      )}

      {/* <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>QR Code Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>QR Code Text: {data}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePopup}>Close</Button>
        </Modal.Footer>
      </Modal> */}


      
      {/* <p style={{color : "white", cursor:"pointer"}}><Link href="{data}">{data}</Link></p>  */}
      
     
    </div> 
  ); 
}; 
 
export default ScanQR


