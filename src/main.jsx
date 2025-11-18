import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './lang'

// Styles
import '@styles/tailwind.css'
import '@styles/global.scss'

// Root
const rootElement = document.getElementById('root')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <App />
  )
}
 