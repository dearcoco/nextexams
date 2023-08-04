import NextAuth, { Account, NextAuthOptions, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from '@/utils/database';
import User, { IUser } from '@/models/userModel';

connectDB();

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		}),
	],
	pages: {
		signIn: "/signin",
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			//console.log(account, profile);
			if (account?.type === 'oauth') {
				return await signInWithOAuth(account, profile!);
			}
			return true;
		},
		async jwt({ token, trigger, session }) {
			//console.log('01 jwt')
			if(trigger === 'update') {
				(token.user as any).name = session.name;
				(token.user as any).image = session.image;
			}
			else {
				const user = await getUserByEmail({email: token.email!});
				token.user = user;
			}

			return token;
		},
		async session({ session, token }) {
			//console.log('02 session')
			session.user = token.user!;
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

async function signInWithOAuth(
	account: Account | null, profile: Profile): Promise<boolean> {
	const user = await User.findOne({email: profile.email});
	if (user) {
		return true;
	}

	// if !user => sign up => sign in
	const newUser = new User({
		name: profile.name,
		email: profile.email,
		image: (profile as any).picture,
		provider: account!.provider
	});

	await newUser.save();
	//console.log({newUser});
	return true;
}

async function getUserByEmail({email}: {email: string}): Promise<IUser> {
	const user = await User.findOne({email}).select('-password');
	if (!user) {
		throw new Error('Email does not exist!');
	}

	return {...user._doc, _id: user._id.toString()} as IUser;
}