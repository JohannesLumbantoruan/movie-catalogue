// import { Workbox } from 'workbox-window';

const swRegister = async () => {
    if (!('serviceWorker' in navigator)) {
        console.log('Service Worker not supported in the browser');

        return;
    }

    // Using navigator.serviceWorker.register
    // try {
    //     await navigator.serviceWorker.register('./sw.bundle.js');

    //     console.log('service worker registered');
    // } catch (error) {
    //     console.log('Failed to register service worker', error);
    // }

    // Using Workbox
    // const wb = new Workbox('./sw.bundle.js');

    // try {
    //     await wb.register();

    //     console.log('service worker registered');
    // } catch (error) {
    //     console.log('Failed to register service worker', error);
    // }
};

export default swRegister;