import React from 'react'
import Navbar from '../Navbar';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import './MainLayout.css'
import { useAuth } from '../../contexts/AuthContext';

const MainLayout = ({ children }) => {

  const { user } = useAuth();

  return (
    <>
      {
        user ?
          <div className="main-layout">
            <Navbar />
            <div className="content-area">
              <Sidebar />
              <main className="content">
                {children}
              </main>
            </div>
            <Footer />
          </div>
          :
          <div className="main-layout">
            <Navbar />          
              <main className="content1">
                {children}
              </main>
            <Footer />
          </div>
      }
    </>

  );
}

export default MainLayout;