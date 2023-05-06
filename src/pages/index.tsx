import Button from '@mui/material/Button';
import Seo from '@/components/Seo';

export default function Home() {
  return (
    <>
      <Seo templateTitle="Home" />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>木質部，募質部。</h1>
        <Button variant="outlined">Hello World</Button>
      </main>
    </>
  );
}
