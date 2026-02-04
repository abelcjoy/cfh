/* Navigation Logic */
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.tool-section');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        navBtns.forEach(b => b.classList.remove('active'));
        sections.forEach(s => {
            s.classList.remove('active-section');
            s.classList.add('hidden-section');
        });

        // Add active class to clicked
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        targetSection.classList.remove('hidden-section');
        targetSection.classList.add('active-section');

        // Trigger currency fetch if swtiched to currency
        if (targetId === 'currency-section') {
            fetchRate();
        }
    });
});

/* Currency Logic */
const usdInput = document.getElementById('usd-input');
const inrInput = document.getElementById('inr-input');
const rateDisplay = document.getElementById('rate-display');
const lastUpdated = document.getElementById('last-updated');

let currentRate = 83.50; // Fallback

async function fetchRate() {
    try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await res.json();
        if (data && data.rates && data.rates.INR) {
            currentRate = data.rates.INR;
            rateDisplay.innerText = `1 USD = ${currentRate} INR`;

            const now = new Date();
            lastUpdated.innerText = "Updated: " + now.toLocaleTimeString();

            calculate();
        }
    } catch (e) {
        console.log("Rate fetch failed, using fallback");
    }
}

function calculate() {
    const usd = parseFloat(usdInput.value);
    if (!isNaN(usd)) {
        inrInput.value = (usd * currentRate).toFixed(2);
    } else {
        inrInput.value = "";
    }
}

usdInput.addEventListener('input', calculate);

// Initial Fetch
fetchRate();
calculate();

/* BMI Logic */
const weightInput = document.getElementById('weight-input');
const heightInput = document.getElementById('height-input');
const bmiVal = document.getElementById('bmi-result-val');
const bmiCat = document.getElementById('bmi-category');

function calculateBMI() {
    const w = parseFloat(weightInput.value);
    const h = parseFloat(heightInput.value);

    if (w > 0 && h > 0) {
        const heightM = h / 100;
        const bmi = w / (heightM * heightM);
        const bmiRounded = bmi.toFixed(1);

        bmiVal.innerText = bmiRounded;

        // Categorize
        if (bmi < 18.5) {
            bmiCat.innerText = "Underweight";
            bmiCat.style.color = "#4facfe"; // Blue like accent
        } else if (bmi >= 18.5 && bmi < 24.9) {
            bmiCat.innerText = "Normal Weight";
            bmiCat.style.color = "#00ff88"; // Green
        } else if (bmi >= 25 && bmi < 29.9) {
            bmiCat.innerText = "Overweight";
            bmiCat.style.color = "#ffd700"; // Yellow/Gold
        } else {
            bmiCat.innerText = "Obese";
            bmiCat.style.color = "#ff4d4d"; // Red
        }
    } else {
        bmiVal.innerText = "--.-";
        bmiCat.innerText = "Enter Details";
        bmiCat.style.color = "var(--text-secondary)";
    }
}

weightInput.addEventListener('input', calculateBMI);
heightInput.addEventListener('input', calculateBMI);


/* Typing Test Logic */
const typingTextDisplay = document.getElementById('typing-text-display');
const typingInput = document.getElementById('typing-input');
const wpmText = document.getElementById('wpm-text');
const accuracyText = document.getElementById('accuracy-text');
const timeText = document.getElementById('time-text');
const startTypingBtn = document.getElementById('start-typing-btn');

const paragraphs = [
    "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. Complexity is the enemy of execution.",
    "To be successful, you have to use each day as an opportunity to improve, to be better, to get a little bit closer to your goals. It might sound like a lot of work.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. Believe you can and you're halfway there. I have not failed. I've just found 10,000 ways that won't work.",
    "Technology is best when it brings people together. It is not a faith in technology. It is faith in people. We are changing the world with technology."
];

let timer;
let timeLeft = 60;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function loadParagraph() {
    const randIndex = Math.floor(Math.random() * paragraphs.length);
    typingTextDisplay.innerHTML = "";
    paragraphs[randIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`;
        typingTextDisplay.innerHTML += span;
    });
    typingTextDisplay.querySelectorAll("span")[0].classList.add("char-current");
}

function initTyping() {
    let characters = typingTextDisplay.querySelectorAll("span");
    let typedChar = typingInput.value.split("")[charIndex];

    if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedChar == null) { // Backspace
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("char-wrong")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("char-correct", "char-wrong");
                characters[charIndex].classList.add("char-current");
                characters[charIndex + 1].classList.remove("char-current");
            }
        } else {
            if (characters[charIndex].innerText === typedChar) { // Correct
                characters[charIndex].classList.add("char-correct");
            } else { // Wrong
                mistakes++;
                characters[charIndex].classList.add("char-wrong");
            }
            characters[charIndex].classList.remove("char-current");

            charIndex++;
            if (charIndex < characters.length) {
                characters[charIndex].classList.add("char-current");
            } else {
                clearInterval(timer); // Done with paragraph
                typingInput.value = ""; // Clear for next paragraph if we wanted continuous, but for now stop
            }
        }

        let wpm = Math.round(((charIndex - mistakes) / 5) / ((60 - timeLeft) / 60));
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmText.innerText = wpm;
        let accuracy = Math.floor(((charIndex - mistakes) / charIndex) * 100);
        accuracy = isNaN(accuracy) ? 100 : accuracy;
        accuracyText.innerText = accuracy + "%";

    } else {
        clearInterval(timer);
        typingInput.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeText.innerText = timeLeft + "s";
        let wpm = Math.round(((charIndex - mistakes) / 5) / ((60 - timeLeft) / 60));
        wpmText.innerText = wpm;
    } else {
        clearInterval(timer);
        typingInput.disabled = true;
        startTypingBtn.innerText = "TRY AGAIN";
        startTypingBtn.disabled = false;
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = 60;
    charIndex = mistakes = 0;
    isTyping = false;
    typingInput.value = "";
    timeText.innerText = "60s";
    wpmText.innerText = 0;
    accuracyText.innerText = "100%";

    typingInput.disabled = false;
    typingInput.focus();
    startTypingBtn.innerText = "RESTART";
}

startTypingBtn.addEventListener('click', resetGame);
typingInput.addEventListener('input', initTyping);

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
