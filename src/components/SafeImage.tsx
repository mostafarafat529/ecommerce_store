import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export default function SafeImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F2EDE4] to-[#E5DDD0] text-[#6E5F54] p-6 text-center"
        role="img"
        aria-label={alt}
      >
        <ShoppingBag className="w-8 h-8 mb-2 text-[#B89352]" strokeWidth={1.5} />
        <span className="text-xs font-medium text-[#2C211B]/80 line-clamp-2">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
