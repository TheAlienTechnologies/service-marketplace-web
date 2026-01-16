import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  readonly withLink?: boolean;
  readonly className?: string;
  readonly showText?: boolean;
}

export function Logo({
  withLink = true,
  className = "",
  showText = true,
}: LogoProps) {
  const logoContent = (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/assets/logo/logo.svg"
        alt="Pavodah Logo"
        width={32}
        height={32}
        className="w-8 h-8"
      />
      {showText && (
        <span className="ml-2 text-xl font-bold text-green-600">Pavodah</span>
      )}
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" className="flex items-center">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
