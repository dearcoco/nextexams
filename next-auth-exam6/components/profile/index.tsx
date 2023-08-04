'use client'

import { IUser } from "@/models/userModel";
import ProfileCard from "./profileCard";
import ProfileUpdate from "./profileUpdate";
import { useSession } from "next-auth/react";

const ProfileComponent = ({user}: {user: IUser}) => {
    //console.log({user});
    const {data: session, update} = useSession();
    //const u: (data?: any)=> Promise<Session | null> = update;
    console.log({session})
    return (
        <div>
            <ProfileCard user={ session?.user as IUser || user} />
            <ProfileUpdate update={update} />
        </div>
    );
}
 
export default ProfileComponent;