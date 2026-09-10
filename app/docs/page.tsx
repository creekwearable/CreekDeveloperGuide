import { redirect } from 'next/navigation';

export default function DocsRedirectPage() {
  redirect('/zh-CN/docs?platform=Overview');
}
