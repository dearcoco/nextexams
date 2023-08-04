'use client'
import { IUser } from "@/models/userModel";
import { useSession } from "next-auth/react";

const ProtectedComponent = ({user}: {user: IUser}) => {
    const {data: session} = useSession();
    const suser = session?.user as IUser || user;
    return (
        <p>You are logged in as: <b>{suser.name}</b></p>
    );
}
 
export default ProtectedComponent;