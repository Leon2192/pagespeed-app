'use client'
import Image from 'next/image'
import Landing from './components/Landing'
import React, { useEffect } from 'react';


export default function Home() {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registrado con éxito:', registration);
        })
        .catch((error) => {
          console.error('Error al registrar el Service Worker:', error);
        });
    }
  }, []);

  return (
    <Landing />
  )
}
