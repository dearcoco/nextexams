'use client'

import { updateUser } from "@/actions/authActions";
import Form from "../global/Form";
import Button from "../global/Button";

const ProfileUpdate = ({update}: {update: any}) => {
    async function handleUpdateProfile(formData: FormData) {
        const name = formData.get('name')!.toString();
        const image = formData.get('image')!.toString();

        if (update) {
            await update({name, image});
        }
        const msg = await updateUser({name, image});
        alert(msg);
    }
    
    return (
        <div>
            <h2>Update Profile</h2>
            <Form action={handleUpdateProfile} style={{margin: '20px 0'}}>
                <input type="text" name="name" placeholder="Name" required/>
                <input type="text" name="image" placeholder="Image" required/>
                <Button value="Update profile" />
            </Form>
        </div>
    );
}

export default ProfileUpdate;