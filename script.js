// 질문 데이터
const questions = [
    {
        question: "친구가 고민 상담을 한다. 그런데 이 고민...",
        options: [
            "이건 해결법이 명확한데? 당장 알려준다.",
            "헉... 많이 고민했구나"
        ]
    },
    {
        question: "단톡방에서 싸움이 났다. 어떡하면 좋지?",
        options: [
            "이건 누가 잘못했고 저건 누가 잘못했네. 서로 사과하고 좋게 끝내.",
            "둘다 상처받았겠다 ㅜㅠ 일단 위로해주고 화해시켜야지..."
        ]
    },
    {
        question: "뭔가 쎄한 분위기... \"너 왜 그렇게 말해?\"",
        options: [
            "내가 뭐라고 했는데? 대화내용 복기 시작",
            "내가 실수했나? 뭔진 모르겠지만 미안함"
        ]
    },
    {
        question: "여행계획이 다 틀어졌다...",
        options: [
            "그럴수도 있지. 대안이나 짜자",
            "아 속상해... 마음 좀 추스르고 대안을 짜자"
        ]
    },
    {
        question: "친구가 준 선물. 마음에 좀 안들지만?",
        options: [
            "어쨌든 친구가 준 거니까 고맙다고 한다",
            "뭐가 됐든 날 생각해준 게 감동이야..."
        ]
    },
    {
        question: "친구가 나한테 미묘한 거짓말을 했다.",
        options: [
            "왜그랬어? -> ㅇㅋ납득 -> 종료",
            "이해는 하지만 그래도 속상해"
        ]
    },
    {
        question: "애인이랑 자꾸 문제가 생기면",
        options: [
            "문제 해결하려고 대화 시도함",
            "이 자식은 눈치라는 게 없나? 화나는거 정리하고 대화해야지.."
        ]
    },
    {
        question: "나는 사람 관계에서",
        options: [
            "효율성과 현실적 거리감 유지가 중요해",
            "진심과 감정의 연결이 더 중요해"
        ]
    },
    {
        question: "친구가 울고 있으면",
        options: [
            "위로해준다",
            "나도 슬퍼 ㅜㅠ 위로해준다"
        ]
    },
    {
        question: "친구가 내 조언을 무시했을 때",
        options: [
            "왜 물어봤지? 비효율적이다",
            "왜 물어봤지? 기분상함"
        ]
    },
    {
        question: "감정에 휘둘리는 사람을 보면",
        options: [
            "그 감정의 원인을 분석함",
            "나도 같이 감정이 동요됨"
        ]
    },
    {
        question: "나의 조언을 듣고 친구가 울면",
        options: [
            "내가 뭘 잘못 말했나 체크함",
            "나도 눈물남… 감정이입 개쩔음"
        ]
    }
];

// 기본 질문 데이터 (복원용)
const defaultQuestions = JSON.parse(JSON.stringify(questions));

// 결과 데이터
const results = {
    T: {
        title: "매우 T형 - 로봇 그 자체",
        description: "당신은 완전한 로봇입니다! 감정보다는 논리와 효율성을 중시하는 타입이에요. 문제 해결에 능숙하고 객관적인 판단을 잘 내리는 편이죠. 하지만 가끔은 감정적 공감이 부족할 수 있어요.",
        emoji: "🤖",
        compatible: ["T", "t"],
        incompatible: ["F", "f"]
    },
    t: {
        title: "비교적 T형 - 감정이 있는 로봇",
        description: "당신은 감정이 있는 로봇입니다! 논리적이면서도 어느 정도 감정적 공감을 할 수 있는 균형잡힌 타입이에요. 상황에 따라 T와 F를 적절히 활용하는 편이죠.",
        emoji: "🤔",
        compatible: ["T", "t", "f"],
        incompatible: ["F"]
    },
    f: {
        title: "비교적 F형 - 공감 중시",
        description: "당신은 공감을 중시하는 타입입니다! 감정적 연결을 중요하게 생각하면서도 어느 정도 객관성을 유지할 수 있어요. 다른 사람의 감정을 잘 이해하는 편이죠.",
        emoji: "💕",
        compatible: ["f", "F", "t"],
        incompatible: ["T"]
    },
    F: {
        title: "매우 F형 - 감정 중요",
        description: "당신은 완전한 감성파입니다! 감정과 진심의 연결을 가장 중요하게 생각하는 타입이에요. 다른 사람의 감정에 깊이 공감하고 위로해주는 능력이 뛰어나죠.",
        emoji: "💖",
        compatible: ["F", "f"],
        incompatible: ["T", "t"]
    }
};

