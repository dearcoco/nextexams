'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProtectedComponent from "@/components/Protected";
import { IUser } from "@/models/userModel";
import { getServerSession } from "next-auth";

export default async function ProtectedServerPage() {
    const session = await getServerSession(authOptions);
    return (
        <div>
            <h1> This is a 
                <i style={{color: 'red'}}>Server-Side</i> protected page 
            </h1>
            <ProtectedComponent user={session?.user as IUser} />
        </div>
    );
}