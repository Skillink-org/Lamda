import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import HomePage from '../../pages/homePage/HomePage';
import InstructionsPage from '../../pages/instructionsPage/InstructionsPage';
import ContactPage from '../../pages/contactPage/ContactPage';
import { ExamPage } from '../../pages/ExamPage/ExamPage';
import ConclusionPage from '../../pages/conclusionPage/ConclusionPage';
import UserProfile from '../UserProfile/UserProfile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/instructions" element={
            <ProtectedRoute>
              <InstructionsPage />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/exam" element={
            <ProtectedRoute>
              <ExamPage />
            </ProtectedRoute>
          } />
          <Route path="/results" element={
            <ProtectedRoute>
              <ConclusionPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
};

export default Layout; 