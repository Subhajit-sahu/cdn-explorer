import React from 'react';
import Header from './Header';

export default function DashboardLayout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <main>{children}</main>
      <footer className="app-footer">
        CDN Explorer • Phase 1: Local Origin API Integration • React + Vite + Node/Express
      </footer>
    </div>
  );
}
