import React, { useState, useEffect, useRef } from 'react';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Icon from "awesome-react-icons";
import { useNavigate } from 'react-router-dom';
import closebutton from '../image/close.png';

import '../css/Sidebar.css';

const Sidebar=() => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(); // 사이드바 요소에 대한 ref를 생성
    const  navigate  = useNavigate();
  // 클릭 이벤트 리스너
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false); // 사이드바 외부를 클릭하면 사이드바를 닫음
    }
  };

  // 컴포넌트가 마운트되었을 때 클릭 이벤트 리스너를 등록하고, 언마운트되었을 때 리스너를 제거
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
    return (
      <>
       {!isSidebarOpen && (
          <button
            style={{position:"absolute",right:1, width: 50, height: 50, borderRadius:10, backgroundColor:"white" }}
            className="btn-menu"
            onClick={() => setIsSidebarOpen(true)}
            type="button"
          >
            <Icon name="burger" className="w-6 h-6" />
          </button>
        )}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`overlay ${isSidebarOpen ? "block" : "hidden"}`}
        style={{zIndex:20}}
      />
      {isSidebarOpen && (
      <div ref={sidebarRef} className="sidebarobj" style={{height: isSidebarOpen ? '100vh' : '0'}} >
      
      {/* 사이드바 펼쳤을때 나머지화면 어둡게 만들기 */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <img src={closebutton} id='closebutton' onClick={() => setIsSidebarOpen(false)} ></img>
        <Navigation 
            onSelect={({ itemId }) => {
                navigate(itemId);
            }}
            // you can use your own router's api to get pathname
            
            items={[
          
              {
                className:'sidebaritem',
                title: '마이 페이지',
                itemId: '/mypage',
                elemBefore: () =><Icon name="user"/>,
                subNav: [
                  {
                    title: '프로필 편집',
                    itemId: '/editprofilepage',
                    elemBefore: () =><Icon name="user"/>
                   },
                  // {
                  //   title: 'Members',
                  //   itemId: '/management/members',
                  // },
                ],
                
              },
              {
                className:'sidebaritem',
                title: '이벤트',
                itemId: '/event',
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () => <Icon name="inbox"/>
              },
              {
                className:'sidebaritem',
                title: '프로필 편집',
                itemId: '/editprofilepage',
                elemBefore: () =><Icon name="user"/>
                
              },
              
              
              
            ]}
            
          />
          
        </div>
        )}
      </>
    );
};
export default Sidebar;