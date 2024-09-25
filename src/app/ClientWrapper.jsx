"use client";

import React, { useEffect, useState } from "react";
import { GlobalContextProvider } from "../../context/store";
import Header from './components/header/page';
import Footer from './components/footer/page';
import WhatsApp from './components/whatsapp/page';


export default function ClientWrapper({ children }) {
   const [isStudio, setIsStudio] = useState(false);

   useEffect(() => {
      if (typeof window !== "undefined") {
         setIsStudio(window.location.pathname.startsWith("/studio"));
      }
   }, []);

   return (
      <GlobalContextProvider>
         {!isStudio && <Header />}
         <div className={isStudio ? "w-full" : ""}>{children}</div>
         {!isStudio && <WhatsApp />}
         {!isStudio && <Footer />}
      </GlobalContextProvider>
   );
}
