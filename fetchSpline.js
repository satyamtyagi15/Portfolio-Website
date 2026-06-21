const https = require('https');

https.get('https://spline.design/community', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        const regex = /https:\/\/prod\.spline\.design\/[a-zA-Z0-9_-]+\/scene\.splinecode/g;
        const matches = data.match(regex);
        if (matches) {
            console.log(Array.from(new Set(matches)).join('\n'));
        } else {
            console.log('No matches found.');
        }
    });
}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
