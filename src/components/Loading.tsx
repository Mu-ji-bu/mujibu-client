import { Loop } from '@mui/icons-material';
import Image from 'next/image';
const Loading = ({ className = null }) => {
  return (
    <div className={`h-screen w-screen flex flex-col justify-center items-center -mt-[64px] ${className}`}>
      <div className="aspect-square">
        <Image
          property="true"
          className="w-full h-full object-cover"
          alt="logo"
          width={300}
          height={300}
          src={
            'https://firebasestorage.googleapis.com/v0/b/mujibu.appspot.com/o/images%2Fd0973a22-4c94-4425-b236-4afba1291edd.png?alt=media&token=6357cdce-a7d2-4298-a696-851f56dda0c8&_gl=1*y91kbu*_ga*MTEzNjI0ODExLjE2ODU3NjQ0MzQ.*_ga_CW55HF8NVT*MTY4NTgwNzMzOS41LjAuMTY4NTgwNzMzOS4wLjAuMA..'
          }
        />
      </div>
      <div className="flex justify-center items-center">
        <Loop className="animate-spin mr-2" />
        Loading...
      </div>
    </div>
  );
};

export default Loading;
