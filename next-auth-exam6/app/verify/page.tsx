import { verifyWidthCredentials } from "@/actions/authActions";


export default async function VerifyPage({searchParams: {token}}: {searchParams: {token: string}}) {
    const res = await verifyWidthCredentials({token});
    
    return (
        <div>verify page</div>
    );
}