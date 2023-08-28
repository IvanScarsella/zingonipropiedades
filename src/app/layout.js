import './globals.css';
import { GlobalContextProvider } from '../../context/store';
import favicon from "../../public/favicon.ico";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <title>Zingoni Propiedades</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="shortcut icon" href={favicon.src} />
        {/* Otros elementos head si los tienes */}
      </head>
      <body>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  )
}