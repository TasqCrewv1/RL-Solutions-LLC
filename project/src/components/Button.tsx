import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

interface ArrowButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'white';
  size?: 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
}

export function ArrowButton({
  children,
  to,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
}: ArrowButtonProps) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full font-600 transition-all duration-300 active:scale-95';
  const sizes = {
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };
  const variants = {
    primary: 'bg-orange-500 text-white shadow-sm hover:bg-orange-600 hover:shadow-md',
    ghost:
      'text-slate-900 ring-1 ring-slate-300 hover:bg-slate-50 hover:ring-slate-400',
    white: 'bg-white text-slate-900 shadow-lg hover:shadow-xl',
  };

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
        <ArrowRight
          size={size === 'lg' ? 18 : 16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
      <ArrowRight
        size={size === 'lg' ? 18 : 16}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </button>
  );
}

export function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, search]);

  return null;
}
