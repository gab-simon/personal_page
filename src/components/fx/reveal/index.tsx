import { motion } from "framer-motion";
import type { ReactNode } from "react";

const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    viewport={{ once: true, margin: "-40px" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default Reveal;
