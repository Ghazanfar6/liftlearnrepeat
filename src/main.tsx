import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
 <React.StrictMode>
   <AuthProvider>      {/* Authentication context */}
     <BrowserRouter>   {/* Single Router instance */}
       <App />         {/* Routes and components */}
     </BrowserRouter>
   </AuthProvider>
 </React.StrictMode>
)
