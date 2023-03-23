
import {Session} from 'next-auth';
import Login from './login-cl';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

async function getSession(cookie: string): Promise<Session> {
    const response = await fetch(
        `${process.env.LOCAL_AUTH_URL}/api/auth/session`, 
        { headers: { cookie, },});
  
    const session = await response.json();
    return Object.keys(session).length > 0 ? session : null;
}

export default async function page({ children }: { children: React.ReactNode}) {
    const session = await getSession(headers().get('cookie') ?? '');
    console.log(session);

    // oauth provider를 통한 로그인의 경우 여기서 홈으로 보낸다.
    if (session) {
        redirect('/');
    }

    return (
        <Login>{children}</Login>
    )
}
