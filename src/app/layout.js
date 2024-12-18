import './globals.css';
import { GlobalContextProvider } from '../../context/store';
import favicon from '../../public/favicon.ico';
// import 'https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap';
import { Karla } from 'next/font/google';
import Header from './components/header/page';
import Footer from './components/footer/page';
import WhatsApp from './components/whatsapp/page';
import ClientWrapper from './ClientWrapper';

const inter = Karla({ weight: '400', subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <title>Zingoni Propiedades</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        />
        <link
          rel='shortcut icon'
          href={favicon.src}
        />
      </head>
      <body className={`${inter.className} `}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
