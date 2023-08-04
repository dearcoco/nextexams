'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User, { IUser } from "@/models/userModel";
import { getServerSession } from "next-auth";
import {redirect} from 'next/navigation';
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from "@/utils/token";
import { sendEmail } from "@/utils/sendEmail";

const Base_Url = process.env.NEXTAUTH_URL;

export async function updateUser({name, image}: {name: string, image: string}): Promise<string> {
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        throw new Error('Unauthorization!');
    }
    const user = session.user as IUser;
    try {

        const res = await User
            .findByIdAndUpdate(user._id, {name, image}, {new: true})
            .select('-password');
        
        if (!res) {
            throw new Error('Email does not exist!');
        }
        return 'Update profile Successfully!';
    }
    catch(error: any) {
        redirect(`/errors?error=${error.message}`);
    }
}

export async function signUpWidthCredentials({name, email, password}: {name: string, email: string, password: string}): Promise<string> {
    try {
        const user = await User.findOne({email});
        if (user) {
            throw new Error('Email already exists!');
        }
        if (password) {
            password = await bcrypt.hash(password, 12);
        }
        const token = generateToken({name, email, password});

        const url = `${Base_Url}/verify?token=${token}`;
        await sendEmail({
            to: email,
            url,
            text: 'Verify Email'
        });

        return 'Sign up success! Check your email to complete the registration.';
    }
    catch(error: any) {
        redirect(`/errors?error=${error.message}`);
    }
}

export async function verifyWidthCredentials({token}: {token: string}): Promise<string> {
    try {
        const verified = verifyToken(token);
        const msg = 'Verify Success!';
        const userExist = await User.findOne({email: verified.email});
        if (userExist) {
            return msg;
        }
        const newUser = new User({
            name: verified.name,
            email: verified.email,
            password: verified.password
        });
        //console.log({newUser});
        await newUser.save();

        return msg;
    }
    catch(error: any) {
        redirect(`/errors?error=${error.message}`);
    }
}