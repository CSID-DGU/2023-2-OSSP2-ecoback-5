import React from 'react';
import TitleBanner from '../components/TitleBanner.js';
import '../css/EditProfile.css';
import API from 'api/axios';
const EditProfile=()=>{
    const handleSubmit=async()=>{
        const endpoint="/mypage/get_object/";
        const access_token=localStorage.getItem('access');
        const patchData={

        }
        try{
            const response=await API.patch(endpoint,patchData,{
                headers:{
                    'Authorization':`Bearer ${access_token}`
                }
            });

        }catch(e){
            console.log('API 오류: ',e);
        }
    }
    return (
       <div>
        <div className="full_container" style={{backgroundColor:"#F9F9F9",paddingBottom:"15px", minHeight:"100vh"}}>
        <TitleBanner />
        <hr />
        <div className="profileContainer">
                <div id="username">홍길동님의 프로필</div>
                <div className="faceImage" style={{marginTop:'5%', padding: 'auto'}}>
                    <img id="faceImage" src={require('../image/userProfile.png')} alt="faceImg" />
                    <p style={{fontSize:"16px"}}><b>2023년 10월 1일부터 함께하는 중</b></p>
                    <button id="editProfile">사진 변경</button>
                </div>
            </div>
            <hr />
            <div className="inputBox">
                <form id="submitForm"  onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="이름(Name)"/><br />
                    <input type="number" name="phone" placeholder="휴대전화(Phone number)"/><br />
                    <input type="email" name="email" placeholder="이메일(Email address)"/><br />
                    <select name="gender" id="gender">
                        <option>남성</option>
                        <option>여성</option>
                    </select><br />
                    <div id="btnBox">
                    <button id="submitBtn">프로필 편집</button>
                    </div>
                </form>
            </div>
       </div></div>
    )
}
export default EditProfile;