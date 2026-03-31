/**
 * ============================================
 * 🚪 React 앱 진입점 (main.jsx)
 * ============================================
 * 
 * 【핵심 개념】
 * - ReactDOM.createRoot: React 18의 새로운 렌더링 방식
 * - index.html의 <div id="root">에 앱을 마운트(연결)
 * - StrictMode: 개발 시 잠재적 문제를 경고 (개발 전용)
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// index.html의 <div id="root">에 React 앱을 렌더링
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
