'use client'

import { useRouter, useSearchParams } from "next/navigation";
//import { useRouter } from "next/router";

export default function Errors() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const errMsg = searchParams.get('error');

    return (
        <div>
            <h1 style={{color: 'red'}}>Errors: {errMsg}</h1>
            <button onClick={()=>router.back()}>Try again</button>
        </div>
        
    );
} 