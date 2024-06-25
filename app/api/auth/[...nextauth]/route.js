import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          let username = profile.name.replace(/\s+/g, "").toLowerCase(); // Remove spaces and convert to lowercase
          if (username.length < 8) {
            username = username.padEnd(8, "0"); // Ensure the username is at least 8 characters
          } else if (username.length > 20) {
            username = username.slice(0, 20); // Trim to a maximum of 20 characters
          }

          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
