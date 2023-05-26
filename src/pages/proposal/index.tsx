import Image from 'next/image';

const Proposal = () => {
  return (
    <main>
      <section>
        <div style={{ height: 600 }}>
          <Image
            className="object-center object-cover z-1"
            src="/proposal/Desktop_Proposal_kv.png"
            alt="kv"
            fill
            sizes="100vw"
          />
        </div>
      </section>
      <section></section>
      <section></section>
      <section></section>
    </main>
  );
};

export default Proposal;
