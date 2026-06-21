const https = require('https');

const urls = [
    "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode",
    "https://prod.spline.design/9951u9cumiw2Ehj8/scene.splinecode",
    "https://prod.spline.design/Q2D--qB0-V5o8HkM/scene.splinecode",
    "https://prod.spline.design/Ea-m0sXJ5W-jG-iA/scene.splinecode",
    "https://prod.spline.design/y3c1T7m-8R1K4K9z/scene.splinecode"
];

urls.forEach(url => {
    https.get(url, (res) => {
        console.log(`${res.statusCode} - ${url}`);
    }).on('error', (e) => {
        console.error(`${url} error: ${e.message}`);
    });
});
