import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "../../../utils/dbConnect";
import Users from "../../../models/Users";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../lib/mongodb";
import { hash, compare } from "bcryptjs";
import dbConnect from "../../../utils/dbConnect";
dbConnect();

export const authOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        console.log("Starting");

        const result = await Users.findOne({ email: credentials.email });
        console.log("authorizing");
        if (!result) {
          console.log("email not registered");
        } else {
          const checkPassword = await compare(
            credentials.password,
            result.password
          );
          if (!checkPassword) {
            console.log("incorrect pass");
            return;
          } else {
            console.log("coorrect pass");
            console.log("returning");
            console.log(result._id);
            return {
              name: result._id,
              email: {
                email: result.email,
                id: result._id,
              },
              id: result._id,
            };
          }
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
    // error:   "ERROR PAGE"
    // signout  "SIGN OUT PAGE"
  },
  // database: process.env.MONGODB_URL,

  // callbacks: {
  //   async signIn({ user }) {
  //     console.log(user, "signin user");
  //     return true;
  //   },
  //   jwt: async ({ token, user }) => {
  //     if (user) {
  //       console.log("user in jwt", user);
  //       console.log("token in jwt", token);
  //     }
  //     return token;
  //   },
  //   async jwt({ token, user }) {
  //     if (user) {
  //       console.log("user in jwt", user);
  //       token.id = user.result._id;
  //       console.log("token in jwt", token);
  //     }
  //     console.log(token);
  //     return token;
  //   },
  //   session: async ({ session, user, token }) => {
  //     if (session && user && token) {
  //       console.log(token, "token");
  //       console.log(user, "user in session");
  //       console.log(session, "sess");
  //       // token.id = session.user.id;
  //       session.user.id = token.id;
  //       console.log(session);
  //     }
  //     return session;
  //   },
  // },
  session: {
    strategy: "jwt",
  },
  // secret: "XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=",
};

export default NextAuth(authOptions);
