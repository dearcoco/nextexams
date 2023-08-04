'use client'
import ProtectedComponent from '@/components/Protected';
import { IUser } from '@/models/userModel';
import { useSession } from 'next-auth/react';

export default function ProtectedClientPage() {
    const {data: session} = useSession();
    //console.log(session);  
    return (
        <div>
            <h1> This is a 
                <i style={{color: 'red'}}>Client-Side</i> protected page 
            </h1>
            <ProtectedComponent user={session?.user as IUser} />
        </div>
    );
}