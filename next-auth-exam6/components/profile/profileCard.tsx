'use client'

import { IUser } from "@/models/userModel";
import Image from 'next/image';

const ProfileCard = ({user}: {user: IUser}) => {
    return (
        <div>
            <h2>Name: {user.name}</h2>
            {
                user.image &&
                <Image src={user.image} alt='avarta' width={100} height={100} />
            }
            <h2>Email: {user.email}</h2>
            <h4>Role: {user.role}</h4>
            <h4>Provider: {user.provider}</h4>
        </div>
    );
}

export default ProfileCard;