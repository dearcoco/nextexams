'use client'

import { signUpWidthCredentials } from "@/actions/authActions";
import Button from "../global/Button";
import Form from "../global/Form";

export default function SignUp() {
    
    return(
        <div>
            <h2>Sign up</h2>
            <Form action={handleSignUpCredentials} style={{margin: '20px 0'}}>
                <input type="text" name="name" placeholder="Name" required/>
                <input type="text" name="email" placeholder="Email" required/>
                <input type="password" name="password" placeholder="Password" required/>
                <Button value="Register" />
            </Form>
        </div>
    );
}

async function handleSignUpCredentials(formData: FormData) {
    const name = formData.get('name')!.toString();
    const email = formData.get('email')!.toString();
    const password = formData.get('password')!.toString();

    //console.log({name, email, password})
    const res = await signUpWidthCredentials({name, email, password});
    alert(res);
}