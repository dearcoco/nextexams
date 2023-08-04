'use client'
import {signIn} from 'next-auth/react';
import Link from 'next/link';

type SignInProps = {
    callbackUrl: string;
    
};
export default function SignIn({callbackUrl}: SignInProps) {
    //console.log('2 sign in')
    return(
        <div>
            <h2>Sign In with NextAuth</h2>
            <div style={{margin: '30px 0'}}>
                <button onClick={()=> signIn('google', {callbackUrl})}>
                    continue with google
                </button>
            </div>

            <div style={{margin: '30px 0'}}>
                <Link href="/signup">sign up</Link>
            </div>            
        </div>
    );
}
