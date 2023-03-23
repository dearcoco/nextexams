'use client'

import { useRouter } from 'next/navigation';
import {useState} from "react"
import { signIn, getProviders, useSession } from 'next-auth/react'
import { Alert, Button, Grid, Link, TextField } from '@mui/material'


export default function Login({ children }: { children: React.ReactNode}) {
    const [authState, setAuthState] = useState({
        email: '',
        password: ''
    })
    const [pageState, setPageState] = useState({
        error: '',
        processing: false
    })
    
    const router =  useRouter();
    const {data: session} = useSession();
    if (session) {
        console.log('session', session);
        router.push('/');
    }
    


    // const providers = await getProviders();
    // console.log(providers);
    const handleFieldChange = (e: any) => {
        setAuthState(old => ({ ...old, [e.target.id]: e.target.value }))
    }

    const simplifyError = (error: string) => {
        return error === "CredentialsSignin" 
            ? "Invalid username or password" 
            : "Unknown error occurred";
    }

    const handleAuth = async () => {
        setPageState(old => ({...old, processing: true, error: ''}));

        try {
            let res = await signIn('credentials', {...authState, redirect: false});
            if (!res) {
                throw new Error('singIn return undefined');
            }

            if (res && res.ok) {
                // Authenticate user
                console.log(res);
                router.push("/");
            } else {
                setPageState(old => ({ ...old, processing: false, error: res!.error! }));
            }            
        }
        catch (error: any) {
            console.log(error);
            setPageState(old => ({...old, processing: false, error: error.message ?? "Something went wrong!"}));
        }

    }

    return (
        <Grid container alignItems='center' justifyContent='center' height='100vh' maxWidth='400px'>
            <Grid item>
                {
                    pageState.error !== '' && <Alert severity='error' sx={{mb: 2}}>{simplifyError(pageState.error)}</Alert>
                }
                <TextField sx={{ mb: 1 }} onChange={handleFieldChange} value={authState.email} fullWidth label="Email" id='email' />
                <TextField sx={{ mb: 1 }} onChange={handleFieldChange} value={authState.password} fullWidth label="Password" type='password' id='password' />
                <Button disabled={pageState.processing} sx={{ mb: 1 }} onClick={handleAuth} fullWidth variant='contained'>Login</Button>
                <Button sx={{ mb: 1 }} onClick={()=>signIn('google')}  fullWidth variant='outlined'>Google Login</Button>
                <Button sx={{ mb: 1 }} onClick={()=>signIn('github')} fullWidth variant='outlined'>Github Login</Button>
            </Grid>
        </Grid>
    )
  }
  