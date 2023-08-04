'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileComponent from "@/components/profile";
import { IUser } from "@/models/userModel";
import { getServerSession } from "next-auth";

export default async function ProfileServerPage() {
    const session = await getServerSession(authOptions);
    const user = session!.user as IUser;
    return (
        <div>
            <h1 style={{color: 'red'}}>Profile Server Side</h1>
            <ProfileComponent user={user}/>
        </div>
    );
}