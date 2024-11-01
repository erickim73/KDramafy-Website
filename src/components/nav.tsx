import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import logoImage from "../pictures/KDramafy_Logo.png"

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-5 py-3"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Menu Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <img src={logoImage} alt="KDramafy Logo" className="w-40 h-10 object-contain" />
          </Link>
          
          <div className="flex items-center gap-6">
            {[
              { to: "/", label: "Home" },
              { to: "/explore", label: "Explore" }
            ].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="relative group"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className="text-gray-800 font-medium text-[17px] transition-colors group-hover:text-[#FF6B2B]">
                  {link.label}
                </span>
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF6B2B] to-[#2563EB] bottom-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 text-gray-800 font-semibold rounded-lg border border-gray-300 
                         hover:border-[#FF6B2B]/30 hover:text-[#FF6B2B] transition-colors
                         bg-white shadow-sm hover:shadow-[#FF6B2B]/10"
            >
              Login
            </motion.button>
          </Link>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 text-white font-semibold rounded-lg
                         bg-gradient-to-r from-[#FF6B2B] to-[#2563EB] 
                         shadow-md hover:shadow-lg hover:shadow-blue-500/20
                         transition-shadow duration-300"
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}