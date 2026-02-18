import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'white';
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const variants = {
  primary: 'bg-linkedin hover:bg-linkedin-dark text-white',
  outline: 'border-2 border-linkedin text-linkedin hover:bg-linkedin/5',
  white: 'bg-white text-gray-900 border-2 border-white/80 hover:bg-white/90',
};

export default function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-full font-semibold text-sm transition-colors cursor-pointer no-underline';
  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
