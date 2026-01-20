import styles from './Heading.module.css';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function Heading({ 
  level = 2, 
  title, 
  subtitle,
  className 
}: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  return (
    <div className={`${styles.heading} ${className || ''} flex flex-col gap-10 max-w-200 items-start`}>
      {subtitle && (
        <span className={`section-sub text-center py-[0.71rem] px-6.75 border border-[#8E8E8E] rounded-4xl font-[0.875rem] leading-[90%] text-[#8E8E8E] uppercase`}>{subtitle}</span>
      )}
      <Tag className={`font-["Circe"] font-normal text-[3.75rem] uppercase leading-[100%]`}>{title}</Tag>
    </div>
  );
}