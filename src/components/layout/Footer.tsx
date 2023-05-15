import Link from 'next/link';
import Image from 'next/image';
import clsxm from '@/lib/clsxm';

import { Button, Typography } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="bg-gray-light">
      <div className="max-w-screen-xl mx-auto px-5 pt-20 pb-10">
        <div
          className={clsxm(
            'flex flex-col items-center md:items-start md:flex-row md:justify-between md:space-x-5',
            'mb-10',
          )}
        >
          <div
            className={clsxm(
              'w-full md:w-4/5',
              'flex flex-col items-center md:items-start md:flex-row md:space-x-20',
              'text-center md:text-start',
            )}
          >
            <div className="shrink-0 mb-5 md:mb-0">
              <Link href={'/'}>
                <Image src={'/logo@2x.png'} alt={'募質部 Mujibu logo'} width={128} height={48} />
              </Link>
            </div>
            <div className="mb-5 md:mb-0">
              <Typography component="p" variant="caption" className="mb-3">
                關於
              </Typography>
              <div className="flex flex-col">
                <Link
                  className="text-secondary-66 no-underline hover:text-secondary visited:text-secondary-66 mb-3"
                  href={'/aboutus'}
                >
                  <Typography component="p" variant="caption">
                    關於我們
                  </Typography>
                </Link>
                <Link
                  className="text-secondary-66 no-underline hover:text-secondary visited:text-secondary-66 mb-3"
                  href={'/aboutus#contact'}
                >
                  <Typography component="p" variant="caption">
                    聯繫我們
                  </Typography>
                </Link>
              </div>
            </div>
            <div className="mb-5 md:mb-0">
              <Typography component="p" variant="caption" className="mb-3">
                支援
              </Typography>
              <div className="links flex flex-col">
                <Link
                  className="text-secondary-66 no-underline hover:text-secondary visited:text-secondary-66 mb-3"
                  href={'/user-terms'}
                >
                  <Typography component="p" variant="caption">
                    服務條款
                  </Typography>
                </Link>

                <Link
                  className="text-secondary-66 no-underline hover:text-secondary visited:text-secondary-66 mb-3"
                  href={'/user-privacy'}
                >
                  <Typography component="p" variant="caption">
                    隱私權政策
                  </Typography>
                </Link>

                <Link
                  className="text-secondary-66 no-underline hover:text-secondary visited:text-secondary-66 mb-3"
                  href={'/faq'}
                >
                  <Typography component="p" variant="caption">
                    幫助中心
                  </Typography>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col shrink-0 items-center md:items-start">
            <Typography component="p" variant="caption" className="mb-3 text-start">
              追蹤我們
            </Typography>
            <div className="flex space-x-4">
              <Button
                onClick={() => window.open('https://www.facebook.com/mujibu', '_ blank')}
                variant="outlined"
                color="secondary"
                className="p-[6px] min-w-0"
                aria-label="facebook"
              >
                <Facebook />
              </Button>
              <Button
                onClick={() => window.open('https://line.me/R/ti/p/mujibu', '_ blank')}
                variant="outlined"
                color="secondary"
                className="p-[6px] min-w-0 mr-5"
                aria-label="line"
              >
                <svg width="24" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.75 8.49023C13.75 8.39648 13.6562 8.30273 13.5625 8.34961H13.0469C12.9531 8.34961 12.9062 8.39648 12.9062 8.49023V10.459L11.3594 8.39648C11.3594 8.34961 11.3125 8.34961 11.2656 8.34961H10.7031C10.6094 8.34961 10.5625 8.39648 10.5625 8.49023V11.8184C10.5625 11.9121 10.6094 11.959 10.7031 11.959H11.2656C11.3125 11.959 11.4062 11.9121 11.4062 11.8184V9.84961L12.9062 11.9121C12.9531 11.9121 13 11.959 13.0469 11.959H13.5625C13.6562 11.959 13.75 11.9121 13.75 11.8184V8.49023ZM9.90625 8.30273H9.34375C9.25 8.30273 9.20312 8.39648 9.20312 8.49023V11.8184C9.20312 11.9121 9.25 11.959 9.34375 11.959H9.90625C9.95312 11.959 10.0469 11.9121 10.0469 11.8184V8.49023C10.0469 8.39648 9.95312 8.30273 9.90625 8.30273ZM8.59375 11.1152H7.14062V8.49023C7.14062 8.39648 7.09375 8.30273 7 8.30273H6.4375C6.39062 8.30273 6.29688 8.39648 6.29688 8.49023V11.8184C6.29688 11.8652 6.34375 11.8652 6.34375 11.9121C6.39062 11.9121 6.39062 11.959 6.4375 11.959H8.59375C8.6875 11.959 8.73438 11.8652 8.73438 11.8184V11.2559C8.73438 11.209 8.6875 11.1152 8.59375 11.1152ZM16.5625 8.30273H14.4062C14.3125 8.30273 14.2656 8.39648 14.2656 8.49023V11.8184C14.2656 11.8652 14.3125 11.959 14.4062 11.959H16.5625C16.6094 11.959 16.7031 11.9121 16.7031 11.8184V11.2559C16.7031 11.209 16.6094 11.1152 16.5625 11.1152H15.1094V10.5527H16.5625C16.6094 10.5527 16.7031 10.5059 16.7031 10.4121V9.84961C16.7031 9.80273 16.6094 9.70898 16.5625 9.70898H15.1094V9.14648H16.5625C16.6094 9.14648 16.7031 9.09961 16.7031 9.00586V8.49023C16.7031 8.39648 16.6094 8.30273 16.5625 8.30273ZM22 4.22461C22 2.11523 20.2656 0.427734 18.2031 0.380859H4.79688C2.6875 0.380859 1 2.11523 1 4.17773V17.584C0.953125 19.6934 2.6875 21.3809 4.79688 21.3809H18.1562C20.2656 21.4277 21.9531 19.6934 22 17.584V4.22461ZM19.0938 9.99023C19.0938 11.3496 18.5781 12.5684 17.4531 13.7871C15.8594 15.6621 12.25 17.9121 11.4531 18.2402C10.6094 18.5684 10.75 18.0059 10.7969 17.8184C10.9844 16.5996 11.0781 16.2715 10.1875 16.084C6.53125 15.6152 3.8125 13.0371 3.8125 9.99023C3.8125 6.56836 7.23438 3.75586 11.4531 3.75586C15.6719 3.75586 19.0938 6.56836 19.0938 9.99023Z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
              <Button
                onClick={() => window.open('https://instagram.com/mujibu', '_ blank')}
                variant="outlined"
                color="secondary"
                className="p-[6px] min-w-0"
                aria-label="instagram"
              >
                <Instagram />
              </Button>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Typography component="p" variant="caption" className="text-secondary-30">
            Copyright © 募質部 Mujibu {new Date().getFullYear()} All right reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
