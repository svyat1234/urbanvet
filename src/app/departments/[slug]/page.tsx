import { DEPARTMENTS } from '@/lib/constants';
import { notFound } from 'next/navigation';
import DepartmentPageContent from './DepartmentPageContent';

interface DepartmentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(DEPARTMENTS).map((slug) => ({
    slug,
  }));
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { slug } = await params;
  const departmentPage = DEPARTMENTS[slug];
  if (!departmentPage) notFound();

  return <DepartmentPageContent slug={slug} departmentPage={departmentPage} />;
}
