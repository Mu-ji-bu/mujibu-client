import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Seo from '@/components/Seo';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.back();
      //   router.push("/");
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Seo templateTitle="404" />
      <div className="not-found">
        <h1>Oooops...</h1>
        <h2>That page cannot be found.</h2>
        <p>
          Go back to the <Link href="/">Homepage</Link>
        </p>
      </div>
    </>
  );
};

export default NotFound;
