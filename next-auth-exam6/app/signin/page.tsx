import SignIn from "@/components/auth/SignIn";

export default function SignInPage({searchParams}: {searchParams: {callbackUrl: string}}) {
    //console.log(searchParams);
    console.log('1 sign in');
    const callbackUrl = searchParams?.callbackUrl;
    return (
        <SignIn callbackUrl={callbackUrl || "/"} />
    );
}