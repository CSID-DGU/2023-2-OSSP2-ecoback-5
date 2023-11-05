/*웹브라우저 보안 정책상 웹애플리케이션이 사용자 파일 시스템에 직접적으로 접근하여
파일을 저장할 수 없다고 함. 대신 사용자에게 캡처된 이미지를 다운로드할 수 있도록
유도할 수 있는 기능을 찾아 코드를 추가해놓음.

->Refresh버튼:원래 없는건데 사진 캡처하고 사용자가 수동으로 이미지 저장할 수 있게 화면에 띄워놓고
Refrsh 버튼 누르면 사진 사라지게 일단 임시로 버튼 만들어놓음.
*/

import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import './receiptFilming.css';

const videoConstraints = {
  width: { ideal: window.innerWidth },
  facingMode: "environment",
};

const Camera = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);

    // 캡처된 이미지를 다운로드하기 위한 링크 요소를 생성
    const downloadLink = document.createElement('a');
    downloadLink.href = imageSrc;
    downloadLink.download = 'capture.png'; // 다운로드될 파일의 이름을 지정

    // 링크를 문서에 추가하고 클릭 이벤트를 발생
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // 링크 요소를 다시 문서에서 제거
    document.body.removeChild(downloadLink);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  }

  return (
    <>
      <Webcam
        class="webcam"
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
        mirrored={true}
      />
      <div className="container">
      <img id="album" src={require("../image/photoAlbum.png")} alt="photoAlbum" />
      <button id="turtleBtn" onClick={capturePhoto}><img id="turtleBtn" src={require("../image/turtleBtn.png")} alt="captureBtn" /></button>
      <button id="refresh" onClick={() => { setUrl(null) }}><img id="refreshBtn"src={require("../image/refreshBtn.png")}/></button>
      </div>
     
      {url && (
        <div>
          <img src={url} alt='ScreenShot'/>
        </div>
      )}
    </>
  );
}

export default Camera;