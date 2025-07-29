import React, { useEffect } from 'react';
import Invitation from './Invitation';
import './Invitation.css';

function App() {
  // Add connection test
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🔍 Testing API connection...');
        console.log('📍 API URL:', process.env.REACT_APP_API_URL);
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/`);
        const data = await response.text();
        
        console.log('✅ API Connection successful!');
        console.log('📋 Response:', data);
      } catch (error) {
        console.error('❌ API Connection failed:', error);
        console.error('🔧 Check your environment variables and CORS settings');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="app-container">
      <Invitation />
    </div>
  );
}

export default App;