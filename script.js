/* Navigation Logic */
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.tool-section');

// Toggle Menu functions
function openMenu() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
}

function closeMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Navigation Logic
        navBtns.forEach(b => b.classList.remove('active'));
        sections.forEach(s => {
            s.classList.remove('active-section');
            s.classList.add('hidden-section');
        });

        // Activate
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        targetSection.classList.remove('hidden-section');
        targetSection.classList.add('active-section');

        // Close Menu automatically on selection
        closeMenu();

        // Specific Tool Initialization
        if (targetId === 'currency-section') fetchRate();
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


/* Recorder Logic */
const startRecordBtn = document.getElementById('start-record-btn');
const stopRecordBtn = document.getElementById('stop-record-btn');
const downloadLink = document.getElementById('download-link');
const videoPreview = document.getElementById('video-preview');
const resSelect = document.getElementById('res-select');
const audioSelect = document.getElementById('audio-select');
const recordingDot = document.getElementById('recording-dot');

let mediaRecorder;
let recordedChunks = [];
let stream = null;

async function startRecording() {
    try {
        const height = parseInt(resSelect.value);
        const audioChoice = audioSelect.value;

        const constraints = {
            video: {
                displaySurface: "monitor", // prefer whole screen
                height: { ideal: height }, // Request 1080 or 4k
                frameRate: 60
            },
            audio: audioChoice !== 'none'
        };

        // Get Screen Stream
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);

        // If Mic is requested, we need to mix streams (Advanced)
        // For simplicity v1: If mic requested, we replace system audio or just use mic? 
        // getDisplayMedia usually gets System Audio.
        // To mix Mic + System, we need a separate getUserMedia call and AudioContext.
        // Let's implement partial support: System Audio comes with DisplayMedia.
        // If they want MIC, we might need to prompt separately.

        if (audioChoice === 'mic') {
            const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // Combine tracks - Note: Replacing system audio track if present is complex without mixing
            // For this v1, we will just add the mic track. If the container supports multiple audio tracks, great.
            // If not, we might prioritization issues.
            // Safe approach for v1: If Mic is chosen, we prioritize Mic.
            if (stream.getAudioTracks().length > 0) {
                stream.removeTrack(stream.getAudioTracks()[0]); // Remove system audio to avoid conflict if mixer not present
            }
            stream.addTrack(micStream.getAudioTracks()[0]);
        }

        // Preview
        videoPreview.srcObject = stream;

        // Init Recorder
        const mimeType = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
            ? "video/webm; codecs=vp9"
            : "video/webm"; // Fallback

        mediaRecorder = new MediaRecorder(stream, { mimeType });

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) recordedChunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            recordedChunks = [];
            const url = URL.createObjectURL(blob);

            // UI Update
            downloadLink.href = url;
            downloadLink.download = `recording-${new Date().getTime()}.webm`;
            downloadLink.style.display = "flex"; // Show save button

            // Stop tracks
            stream.getTracks().forEach(track => track.stop());
            videoPreview.srcObject = null;

            // Reset Buttons
            startRecordBtn.style.display = "flex";
            stopRecordBtn.style.display = "none";
            recordingDot.classList.add('hidden');
        };

        // Start
        mediaRecorder.start();

        // UI
        startRecordBtn.style.display = "none";
        stopRecordBtn.style.display = "flex";
        downloadLink.style.display = "none";
        recordingDot.classList.remove('hidden');

        // Handle if user clicks "Stop Sharing" on browser UI
        stream.getVideoTracks()[0].onended = () => {
            if (mediaRecorder.state !== 'inactive') stopRecording();
        };

    } catch (err) {
        console.error("Error: " + err);
    }
}

function stopRecording() {
    mediaRecorder.stop();
}

startRecordBtn.addEventListener('click', startRecording);
stopRecordBtn.addEventListener('click', stopRecording);


/* PDF Converter Logic */
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const imageList = document.getElementById('image-list');
const convertPdfBtn = document.getElementById('convert-pdf-btn');

let uploadedImages = []; // Array of Data URLs

// Drag & Drop
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "var(--accent)";
});

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "rgba(255,255,255,0.2)";
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "rgba(255,255,255,0.2)";
    handleFiles(e.dataTransfer.files);
});

dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

function handleFiles(files) {
    if (!files.length) return;

    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImages.push(e.target.result);
            renderPreviews();
        };
        reader.readAsDataURL(file);
    });
}

function renderPreviews() {
    imageList.innerHTML = "";
    uploadedImages.forEach((src, index) => {
        const div = document.createElement('div');
        div.className = 'preview-item';
        div.innerHTML = `
            <img src="${src}">
            <button class="remove-btn" onclick="removeImage(${index})">&times;</button>
        `;
        imageList.appendChild(div);
    });

    // Enable button
    if (uploadedImages.length > 0) {
        convertPdfBtn.disabled = false;
        convertPdfBtn.style.opacity = "1";
        convertPdfBtn.style.cursor = "pointer";
    } else {
        convertPdfBtn.disabled = true;
        convertPdfBtn.style.opacity = "0.5";
        convertPdfBtn.style.cursor = "not-allowed";
    }
}

window.removeImage = (index) => {
    uploadedImages.splice(index, 1);
    renderPreviews();
};

