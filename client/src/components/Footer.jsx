import React from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()
  if(location.pathname.includes("seller") || location.pathname.includes("buyer") ){
    return null
}
    return (
        <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by Pic Prism</p>
        </aside>
      </footer>
    )
}

export default Footer
