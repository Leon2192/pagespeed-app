'use client'
import React, { useEffect, useState } from 'react';
import Landing from './components/Landing';

export default function Home() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");

      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();

        setShowBanner(true);

        event.prompt();
        event.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("El usuario aceptó instalar la PWA");
          } else {
            console.log("El usuario rechazó la instalación de la PWA");
          }
        });
      });
    }
  }, []);

  return (
    <>
      <Landing />
      {showBanner && (
        <div
          id="install-banner"
          className="fixed bottom-0 left-0 w-full bg-blue-700 text-white p-2 text-center cursor-pointer flex items-center justify-center"
          style={{
            backgroundColor: "#00509e",
            color: "white",
            padding: "10px",
            textAlign: "center",
            cursor: "pointer",
            zIndex: "1000",
            transition: "opacity 0.5s",
            opacity: "0.9",
          }}
        >
          <img
            src="/logosbox.png"
            alt="Logo SBox"
            className="w-6 h-6 mr-2"
            style={{ alignSelf: "center" }}
          />
          Instalar esta aplicación
        </div>
      )}
      <style jsx>
        {`
          @media (max-width: 900px) {
            #install-banner {
              display: flex; /* Mostrar en dispositivos móviles */
            }
          }
        `}
      </style>
    </>
  );
}
