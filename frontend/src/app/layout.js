// /frontend/app/layout.js
import Footer from '@/components/Footer';
import { AuthProvider } from '../../context/AuthContext';
import './globals.css';
import Navbar from '@/components/Navbar';
// import Header from '@/components/Header'; // Add your shared components here

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap everything in AuthProvider */}
        <AuthProvider>
          <Navbar />
          {/* <Header /> Add your shared header/nav here */}
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}