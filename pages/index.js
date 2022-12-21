import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function Home() {
  // const {data:session} = useSession();
  const session = useSession();

  console.log(session);
  if (session.loading) {
    console.log(session.data.user);
    console.log(session.data.expires);
  }
  const router = useRouter();
  if (session.status == "loading") {
    return <p>Loading...</p>;
  }

  if (session.status == "unauthenticated") {
    console.log("NO SESSION");
    router.push("/auth/signin");
  } else if (session.status == "authenticated") {
    return (
      <>
        <Head>
          <title>Facebook clone</title>
        </Head>
        <main>
          <p>
            Welcome <b>{session.data.user.name}</b>
          </p>
        </main>
      </>
    );
  }
}

export async function getServerSideProps(context) {
  return {
    props: {
      hi: "Red",
    }, // will be passed to the page component as props
  };
}
