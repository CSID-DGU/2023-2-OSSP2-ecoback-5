import React, { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import './receiptFilming.css';
import SendPhotoModal from './sendPhotoModal';
import API from 'api/axios';

const videoConstraints = {
  width: { ideal: window.innerWidth },
  height:{ideal:window.innerHeight},
  facingMode: "user",
  /*전면카메라(PC용): user, 후카메라(모바일용): environment*/
};

const Camera = () => {
  const [isModalOpen, setIsModalOpen]=useState(false);
  const handleOpenModal=()=>setIsModalOpen(true);
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [responseStatus, setResponseStatus]=useState(null);

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();/*스크린샷 url 저장*/
    setUrl(imageSrc);
    console.log(url);

    // 캡처된 이미지를 다운로드하기 위한 링크 요소를 생성
    const downloadLink = document.createElement('a');
    downloadLink.href = imageSrc;
    downloadLink.download = 'barcode.png'; // 다운로드될 파일의 이름을 지정

    // 링크를 문서에 추가하고 클릭 이벤트를 발생
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // 링크 요소를 다시 문서에서 제거
    document.body.removeChild(downloadLink);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log("User Media accessed", e);
  };


  //데이터 URL에서 Blob 객체 생성하는 함수
  //Base64 인코딩된 데이터 url를 'Blob' 객체로 변환해 파일 형식으로 서버에 전달.
  const dataURLtoBlob=(dataurl)=>{
    let arr=dataurl.split(','),mime=arr[0].match(/:(.*?);/)[1],
    bstr=atob(arr[1]),n=bstr.length, u8arr=new Uint8Array(n);
    while(n--){
      u8arr[n]=bstr.charCodeAt(n);
    }
    return new Blob([u8arr],{type:mime});
  }
  /*서버로 사진 전송하는 함수*/
  const sendPhotoServer = async () => {
    handleOpenModal();
    const imageBlob = dataURLtoBlob(url);
    const formData = new FormData();
    /*<input name="photo" value={url} />이라고 생각하면 됨. */
    //formData.append('status','approved');
    //formData.append('code','0036111291452');
    formData.append('image', imageBlob, 'barcode.png');
  
    const endpoint = "/barcodes/";
    const access_token = localStorage.getItem('access');
  
    try {
      /* post 형식으로 formData 전송 */
      const response = await API.post(endpoint, formData, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data' // formData 형식으로 파일 전달
        }
      });
  
      console.log("response.data: ", response.data);
      setResponseStatus(response.data.status);
  
      if (response.data.status === "approved") {
        alert("바코드 전송에 성공하였습니다.");
        /*duplicate: 중복된 요청, 이미 서버에 저장된 이미지인 경우*/
      } else if (response.data.status === "duplicate") {
        alert("duplicate: 이미 등록된 바코드입니다.");
      } else if (response.data.status === "invalid") {
        alert("텀블러 미사용 바코드로 적립이 불가합니다.");
      } else{
        alert("바코드 정보를 인식할 수 없습니다.");
      }
    } catch (error) {
      console.error('Error: ', error);
      alert("오류 발생");
    }
  };
  
  return (
    <>{url?(<div id="screenShot">
    <img src={url} alt='ScreenShot'/>
    <button id="sendPhotoBtn" onClick={sendPhotoServer}>전송하기</button>
  </div>

    ):(
      <Webcam
        class="webcam"
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
        mirrored={false}
        width="100%"
      />
    )}
      
  
      <div className="container">
        <button id="album"><img id="album" src={require("../image/photoAlbum.png")} alt="photoAlbum" /></button>
        <button id="turtleBtn" onClick={capturePhoto}><img id="turtleBtn" src={require("../image/turtleBtn.png")} alt="captureBtn" /></button>
        <button id="refresh" onClick={() => { setUrl(null) }}><img id="refreshBtn"src={require("../image/refreshBtn.png")}/></button>
      </div>
  
      {/* {url && (
        <div id="screenShot">
          <img src={url} alt='ScreenShot'/>
          <button id="sendPhotoBtn" onClick={sendPhotoServer}>전송하기</button>
        </div>
      )} */}
     {(responseStatus==="approved")?
     <SendPhotoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />:null}
    </>
  );
}
  

export default Camera;