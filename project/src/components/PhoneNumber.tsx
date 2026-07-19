import { Phone } from 'lucide-react';
import { useIsMobile } from '../lib/hooks';
import { BUSINESS_PHONE, BUSINESS_PHONE_RAW } from '../lib/seo';

interface PhoneNumberProps {
  className?: string;
  showIcon?: boolean;
  iconSize?: number;
  iconClassName?: string;
  showCallPrefix?: boolean;
  inline?: boolean;
}

export default function PhoneNumber({
  className = '',
  showIcon = false,
  iconSize = 18,
  iconClassName = '',
  showCallPrefix = false,
  inline = false,
}: PhoneNumberProps) {
  const isMobile = useIsMobile();
  const label = showCallPrefix ? `Call ${BUSINESS_PHONE}` : BUSINESS_PHONE;
  const icon = showIcon ? <Phone size={iconSize} className={`flex-none ${iconClassName}`} /> : null;
  const base = inline ? 'inline' : 'flex items-center gap-2';

  if (!isMobile) {
    return (
      <span className={`${base} ${className}`}>
        {icon}
        <span>{label}</span>
      </span>
    );
  }

  return (
    <a href={`tel:${BUSINESS_PHONE_RAW}`} className={`${base} ${className}`}>
      {icon}
      <span>{label}</span>
    </a>
  );
}
