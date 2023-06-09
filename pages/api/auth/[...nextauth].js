import NextAuth from "next-auth";
import bcrypt from "bcrypt";

import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import db from "@/utils/db";
import clientPromise from "./lib/mongodb";
import User from "@/models/User";

db.connectDb();

const SignInUser = async ({ password, user }) => {
  if (!password) {
    throw new Error("Password is required");
  }
  const testPassword = await bcrypt.compare(password, user.password);

  if (!testPassword) {
    throw new Error("Email or password is incorrect");
  }

  return user;
};

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const email = credentials.email;
        const password = credentials.password;

        const user = await User.findOne({ email });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT

          return await SignInUser({ password, user });
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("Incorrect email.");

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  secret: process.env.JWT_SECRET,

  callbacks: {
    async session({ session, token }) {
      let user = await User.findById(token.sub);

      session.user.id = token.sub || user._id.toSting();
      session.user.role = user.role || "user";
      token.role = user.role || "user";
      // console.log(token);
      return session;
    },

    // async signIn(user, account, profile) {
    //   const existingUser = await User.findOne({ email: user.email });

    //   if (!existingUser) {
    //     const newUser = new User({
    //       email: user.email,
    //       // Add any other necessary fields
    //     });

    //     await newUser.save();
    //   } else {
    //     // Link third-party provider account to existing user
    //     existingUser.providers = existingUser.providers || [];
    //     existingUser.providers.push({
    //       provider: account.provider,
    //       id: profile.id,
    //     });

    //     await existingUser.save();
    //   }

    //   // Allow the sign-in process to continue
    //   return true;
    // },
    // async jwt(token, user, account, profile, isNewUser) {
    //   if (user) {
    //     token.sub = user.id;
    //     const existingUser = await User.findById(user.id);
    //     token.role = existingUser.role || "user";
    //     // Add any other necessary fields to the token
    //   }

    //   return token;
    // },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    // strategy: "database",
  },
  // database: process.env.MONGODB_URI,
});
