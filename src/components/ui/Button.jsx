import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { buttonVariants } from '../../animations/variants';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:opacity-50 disabled:pointer-events-none';

  const sizes = {
    sm: 'h-8 px-3 text-[13px]',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-[15px]',
  };

  const variants = {
    // Vercel primary: white fill, black text
    primary: 'bg-white text-black hover:bg-gray-200',
    // Secondary: subtle bordered surface
    secondary: 'bg-transparent text-gray-100 border border-line hover:bg-surface-hover hover:border-gray-600',
    // Outline == secondary alias for backwards compat
    outline: 'bg-transparent text-gray-100 border border-line hover:bg-surface-hover hover:border-gray-600',
    // Accent: Vercel blue
    accent: 'bg-primary text-white hover:bg-primary-dark',
    ghost: 'bg-transparent text-gray-200 hover:bg-surface-hover hover:text-white',
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={cn(base, sizes[size], variants[variant] || variants.primary, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
