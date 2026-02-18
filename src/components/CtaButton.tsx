import styles from '@/components/CtaButton.module.css'

interface CtaButtonProps {
  href: string;
  label: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function CtaButton({ href, label, className = '', onClick }: CtaButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`flex items-center gap-[4px] h-[2.625rem] w-fit ${className} ${styles.button}`}
    >
      <span className="text-[0.875rem] text-white font-medium bg-[#1D1D1D] flex items-center justify-center px-[1.875rem] h-full rounded-[100px]">
        {label}
      </span>
      <svg height="100%" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 0C32.598 0 42 9.40202 42 21C42 32.598 32.598 42 21 42C9.40202 42 0 32.598 0 21C0 9.40202 9.40202 0 21 0ZM13.7754 13.2051C12.9025 13.2051 12.1944 13.9123 12.1943 14.7852C12.1943 15.6581 12.9025 16.3662 13.7754 16.3662L24.1836 16.3652L13.668 26.8818C13.0507 27.4991 13.0507 28.5 13.668 29.1172C14.2852 29.7343 15.2851 29.7343 15.9023 29.1172L26.4189 18.6006V29.0098C26.4189 29.8827 27.1271 30.5908 28 30.5908C28.8728 30.5907 29.5801 29.8826 29.5801 29.0098V14.7852C29.5801 13.9124 28.8727 13.2053 28 13.2051H13.7754Z"
          fill="#1D1D1D"
        />
      </svg>
    </a>
  );
}