// 전역 변수
let currentQuestion = 0;
let score = 0;
let answers = [];
let userName = '';

// DOM 요소들
const mainPage = document.getElementById('main-page');
const questionPage = document.getElementById('question-page');
const resultPage = document.getElementById('result-page');
const adminPage = document.getElementById('admin-page');
const startBtn = document.getElementById('start-btn');
const userNameInput = document.getElementById('user-name');
const userNameDisplay = document.getElementById('user-name-display');
const questionText = document.getElementById('question-text');
const optionBtns = document.querySelectorAll('.option-btn');
const currentQuestionSpan = document.getElementById('current-question');
const progressFill = document.querySelector('.progress-fill');
const shareBtn = document.getElementById('share-btn');
const retryBtn = document.getElementById('retry-btn');
const adminBtn = document.getElementById('admin-btn');
const closeAdminBtn = document.getElementById('close-admin-btn');
const questionList = document.getElementById('question-list');
const saveQuestionsBtn = document.getElementById('save-questions-btn');
const resetQuestionsBtn = document.getElementById('reset-questions-btn');

// 이벤트 리스너
startBtn.addEventListener('click', startTest);
optionBtns.forEach(btn => btn.addEventListener('click', selectOption));
shareBtn.addEventListener('click', shareResult);
retryBtn.addEventListener('click', retryTest);
adminBtn.addEventListener('click', openAdminPage);
closeAdminBtn.addEventListener('click', closeAdminPage);
saveQuestionsBtn.addEventListener('click', saveQuestions);
resetQuestionsBtn.addEventListener('click', resetQuestions);
userNameInput.addEventListener('input', validateName);

// 이름 입력 검증
function validateName() {
    const name = userNameInput.value.trim();
    if (name.length > 0) {
        startBtn.disabled = false;
        startBtn.textContent = '시작하기';
    } else {
        startBtn.disabled = true;
        startBtn.textContent = '이름을 입력해주세요';
    }
}

// 테스트 시작
function startTest() {
    userName = userNameInput.value.trim();
    if (userName.length === 0) {
        alert('이름을 입력해주세요!');
        return;
    }
    
    currentQuestion = 0;
    score = 0;
    answers = [];
    userNameDisplay.textContent = userName;
    showPage(questionPage);
    loadQuestion();
}

// 질문 로드
function loadQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    
    optionBtns.forEach((btn, index) => {
        const optionText = btn.querySelector('.option-text');
        optionText.textContent = question.options[index];
    });
    
    currentQuestionSpan.textContent = currentQuestion + 1;
    progressFill.style.width = ((currentQuestion + 1) / questions.length * 100) + '%';
}

