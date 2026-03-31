import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite 설정 파일
// Vite: 빠르고 현대적인 빌드 도구 (React 프로젝트에 사용)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // 프론트엔드 개발 서버 포트
  }
});
