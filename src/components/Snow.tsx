import React from "react";
import { motion } from "framer-motion";

const Snow = () => {
  const flakes = Array.from({ length: 40 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {flakes.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/70"
          style={{
            width: Math.random() * 6 + 4,
            height: Math.random() * 6 + 4,
            left: `${Math.random() * 100}%`,
          }}
          initial={{
            y: -20,
            opacity: 0.2,
          }}
          animate={{
            y: "110vh",
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 5 + 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default Snow;
