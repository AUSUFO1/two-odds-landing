import localFont from 'next/font/local';

export const noyh = localFont({
  src: [
    {
      path: '../public/fonts/noyh/noyhgeometric-light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/noyh/noyhgeometric-semilight.otf',
      weight: '350',
      style: 'normal',
    },
    {
      path: '../public/fonts/noyh/noyhgeometric-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/noyh/noyhgeometric-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/noyh/noyhgeometric-bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/noyh/noyhgeometric-italic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-noyh',
  display: 'swap',
});
