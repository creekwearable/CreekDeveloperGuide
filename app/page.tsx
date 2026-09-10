import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/zh-CN/docs?platform=Overview');
}
