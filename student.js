import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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
const callBtn = document.getElementById('callBtn');

callBtn.addEventListener('click', () => {
    const grade = document.getElementById('grade').value;
    const classNum = document.getElementById('classNum').value;
    const studentNum = document.getElementById('studentNum').value;
    const studentName = document.getElementById('studentName').value.trim();
    const purpose = document.getElementById('purpose').value;
    const teacherName = document.getElementById('teacherName').value;

    if (!grade || !classNum || !studentNum || !studentName || !purpose || !teacherName) {
        alert("모든 항목을 입력하고 선택해주세요.");
        return;
    }

    const originalText = callBtn.innerText;
    callBtn.innerText = "호출 중...";
    callBtn.disabled = true;

    const callRef = ref(db, 'calls');
    const newCallRef = push(callRef);
    
    set(newCallRef, {
        grade: grade,
        classNum: classNum,
        studentNum: studentNum,
        studentName: studentName,
        purpose: purpose,
        teacherName: teacherName,
        timestamp: Date.now()
    }).then(() => {
        alert(`${teacherName} 선생님 호출이 완료되었습니다.`);
        document.getElementById('grade').value = '';
        document.getElementById('classNum').value = '';
        document.getElementById('studentNum').value = '';
        document.getElementById('studentName').value = '';
        document.getElementById('purpose').value = '';
        document.getElementById('teacherName').value = ''; 
    }).catch((error) => {
        console.error("오류 발생:", error);
        alert("호출에 실패했습니다. 인터넷 연결이나 Firebase 권한을 확인해주세요.");
    }).finally(() => {
        callBtn.innerText = originalText;
        callBtn.disabled = false;
    });
});