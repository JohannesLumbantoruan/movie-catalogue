import 'regenerator-runtime';
// import CacheHelper from './utils/cache-helper';

// Manually Caching
// const assetsToCache = [
//     './',
//     './icons/icon-72x72.png',
//     './icons/icon-96x96.png',
//     './icons/icon-128x128.png',
//     './icons/icon-144x144.png',
//     './icons/icon-152x152.png',
//     './icons/icon-192x192.png',
//     './icons/icon-384x384.png',
//     './icons/icon-512x512.png',
//     './index.html',
//     './favicon.png',
//     './app.bundle.js',
//     './app.webmanifest',
//     './sw.bundle.js'
// ];

// self.addEventListener('install', (event) => {
//     event.waitUntil(CacheHelper.cachingAppShell(assetsToCache));
// });

// self.addEventListener('active', (event) => {
//     event.waitUntil(CacheHelper.deleteOldCache());
// });

// self.addEventListener('fetch', (event) => {
//     event.respondWith(CacheHelper.revalidateCache(event.request));
// });

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

const themoviedbApi = new Route(
    ({ url }) => url.href.startsWith('https://api.themoviedb.org/3/'),
    new StaleWhileRevalidate({
        cacheName: 'themoviedb-api'
    })
);

const themoviedbImageApi = new Route(
    ({ url }) => url.href.startsWith('https://image.tmdb.org/t/p/w500/'),
    new StaleWhileRevalidate({
        cacheName: 'themoviedb-image-api'
    })
);

registerRoute(themoviedbApi);
registerRoute(themoviedbImageApi);

self.addEventListener('install', () => {
    console.log('Service Worker: installed');

    self.skipWaiting();
});

self.addEventListener('push', (event) => {
    console.log('Service Worker: Pushed');

    const notificationData = {
        title: 'Push Notification',
        options: {
            body: 'This is a push notification',
            icon: './favicon.png',
            image: './icons/icon-512x512.jpg'
        }
    };

    const showNotification = self.registration.showNotification(
        notificationData.title,
        notificationData.options
    );

    event.waitUntil(showNotification);
});