import { motion } from 'framer-motion';

/** A thin vertical line with a light traveling down it — connects sections. */
export default function SectionConnector({ height = 72 }) {
  return (
    <div className="relative mx-auto" style={{ height, width: 1 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-line to-transparent" />
      <motion.span
        className="absolute left-1/2 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary-light to-transparent"
        animate={{ y: [-24, height] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeIn' }}
      />
    </div>
  );
}
