import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/User";
import connectDB from "@/db/connectDb";

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github" || account.provider == "google" || account.provider == "facebook") {
        //connect to DB
        await connectDB();

        //check if user already exists in database
        const currentUser = await User.findOne({ username: (account.provider == "github")? "_" + user.email.split('@')[0] : user.email.split('@')[0] });
        if (!currentUser) {
          //create a new user
          const newUser = await User.create({
            email: user.email,
            username: (account.provider == "github")? "_" + user.email.split('@')[0] : user.email.split('@')[0],
          });

          user.name = newUser.username;
        }
        else {
          user.name = currentUser.username;
        }

      }
      return true;
    }
  },

  async session({ session, user, token }) {
    const dbUser = await User.findOne({ username: (account.provider == "github")? "_" + user.email.split('@')[0] : user.email.split('@')[0]  });
    session.user.name = dbUser.username;
    return session
  },
})

export { authoptions as GET, authoptions as POST }