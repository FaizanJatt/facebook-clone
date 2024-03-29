import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";
export default function Home({ user, posts }) {
  const session = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const togglePostModal = () => {
    setModalIsOpen((prev) => !prev);
  };

  const router = useRouter();
  if (session.status == "loading") {
    return <p>Loading...</p>;
  }

  if (session.status == "unauthenticated") {
    router.push("/auth/signin");
  } else if (session.status == "authenticated") {
    return (
      <div className="homepage">
        <Head>
          <title>Facebook clone</title>
        </Head>
        <Header user={user} />
        <div className="homepage-container">
          {modalIsOpen && (
            <CreatePost togglePostModal={togglePostModal} user={user} />
          )}
          <Sidebar user={user} />
          <main>
            <div className="main">
              <div className="main-top">
                <img
                  src={user.avatarImg}
                  className="main-avatarimg"
                  alt="main-avatarImg"
                />
                <p onClick={togglePostModal} className="main-q">
                  What&apos;s on your mind , {user.first} ?
                </p>
              </div>
              <hr></hr>
              <div className="main-photo">
                <i className="fa-regular fa-image"></i>
                <p>Add a Photo</p>
              </div>
            </div>
            <div className="posts-container">
              {posts && <Posts user={user} posts={posts} />}
            </div>
          </main>
        </div>
      </div>
    );
  }
}
export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (session) {
    const userId = session.user.email.id;
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_HomePage}/api/UsersApi/${userId}`,
      {
        method: "GET",
      }
    );
    const response = await data.json();
    const res = response.data[0];

    const getPosts = await fetch(
      `${process.env.NEXT_PUBLIC_HomePage}/api/UsersApi/posts`
    );
    const posts = await getPosts.json();
    const postsData = posts.data;

    postsData.sort(
      (a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime()
    );
    return {
      props: {
        user: res,
        posts: postsData,
      },
    };
  } else {
    return {
      props: {
        user: "guest",
      },
    };
  }
}
