import './globals.css';
import { GlobalContextProvider } from '../../context/store';

export default function RootLayout({
  children,
}) 

{
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  )
}