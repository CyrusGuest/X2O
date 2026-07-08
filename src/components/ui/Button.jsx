import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { buttonVariants } from '../../animations/variants';

export default function Button({
  children,
  variant = 'primary',
  className,
  onClick,
  ...props
}) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium text-sm transition-colors';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50',
    outline: 'bg-transparent text-primary border border-primary hover:bg-primary-light',
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
