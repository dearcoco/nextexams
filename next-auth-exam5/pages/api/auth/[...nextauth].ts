import NextAuth, {NextAuthOptions, User} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },	
	pages: {
		signIn: "/login"
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {label: 'Email', type: 'email', placeholder: 'user@host.com'},
				password: {label: 'Password', type: 'password'},
				role: {label: 'Role', type: 'text'}
			},
			async authorize(credentials): Promise<User | null> {
                if (!credentials) {
                    return null;
                }
				const id = '0';
				console.log('email', credentials.email);
				console.log('pass', credentials.password);
				if (credentials.email === "abc@abc.com") {
					return {...credentials, id};
				}
				return null;
			}
		}),
	
		GoogleProvider({
		  clientId: process.env.GOOGLE_ID!,
		  clientSecret: process.env.GOOGLE_SECRET!,
		}),      
		GithubProvider({
		  clientId: process.env.GITHUB_ID!,
		  clientSecret: process.env.GITHUB_SECRET!,
		}),

	],
	// callbacks: {
	// 	async jwt({token, user, account}) {
	// 		// Persist the OAuth access_token to the token right after signin
	// 		if (account) {
	// 			token.accessToken = account.access_token
	// 		}
	// 		if (user) {
	// 			token.userId = 'asddf';
	// 			token.roles = ['admin'];
	// 			// token.roles = user.roles ?? [];
	// 			// token.customerId = user.customerId;
	// 			// token.staffId = user.staffId;
	// 		}
	// 		return token;
	// 	},
	// 	async session({session, token}) {
	// 		// Send properties to the client, like an access_token from a provider.
	// 		//session.accessToken = token.accessToken as string;
	// 		// session.user = {...session.user, id: token.userId as string, roles: token.roles as Role[]};
	// 		//session.customerId = token.customerId as string;
	// 		//session.staffId = token.staffId as string;
	// 		//logger.verbose('serve session', {label: 'nextauth.session', data: {session}});
	// 		session.user = {...session.user};
	// 		return session;
	// 	}
	// },	
};

export default NextAuth(authOptions);