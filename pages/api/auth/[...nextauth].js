import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "../../../utils/dbConnect";
import Users from "../../../models/Users";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../lib/mongodb";
import { hash, compare } from "bcryptjs";
import dbConnect from "../../../utils/dbConnect";
dbConnect();

const authOptions = {
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

            return {
              result,
              name: result.username,
              email: result.email,
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
  // async jwt({ token, user }) {
  //   if (user) {
  //     console.log("user in jwt", user);
  //     console.log(user.theObj.id, "id in jwt data");
  //     token.id = user.theObj.id;
  //     token.name = user.theObj.name;
  //     token.email = user.theObj.email;
  //     console.log("token in jwt", token);
  //   }
  //   return token;
  // },
  //   session: async ({ session, user, token }) => {
  //     if (session && user && token) {
  //       console.log(token, "token");
  //       console.log(user, "user in session");
  //       session.id = user.id;
  //       session.name = user.name;
  //       session.dataa = user;
  //       session.email = user.email;
  //       console.log(session, "sess");
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

// export const getServerSideProps = (context) => {
//   console.log(context);
// };
