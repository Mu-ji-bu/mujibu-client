import Head from "next/head";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Mujibu | Home</title>
        <meta name="keywords" content="mujibu"></meta>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>木質部，募質部。</h1>
      </main>
    </>
  );
}
