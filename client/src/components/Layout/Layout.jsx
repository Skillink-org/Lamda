import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import HomePage from '../../pages/homePage/HomePage';
import InstructionsPage from '../../pages/instructionsPage/InstructionsPage';
import ContactPage from '../../pages/contactPage/ContactPage';
import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/instructions" element={<InstructionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default Layout; 