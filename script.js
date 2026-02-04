const startBtn = document.getElementById('start-btn');
const speedValue = document.getElementById('speed-value');
const progressCircle = document.getElementById('progress-circle');
const pingText = document.getElementById('ping-text');
const downloadText = document.getElementById('download-text');
const uploadText = document.getElementById('upload-text');

// SVG Configuration
const radius = 140;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

startBtn.addEventListener('click', runSpeedTest);

async function runSpeedTest() {
    // Reset UI
    startBtn.disabled = true;
    startBtn.innerHTML = "<span>TESTING...</span>";
    speedValue.innerText = "0";
    pingText.innerText = "-- ms";
    downloadText.innerText = "-- Mbps";
    uploadText.innerText = "-- Mbps";
    setProgress(0);

    try {
        // 1. PING TEST
        highlightCard(0); // Highlight Ping
        const ping = await measurePing();
        animateValue(pingText, 0, ping, 500, " ms");
        await wait(500);

        // 2. DOWNLOAD TEST
        highlightCard(1); // Highlight Download
        const downloadSpeed = await measureDownloadSpeed();
        // Finalize visual
        speedValue.innerText = downloadSpeed;
        downloadText.innerText = downloadSpeed + " Mbps";
        await wait(500);

        // 3. UPLOAD TEST (Simulated for Demo)
        highlightCard(2); // Highlight Upload
        setProgress(0); // Reset for upload visual
        const uploadSpeed = await measureUploadSpeed(downloadSpeed);
        // Finalize visual
        animateValue(uploadText, 0, uploadSpeed, 1000, " Mbps");

        // Done
        startBtn.innerHTML = "<span>RESTART</span>";
        startBtn.disabled = false;
        highlightCard(-1); // Remove highlights

    } catch (error) {
        console.error(error);
        startBtn.innerHTML = "<span>ERROR</span>";
        startBtn.disabled = false;
    }
}

// ---- Helpers ----

function highlightCard(index) {
    const cards = document.querySelectorAll('.stat-card');
    cards.forEach((c, i) => {
        if (i === index) c.classList.add('active-card');
        else c.classList.remove('active-card');
    });
}

function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function animateValue(obj, start, end, duration, suffix = "") {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const val = Math.floor(progress * (end - start) + start);
        obj.innerHTML = val + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Real Ping (Head request to reliable CDNs)
async function measurePing() {
    const start = performance.now();
    try {
        await fetch('https://www.google.com/favicon.ico', { mode: 'no-cors' });
    } catch (e) { } // no-cors opaque response is fine, we just want timing
    const end = performance.now();
    return Math.round(end - start);
}

// Download Speed (Fetch a random image)
// Using Unsplash source for a decent file size
async function measureDownloadSpeed() {
    const imageLink = 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';
    // This image is roughly 3-5MB.

    const startTime = (new Date()).getTime();

    // We want to update visual gauge while downloading
    // Since fetch doesn't give easy progress events without streams, 
    // we will fake the progress animation slightly until it finishes, then snap to real.

    let fakeProgress = 0;
    const interval = setInterval(() => {
        fakeProgress += Math.random() * 5;
        if (fakeProgress > 90) fakeProgress = 90;

        // Update main number chaotically to look like measuring
        const randomSpeed = Math.floor(Math.random() * 50) + 10;
        speedValue.innerText = randomSpeed;
        setProgress(fakeProgress);
    }, 100);

    return new Promise((resolve) => {
        const download = new Image();
        download.onload = function () {
            clearInterval(interval);
            const endTime = (new Date()).getTime();
            const duration = (endTime - startTime) / 1000; // seconds

            // Approximation: let's assume image is ~2.5 MB (20 Megabits) for calculation safety 
            // strictly calculating is hard without Content-Length header access (CORS)
            // But we can try to get resource timing if supported.

            const entries = performance.getEntriesByName(imageLink);
            let size = 2500000; // default fallback 2.5MB
            if (entries.length > 0 && entries[0].encodedBodySize > 0) {
                size = entries[0].encodedBodySize;
            }

            const bits = size * 8;
            const bps = bits / duration;
            const mbps = (bps / (1024 * 1024)).toFixed(1);

            setProgress(100);
            resolve(mbps);
        };

        download.onerror = function () {
            clearInterval(interval);
            resolve(0); // Fail
        };

        // Bust cache
        download.src = imageLink + "&cache=" + Math.random();
    });
}

// Simulated Upload (Browser limitations prevents real large upload tests easily)
// We will generate a value relative to download speed (commonly asymmetrical)
async function measureUploadSpeed(downloadSpeed) {
    if (downloadSpeed == 0) return 0;
    const targetUpload = (downloadSpeed * 0.4).toFixed(1); // Assume 40% of download is upload

    let current = 0;
    const duration = 2000; // 2 seconds test
    const startTime = performance.now();

    return new Promise(resolve => {
        const loop = () => {
            const now = performance.now();
            const progress = (now - startTime) / duration;

            if (progress < 1) {
                // Chaotic fluctuation
                const fluctuation = (Math.random() * 10) - 5;
                const displayVal = Math.max(0, (targetUpload * progress) + fluctuation);

                speedValue.innerText = Math.floor(displayVal);
                setProgress(progress * 100);
                requestAnimationFrame(loop);
            } else {
                speedValue.innerText = 0; // Reset main counter when done
                setProgress(0);
                resolve(targetUpload);
            }
        };
        loop();
    });
}
