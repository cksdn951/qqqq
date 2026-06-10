import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA3yPKa6maWkQ3ZECEymX7Q9cxY3SMgYsA",
  authDomain: "school-call-30676.firebaseapp.com",
  projectId: "school-call-30676",
  storageBucket: "school-call-30676.firebasestorage.app",
  messagingSenderId: "619307514086",
  appId: "1:619307514086:web:9bc90aea7c0b4290bae327",
  measurementId: "G-2XM2KEXEXZ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let isListeningEnabled = false;
let availableVoices = [];

const startBtn = document.getElementById('startBtn');
const logDisplay = document.getElementById('log');
const receiverCard = document.getElementById('receiverCard');
const alertSound = document.getElementById('alertSound');
const voiceSelect = document.getElementById('voiceSelect');
const confirmBtn = document.getElementById('confirmBtn');

function populateVoiceList() {
    availableVoices = window.speechSynthesis.getVoices().filter(voice => voice.lang.includes('ko'));
    voiceSelect.innerHTML = '';
    
    if (availableVoices.length === 0) {
        voiceSelect.innerHTML = '<option value="">한국어 목소리를 찾을 수 없습니다</option>';
        return;
    }

    availableVoices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.textContent = voice.name; 
        option.value = index;
        voiceSelect.appendChild(option);
    });
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

startBtn.addEventListener('click', () => {
    isListeningEnabled = true;
    startBtn.style.display = 'none';
    logDisplay.innerText = "수신 대기 중...";
    logDisplay.style.color = "var(--accent-color)";
    
    const silentUtterance = new SpeechSynthesisUtterance("");
    window.speechSynthesis.speak(silentUtterance);
});

// 확인 버튼 클릭 시 초기화
confirmBtn.addEventListener('click', () => {
    logDisplay.innerText = "수신 대기 중...";
    logDisplay.style.color = "var(--accent-color)";
    confirmBtn.style.display = 'none';
    receiverCard.classList.remove('flash-active');
    
    // 소리와 목소리 즉시 정지
    alertSound.pause();
    alertSound.currentTime = 0;
    window.speechSynthesis.cancel();
});

const callRef = ref(db, 'calls');
        
onChildAdded(callRef, (snapshot) => {
    const data = snapshot.val();
    
    if (isListeningEnabled) {
        const displayMessage = `${data.grade}학년 ${data.classNum}반 ${data.studentNum}번 ${data.studentName}\n용무: ${data.purpose}\n호출: ${data.teacherName} 선생님`;
        const speechMessage = `${data.grade}학년, ${data.classNum}반, ${data.studentNum}번, ${data.studentName} 학생이, ${data.purpose} 용무로, ${data.teacherName} 선생님을 찾습니다.`;
        
        logDisplay.innerText = displayMessage;
        logDisplay.style.color = "var(--text-main)";
        
        confirmBtn.style.display = 'inline-block';
        
        alertSound.currentTime = 0; 
        alertSound.play();
        
        receiverCard.classList.remove('flash-active');
        void receiverCard.offsetWidth; 
        receiverCard.classList.add('flash-active');

        window.speechSynthesis.cancel(); 

        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(speechMessage);
            utterance.lang = 'ko-KR'; 
            utterance.rate = 0.85; 
            utterance.pitch = 1.0; 
            
            const selectedVoiceIndex = voiceSelect.value;
            if (availableVoices[selectedVoiceIndex]) {
                utterance.voice = availableVoices[selectedVoiceIndex];
            }

            window.speechSynthesis.speak(utterance);
        }, 800); 
    }
});