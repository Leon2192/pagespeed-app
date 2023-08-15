'use client'
import React, { useEffect, useState } from 'react';
import countriesData from '../db/countries.json';
import './Landing.css';

export default function Landing() {
    const countries = countriesData.countries;

    const [countrySpeeds, setCountrySpeeds] = useState({});
    const [countryStatus, setCountryStatus] = useState({});

    useEffect(() => {
        async function fetchPageSpeeds() {
            const speeds = {};
            const statuses = {};

            for (const country of countries) {
                statuses[country.name] = 'loading';
                try {
                    const start = performance.now();
                    const response = await fetch(country.url);
                    await response.text();
                    const end = performance.now();
                    const pageSpeed = end - start;
                    speeds[country.name] = pageSpeed;
                    statuses[country.name] = 'success';
                } catch (error) {
                    console.error('Error fetching page speed:', error);
                    speeds[country.name] = null;
                    statuses[country.name] = 'error';
                }
            }

            setCountrySpeeds(speeds);
            setCountryStatus(statuses);
        }

        fetchPageSpeeds();
    }, []);

    return (
        <div className="min-h-screen bg-sky-900 text-white flex flex-col justify-center items-center py-12 px-4 font-sans">
            <img
                src="/logosbox.png"
                alt="SBOX Logo"
                className="mb-8"
                style={{ maxWidth: '200px' }}
            />
            <h3 className="text-4xl font-bold mb-8 text-center">Velocidad de carga de aplicaciones</h3>
            <div className="flex flex-wrap justify-center md:justify-start">
                {countries.map((country) => (
                    <div
                        key={country.name}
                        className="flex flex-col items-center mx-4 my-6"
                    >
                        <h2 className="text-xl font-semibold mb-2">{country.name}</h2>
                        <div className="relative">
                            <div
                                className={`w-4 h-4 rounded-full absolute ${countryStatus[country.name] === 'success'
                                        ? 'bg-gradient-to-r from-green-400 to-blue-500'
                                        : countryStatus[country.name] === 'loading'
                                            ? 'bg-gradient-to-r from-orange-400 to-yellow-500'
                                            : 'bg-gradient-to-r from-red-400 to-pink-500'
                                    }`}
                                style={{
                                    bottom: '-18px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                }}
                            ></div>
                            <div
                                className="w-32 h-32 bg-white rounded-full flex justify-center items-center mb-2"
                                style={{
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={country.avatar}
                                    alt={country.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="text-xl font-bold" style={{ marginTop: '25px' }}>
                            {country.url && (
                                <div>
                                    {countrySpeeds[country.name] !== undefined ? (
                                        countrySpeeds[country.name] !== null ? (
                                            `${countrySpeeds[country.name].toFixed(2)} ms`
                                        ) : (
                                            'Error'
                                        )
                                    ) : (
                                        'Cargando...'
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
