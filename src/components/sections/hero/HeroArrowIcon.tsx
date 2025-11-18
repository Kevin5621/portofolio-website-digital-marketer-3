'use client'

import { motion } from 'framer-motion'

export const HeroArrowIcon = () => {
  return (
    <div className="mb-2">
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ x: -8, y: -8 }}
        animate={{ x: 8, y: 8 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <path
          d="M5.75739 7.17154L7.1716 5.75732L16.2426 14.8283L16.2426 10.2427H18.2426L18.2426 18.2427H10.2426V16.2427L14.8285 16.2427L5.75739 7.17154Z"
          fill="currentColor"
        />
      </motion.svg>
    </div>
  )
}

