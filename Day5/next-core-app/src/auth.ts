import NextAuth, { CredentialsSignin } from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { loginUserSchema } from "./app/schemas/login-user-schema";

async function getUser(email: string): Promise<{ id: string, name: string, email: string, password: string } | undefined> {
    try {
        console.log(`Fetching details of: ${email}`);
        // Replace this with your own user fetching logic

        const user = { id: "1", name: "Manish", email: "manish@abc.com", password: "Manish@123" };
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                // console.log("credentials: ", credentials);
                const parsedCredentials = loginUserSchema.safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);

                    if (!user) {
                        throw new CredentialsSignin('User not found');
                    } else {
                        const passwordMatch = user.password === password;
                        if (passwordMatch) {
                            const { password, ...userWithoutPassword } = user;
                            return userWithoutPassword;
                        }
                    }
                }

                return null;
            }
        }),
    ],
    trustHost: true
});