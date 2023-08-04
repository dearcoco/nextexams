'use client'

import ProfileComponent from "@/components/profile";
import { IUser } from "@/models/userModel";
import { useSession } from "next-auth/react";

export default function ProfileClientPage() {
    const {data: session} = useSession();
    
    const user = session!.user as IUser;
    return (
        <div>
            <h1 style={{color: 'red'}}>Profile Client Side</h1>
            <ProfileComponent user={user} />
        </div>
    );
}