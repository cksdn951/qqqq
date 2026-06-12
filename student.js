import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// 파이어베이스 설정
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

// 🌟 전교생 명단 데이터베이스
const studentRoster = {
    "2": {
        "1": {
            "1": "곽승현", "2": "김민성", "3": "김상훈", "4": "김성민", "5": "김진하",
            "6": "김태형", "7": "김한울", "8": "나현성", "9": "박대철", "10": "박창현",
            "11": "박태준", "12": "백예송", "13": "신수혁", "14": "윤정찬", "15": "이건국",
            "16": "이성화", "17": "이종인", "18": "이준성", "19": "정문환", "20": "정준호",
            "21": "조찬후", "22": "차상훈", "23": "차지호", "24": "최민혁", "25": "최진욱",
            "26": "하형훈", "27": "형성재"
        },
        "2": {
            "1": "강정구", "2": "김규민", "3": "김동건", "4": "김민용", "5": "김윤성",
            "6": "김재후", "7": "김종우", "8": "김준모", "9": "김준성", "10": "김지성",
            "11": "남해광", "12": "박동건", "13": "박범준", "14": "박종겸", "15": "박태언",
            "16": "오민석", "17": "오성민", "18": "오정록", "19": "우다윗", "20": "은도균",
            "21": "임정현", "22": "정태민", "23": "조현진", "24": "최정도", "25": "하승기",
            "26": "황인철"
        },
        "3": {}, 
        "4": {}, 
        "5": {
            "1": "강찬서", "2": "곽은호", "3": "권혁민", "4": "김강민", "5": "김범서",
            "6": "김예겸", "7": "김우성", "8": "김재혁", "9": "노주한", "10": "박준수",
            "11": "박찬우", "12": "송창근", "13": "안재영", "14": "양준서", "15": "이강륜",
            "16": "이도현", "17": "이지호", "18": "장선재", "19": "정민건", "20": "정희망",
            "21": "조윤호"
        },
        "6": {
            "1": "김도엽", "2": "김도현", "3": "김민준", "4": "김진성", "5": "김태윤",
            "6": "김현민", "7": "김현우", "8": "김희완", "9": "박준호", "10": "박찬영",
            "11": "송시온", "12": "안유준", "13": "우선우", "14": "윤동률", "15": "임수호",
            "16": "전서현", "17": "정호윤", "18": "조주원", "19": "차현채", "20": "최건희",
            "21": "하준혁"
        },
        "7": {}, 
        "8": {
            "1": "김지후", "2": "민태인", "3": "박근영", "4": "손성호", "5": "송율호",
            "6": "신예준", "7": "엄진우", "8": "유태경", "9": "이민성", "10": "이상진",
            "11": "이예찬", "12": "이우진", "13": "이재찬", "14": "이준우", "15": "정민찬",
            "16": "조고건", "17": "최우석", "18": "허남규", "19": "허승범", "20": "황성호"
        },
        "9": {
            "1": "김경준", "2": "김상언", "3": "김석현", "4": "김정우", "5": "김현호",
            "6": "박예승", "7": "박찬혁", "8": "송건희", "9": "양수민", "10": "여지훈",
            "11": "오광훈", "12": "오유찬", "13": "오은석", "14": "오주호", "15": "이성우",
            "16": "이승규", "17": "이주헌", "18": "이현준", "19": "정시백", "20": "황준서"
        },
        "10": {
            "1": "김지오", "2": "김태윤", "3": "김태주", "4": "김하율", "5": "박준성",
            "6": "서민준", "7": "송민규", "8": "신동훈", "9": "신정원", "10": "양가온",
            "11": "오시형", "12": "유지환", "13": "이동하", "14": "임루희", "15": "정성호",
            "16": "정운호", "17": "정유석", "18": "조승우", "19": "차진우", "20": "한해규"
        }
    },
    "1": {}, 
    "3": {}  
};

// HTML 요소 가져오기
const gradeSelect = document.getElementById('grade');
const classSelect = document.getElementById('classNum');
const studentNumInput = document.getElementById('studentNum');
const studentNameInput = document.getElementById('studentName');
const purposeSelect = document.getElementById('purpose');
const teacherSelect = document.getElementById('teacherName');
const callBtn = document.getElementById('callBtn');

// 🌟 이름 자동완성 함수
function autoFillName() {
    const grade = gradeSelect.value;
    const classNum = classSelect.value;
    const studentNum = studentNumInput.value.trim();

    if (grade && classNum && studentNum) {
        if (studentRoster[grade] && 
            studentRoster[grade][classNum] && 
            studentRoster[grade][classNum][studentNum]) {
            studentNameInput.value = studentRoster[grade][classNum][studentNum];
        } else {
            studentNameInput.value = "";
            studentNameInput.placeholder = "등록되지 않은 학번입니다.";
        }
    } else {
        studentNameInput.value = "";
        studentNameInput.placeholder = "이름 (자동 입력됨)";
    }
}

// 이벤트 리스너 연결
gradeSelect.addEventListener('change', autoFillName);
classSelect.addEventListener('change', autoFillName);
studentNumInput.addEventListener('input', autoFillName);

// 🌟 파이어베이스로 데이터 전송 (호출 버튼 클릭 시)
callBtn.addEventListener('click', () => {
    const grade = gradeSelect.value;
    const classNum = classSelect.value;
    const studentNum = studentNumInput.value.trim();
    const studentName = studentNameInput.value;
    const purpose = purposeSelect.value;
    const teacherName = teacherSelect.value;

    if (!grade || !classNum || !studentNum || !studentName || !purpose || !teacherName) {
        alert("모든 항목을 입력하고 선택해주세요.");
        return;
    }

    const originalText = callBtn.innerText;
    callBtn.innerText = "호출 중...";
    callBtn.disabled = true;

    // 파이어베이스 데이터베이스 경로 설정 및 데이터 푸시
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
        
        // 입력창 초기화
        studentNumInput.value = '';
        studentNameInput.value = '';
        studentNameInput.placeholder = "이름 (자동 입력됨)";
        purposeSelect.value = '';
        teacherSelect.value = ''; 
    }).catch((error) => {
        console.error("오류 발생:", error);
        alert("호출에 실패했습니다. 인터넷 연결이나 Firebase 권한을 확인해주세요.");
    }).finally(() => {
        callBtn.innerText = originalText;
        callBtn.disabled = false;
    });
});
