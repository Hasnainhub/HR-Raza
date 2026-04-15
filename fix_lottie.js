const https = require('https');
const fs = require('fs');
const path = require('path');

const animationsDir = path.join(__dirname, 'public', 'animations');

const urls = {
  loader: "https://raw.githubusercontent.com/airbnb/lottie-web/master/demo/watermark/data.json", // Minimal watermark/loader animation
  background: "https://raw.githubusercontent.com/airbnb/lottie-web/master/demo/adrock/data.json" // Abstract geometry
};

function download(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (data.includes('404: Not Found')) {
            reject('404 Not Found');
        } else {
            fs.writeFileSync(path.join(animationsDir, filename), data);
            console.log(`Downloaded ${filename} successfully. Size: ${data.length}`);
            resolve();
        }
      });
    }).on('error', reject);
  });
}

// Fallback to valid minimal structural JSON if download fails
const minimalLottie = `{"v":"5.5.2","fr":30,"ip":0,"op":60,"w":500,"h":500,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Null","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[250,250,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[],"ip":0,"op":60,"st":0,"bm":0}]}`;

async function run() {
  try {
    await download(urls.loader, 'loader.json');
  } catch (e) {
    console.log('Using minimal fallback for loader');
    fs.writeFileSync(path.join(animationsDir, 'loader.json'), minimalLottie);
  }
  
  try {
    await download(urls.background, 'background.json');
  } catch (e) {
    console.log('Using minimal fallback for background');
    fs.writeFileSync(path.join(animationsDir, 'background.json'), minimalLottie);
  }
}

run();
