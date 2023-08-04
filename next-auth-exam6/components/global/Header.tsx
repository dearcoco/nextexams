'use server'
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignOut from '../auth/SignOut';

export default async function Header() {
    const session = await getServerSession(authOptions);
    //console.log(session);
	return (
		<header style={{display: 'flex', gap: 30}}>
            <Link href="/">Home</Link>
            <Link href="/protected/client">protected (client)</Link>
            <Link href="/protected/server">protected (server)</Link>
            {
                session
                ? <>
                    <Link href="/profile/client">profile (client)</Link>
                    <Link href="/profile/server">profile (server)</Link>
                    <Link href="/dashboard">admin dashboard</Link>

                    <SignOut />
                </>
                : <Link href="/signin">SignIn</Link>
            }
        </header>
	)
}