// 옵션 선택
function selectOption(event) {
    const value = parseInt(event.currentTarget.dataset.value);
    answers.push(value);
    score += value;
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// 결과 표시
function showResult() {
    let resultType;
    
    if (score >= 5) {
        resultType = 'T';
    } else if (score >= 0) {
        resultType = 't';
    } else if (score >= -4) {
        resultType = 'f';
    } else {
        resultType = 'F';
    }
    
    const result = results[resultType];
    
    document.getElementById('result-title').textContent = result.title;
    document.getElementById('result-description').textContent = result.description;
    document.getElementById('result-emoji').textContent = result.emoji;
    
    // 호환성 표시
    const compatibleTypes = document.getElementById('compatible-types');
    const incompatibleTypes = document.getElementById('incompatible-types');
    
    compatibleTypes.innerHTML = '';
    incompatibleTypes.innerHTML = '';
    
    result.compatible.forEach(type => {
        const typeItem = document.createElement('div');
        typeItem.className = 'type-item';
        typeItem.textContent = type === 'T' ? '매우 T형' : 
                              type === 't' ? '비교적 T형' :
                              type === 'f' ? '비교적 F형' : '매우 F형';
        compatibleTypes.appendChild(typeItem);
    });
    
    result.incompatible.forEach(type => {
        const typeItem = document.createElement('div');
        typeItem.className = 'type-item';
        typeItem.textContent = type === 'T' ? '매우 T형' : 
                              type === 't' ? '비교적 T형' :
                              type === 'f' ? '비교적 F형' : '매우 F형';
        incompatibleTypes.appendChild(typeItem);
    });
    
    showPage(resultPage);
}

// 페이지 전환
function showPage(page) {
    mainPage.classList.remove('active');
    questionPage.classList.remove('active');
    resultPage.classList.remove('active');
    adminPage.classList.remove('active');
    
    page.classList.add('active');
}

// 관리자 페이지 열기
function openAdminPage() {
    showPage(adminPage);
    loadQuestionEditor();
}

// 관리자 페이지 닫기
function closeAdminPage() {
    showPage(mainPage);
}

// 질문 편집기 로드
function loadQuestionEditor() {
    questionList.innerHTML = '';
    
    questions.forEach((question, index) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.innerHTML = `
            <h3>질문 ${index + 1}</h3>
            <input type="text" class="question-input" value="${question.question}" data-index="${index}" data-field="question">
            <div class="option-inputs">
                <input type="text" class="option-input" value="${question.options[0]}" data-index="${index}" data-field="option0" placeholder="T 성향 옵션">
                <input type="text" class="option-input" value="${question.options[1]}" data-index="${index}" data-field="option1" placeholder="F 성향 옵션">
            </div>
        `;
        questionList.appendChild(questionItem);
    });
    
    // 입력 필드 이벤트 리스너 추가
    const inputs = questionList.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', updateQuestion);
    });
}

// 질문 업데이트
function updateQuestion(event) {
    const input = event.target;
    const index = parseInt(input.dataset.index);
    const field = input.dataset.field;
    const value = input.value;
    
    if (field === 'question') {
        questions[index].question = value;
    } else if (field === 'option0') {
        questions[index].options[0] = value;
    } else if (field === 'option1') {
        questions[index].options[1] = value;
    }
}

// 질문 저장
function saveQuestions() {
    // 로컬 스토리지에 저장
    localStorage.setItem('customQuestions', JSON.stringify(questions));
    alert('질문이 저장되었습니다!');
}

// 질문 복원
function resetQuestions() {
    if (confirm('기본 질문으로 복원하시겠습니까?')) {
        questions.length = 0;
        defaultQuestions.forEach(q => questions.push({...q}));
        localStorage.removeItem('customQuestions');
        loadQuestionEditor();
        alert('기본 질문으로 복원되었습니다!');
    }
}

// 결과 공유
function shareResult() {
    const resultTitle = document.getElementById('result-title').textContent;
    const resultDescription = document.getElementById('result-description').textContent;
    
    const shareText = `${userName}님의 나는 대문자T? 대문자F? 테스트 결과\n\n${resultTitle}\n${resultDescription}\n\n나도 테스트해보세요!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'MBTI T/F 심리테스트 결과',
            text: shareText,
            url: window.location.href
        });
    } else {
        // 클립보드에 복사
        navigator.clipboard.writeText(shareText).then(() => {
            alert('결과가 클립보드에 복사되었습니다!');
        }).catch(() => {
            // 폴백: 텍스트 선택
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('결과가 클립보드에 복사되었습니다!');
        });
    }
}

// 다시하기
function retryTest() {
    userNameInput.value = '';
    validateName();
    showPage(mainPage);
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 저장된 질문 불러오기
    const savedQuestions = localStorage.getItem('customQuestions');
    if (savedQuestions) {
        const parsed = JSON.parse(savedQuestions);
        questions.length = 0;
        parsed.forEach(q => questions.push(q));
    }
    
    // 이름 입력 필드 초기화
    validateName();
    
    // 광고 플레이스홀더 애니메이션
    const adPlaceholders = document.querySelectorAll('.ad-placeholder');
    adPlaceholders.forEach(placeholder => {
        placeholder.style.opacity = '0.7';
        setInterval(() => {
            placeholder.style.opacity = placeholder.style.opacity === '0.7' ? '1' : '0.7';
        }, 2000);
    });
}); 