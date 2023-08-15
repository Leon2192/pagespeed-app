module.exports = {
    // Otras opciones de configuración aquí
    async rewrites() {
        return [
            {
                source: '/service-worker.js',
                destination: '/_next/static/service-worker.js',
            },
        ];
    },
};