convertPdfBtn.addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    const maxWid = pageWidth - (margin * 2);
    const maxHei = pageHeight - (margin * 2);

    convertPdfBtn.innerHTML = `<span><i class="fa-solid fa-spinner fa-spin"></i> GENERATING...</span>`;

    for (let i = 0; i < uploadedImages.length; i++) {
        if (i > 0) doc.addPage();

        const imgData = uploadedImages[i];

        // Load image to get dims
        const img = new Image();
        img.src = imgData;
        await new Promise(r => img.onload = r);

        const imgRatio = img.width / img.height;
        const pageRatio = maxWid / maxHei;

        let w = maxWid;
        let h = w / imgRatio;

        if (h > maxHei) {
            h = maxHei;
            w = h * imgRatio;
        }

        const x = (pageWidth - w) / 2;
        const y = (pageHeight - h) / 2;

        doc.addImage(imgData, 'JPEG', x, y, w, h);
    }

    doc.save(`clarity-docs-${new Date().getTime()}.pdf`);

    convertPdfBtn.innerHTML = `<span><i class="fa-solid fa-wand-magic-sparkles"></i> CONVERT TO PDF</span>`;
});


/* Tweet Generator Logic */
const tweetNameInput = document.getElementById('tweet-name');
const tweetHandleInput = document.getElementById('tweet-handle');
const tweetContentInput = document.getElementById('tweet-content');
const tweetVerifiedCheck = document.getElementById('tweet-verified');
const tweetThemeSelect = document.getElementById('tweet-theme');
const tweetPfpInput = document.getElementById('tweet-pfp-input');
const downloadTweetBtn = document.getElementById('download-tweet-img');
const recordTweetBtn = document.getElementById('record-tweet-video');

const previewName = document.getElementById('preview-name');
const previewHandle = document.getElementById('preview-handle');
const previewContent = document.getElementById('preview-content');
const previewVerified = document.getElementById('preview-verified');
const previewPfp = document.getElementById('tweet-pfp-img');
const tweetCard = document.getElementById('tweet-card');

// Update Functions
function updateTweet() {
    previewName.innerText = tweetNameInput.value || "Name";
    previewHandle.innerText = tweetHandleInput.value || "@handle";
    previewContent.innerHTML = tweetContentInput.value.replace(/\n/g, '<br>') || "Tweet content...";

    if (tweetVerifiedCheck.checked) {
        previewVerified.classList.add('visible');
    } else {
        previewVerified.classList.remove('visible');
    }

    // Theme
    tweetCard.className = `tweet-card ${tweetThemeSelect.value}-theme`;
}

// Event Listeners
tweetNameInput.addEventListener('input', updateTweet);
tweetHandleInput.addEventListener('input', updateTweet);
tweetContentInput.addEventListener('input', updateTweet);
tweetVerifiedCheck.addEventListener('change', updateTweet);
tweetThemeSelect.addEventListener('change', updateTweet);

// PFP Upload
tweetPfpInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => previewPfp.src = e.target.result;
        reader.readAsDataURL(e.target.files[0]);
    }
});

// Download Image
downloadTweetBtn.addEventListener('click', () => {
    downloadTweetBtn.innerHTML = `<span><i class="fa-solid fa-spinner fa-spin"></i> SAVING...</span>`;

    // Scale up for high res
    html2canvas(tweetCard, { scale: 3, backgroundColor: null }).then(canvas => {
        const link = document.createElement('a');
        link.download = `tweet-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        downloadTweetBtn.innerHTML = `<span><i class="fa-solid fa-image"></i> SAVE IMG</span>`;
    });
});

// Record Video (1080p WebM/MP4 mimic)
recordTweetBtn.addEventListener('click', async () => {
    recordTweetBtn.innerHTML = `<span><i class="fa-solid fa-circle-notch fa-spin"></i> RENDERING (5s)...</span>`;

    // 1. Create a canvas from the tweet card
    const canvas = await html2canvas(tweetCard, { scale: 3 }); // High res capture

    // 2. Create a stream from this static canvas
    // To make it a video, we need to draw this image onto a new canvas repeatedly?
    // Actually, canvas.captureStream() works if the canvas changes. If static, it might not emit frames.
    // Solution: We draw the image to a new canvas in a loop for 5 seconds.

    const videoCanvas = document.createElement('canvas');
    videoCanvas.width = 1920; // 1080p width
    videoCanvas.height = 1080; // 1080p height
    const ctx = videoCanvas.getContext('2d');

    // Fill background (Black or matching theme)
    // Actually, let's center the tweet on a nice background
    const theme = tweetThemeSelect.value;
    const bg = theme === 'light' ? '#f0f0f0' : '#000000';

    const stream = videoCanvas.captureStream(30); // 30 FPS
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });

    const chunks = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tweet-video-${Date.now()}.webm`;
        a.click();
        recordTweetBtn.innerHTML = `<span><i class="fa-solid fa-video"></i> SAVE MP4</span>`;
    };

    recorder.start();

    // Animation Loop (5 seconds)
    // We will simple "Zoom In" slightly or just hold static
    let frame = 0;
    const totalFrames = 30 * 5; // 5 seconds
    const img = canvas; // The capture

    // Centering math
    // We want the tweet card centered on 1920x1080
    // Scale tweet to fit nicely if too big
    let scale = 1;
    if (img.width > 1800) scale = 1800 / img.width;

    const draw = setInterval(() => {
        if (frame >= totalFrames) {
            clearInterval(draw);
            recorder.stop();
            return;
        }

        // Draw Background
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, videoCanvas.width, videoCanvas.height);

        // Draw Tweet Centered
        // Optional: Slight breathable scale effect
        // const breathe = 1 + (Math.sin(frame / 30) * 0.02); 

        const w = img.width * scale;
        const h = img.height * scale;
        const x = (1920 - w) / 2;
        const y = (1080 - h) / 2;

        ctx.drawImage(img, x, y, w, h);

        frame++;
    }, 1000 / 30);
});


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
