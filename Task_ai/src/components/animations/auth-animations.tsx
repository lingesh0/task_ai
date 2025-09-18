import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";

// Animation variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const formControls = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 }
};

export const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

// Animated components
export const AnimatedCard = motion.create(({ children, ...props }) => (
  <div {...props}>{children}</div>
));

export const AnimatedInput = motion.create(({ children, ...props }) => (
  <div {...props}>{children}</div>
));

// Animation utilities
export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};