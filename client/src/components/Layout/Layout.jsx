import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import HomePage from '../../pages/homePage/HomePage';
import AboutPage from '../../pages/aboutPage/AboutPage';
import InstructionsPage from '../../pages/instructionsPage/InstructionsPage';
import ContactPage from '../../pages/contactPage/ContactPage';
import ExamSelectionPage from '../../pages/examSelectionPage/ExamSelectionPage'; // Import the new selection page
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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/instructions" element={
            <ProtectedRoute>
              <InstructionsPage />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={<ContactPage />} />
          {/* Renamed /exam to /tests for the selection page */}
          <Route path="/tests" element={
            <ProtectedRoute>
              <ExamSelectionPage />
            </ProtectedRoute>
          } />
          {/* Added new dynamic route for a specific exam */}
          <Route path="/exam/:testCode" element={
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