// 콘텐츠 데이터 - 새로운 테스트 추가 시 여기에 등록
const contentList = [
    {
        id: 'mbti-tf-test',
        title: '나는 대문자T? 대문자F?',
        description: 'MBTI T/F 심리테스트',
        thumbnail: '🤖',
        url: 'test.html',
        isRecommended: true
    },
    {
        id: 'personality-test',
        title: '성격 유형 테스트',
        description: '나의 성격 알아보기',
        thumbnail: '🧠',
        url: '#',
        isRecommended: true
    },
    {
        id: 'love-test',
        title: '연애 스타일 테스트',
        description: '나의 연애 타입은?',
        thumbnail: '💕',
        url: '#',
        isRecommended: true
    },
    {
        id: 'career-test',
        title: '직업 적성 테스트',
        description: '나에게 맞는 직업 찾기',
        thumbnail: '💼',
        url: '#',
        isRecommended: false
    },
    {
        id: 'friendship-test',
        title: '친구 유형 테스트',
        description: '나는 어떤 친구일까?',
        thumbnail: '👥',
        url: '#',
        isRecommended: false
    }
];

// 전역 변수
let currentBannerIndex = 0;
const totalBanners = 3;
let bannerInterval;

// DOM 요소들
const sideMenu = document.getElementById('sideMenu');
const searchPopup = document.getElementById('searchPopup');
const searchInput = document.getElementById('searchInput');
const recommendedContent = document.getElementById('recommendedContent');
const allContent = document.getElementById('allContent');
const bannerSlider = document.getElementById('bannerSlider');

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    loadContent();
    initializeBanner();
    setupEventListeners();
});

// 페이지 초기화
function initializePage() {
    // 상단바 스크롤 효과
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// 콘텐츠 로드
function loadContent() {
    loadRecommendedContent();
    loadAllContent();
}

// 추천 콘텐츠 로드
function loadRecommendedContent() {
    const recommended = contentList.filter(item => item.isRecommended).slice(0, 3);
    recommendedContent.innerHTML = '';
    
    recommended.forEach(item => {
        const contentElement = createContentElement(item);
        recommendedContent.appendChild(contentElement);
    });
}

// 모든 콘텐츠 로드
function loadAllContent() {
    allContent.innerHTML = '';
    
    contentList.forEach(item => {
        const contentElement = createContentElement(item);
        allContent.appendChild(contentElement);
    });
}

// 콘텐츠 요소 생성
function createContentElement(item) {
    const div = document.createElement('div');
    div.className = 'content-item';
    div.innerHTML = `
        <div class="content-thumbnail">${item.thumbnail}</div>
        <div class="content-title">${item.title}</div>
        <div class="content-description">${item.description}</div>
    `;
    
    div.addEventListener('click', () => {
        if (item.url !== '#') {
            window.location.href = item.url;
        } else {
            alert('준비중인 콘텐츠입니다!');
        }
    });
    
    return div;
}

// 배너 슬라이더 초기화
function initializeBanner() {
    // 배너 자동 슬라이드
    bannerInterval = setInterval(nextBanner, 5000);
    
    // 인디케이터 클릭 이벤트
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showBanner(index);
        });
    });
    
    // 터치/드래그 이벤트 (간단한 구현)
    let startX = 0;
    let isDragging = false;
    
    bannerSlider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(bannerInterval);
    });
    
    bannerSlider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    bannerSlider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextBanner();
            } else {
                previousBanner();
            }
        }
        
        isDragging = false;
        bannerInterval = setInterval(nextBanner, 5000);
    });
    
    // 마우스 드래그 이벤트
    bannerSlider.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        clearInterval(bannerInterval);
        e.preventDefault();
    });
    
    bannerSlider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    bannerSlider.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        
        const endX = e.clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextBanner();
            } else {
                previousBanner();
            }
        }
        
        isDragging = false;
        bannerInterval = setInterval(nextBanner, 5000);
    });
    
    bannerSlider.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            bannerInterval = setInterval(nextBanner, 5000);
        }
    });
}

// 다음 배너로 이동
function nextBanner() {
    currentBannerIndex = (currentBannerIndex + 1) % totalBanners;
    showBanner(currentBannerIndex);
}

// 이전 배너로 이동
function previousBanner() {
    currentBannerIndex = (currentBannerIndex - 1 + totalBanners) % totalBanners;
    showBanner(currentBannerIndex);
}

// 배너 표시
function showBanner(index) {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    
    currentBannerIndex = index;
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 검색 입력 시 엔터 키 처리
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 편집 가능한 요소들 클릭 이벤트
    setupEditableElements();
}

// 편집 가능한 요소들 설정
function setupEditableElements() {
    const editableElements = document.querySelectorAll('.editable');
    
    editableElements.forEach(element => {
        element.addEventListener('click', () => {
            if (element.classList.contains('editing')) return;
            
            const originalText = element.textContent;
            element.classList.add('editing');
            element.contentEditable = true;
            element.focus();
            
            // 텍스트 선택
            const range = document.createRange();
            range.selectNodeContents(element);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            
            const finishEdit = () => {
                element.classList.remove('editing');
                element.contentEditable = false;
                element.removeEventListener('blur', finishEdit);
                element.removeEventListener('keypress', handleEnter);
            };
            
            const handleEnter = (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    finishEdit();
                }
            };
            
            element.addEventListener('blur', finishEdit);
            element.addEventListener('keypress', handleEnter);
        });
    });
}

// 상단으로 스크롤
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 사이드 메뉴 토글
function toggleSideMenu() {
    sideMenu.classList.toggle('active');
    
    // 배경 클릭 시 메뉴 닫기
    if (sideMenu.classList.contains('active')) {
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.3);
            z-index: 1000;
        `;
        
        overlay.addEventListener('click', () => {
            toggleSideMenu();
        });
        
        document.body.appendChild(overlay);
    } else {
        const overlay = document.querySelector('.menu-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
}

// 검색 팝업 열기
function openSearchPopup() {
    searchPopup.classList.add('active');
    searchInput.focus();
    toggleSideMenu(); // 사이드 메뉴 닫기
}

// 검색 팝업 닫기
function closeSearchPopup() {
    searchPopup.classList.remove('active');
    searchInput.value = '';
}

// 검색 수행
function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        alert('검색어를 입력해주세요.');
        return;
    }
    
    // 검색 결과 페이지로 이동
    showSearchResults(query);
    closeSearchPopup();
}

// 검색 결과 표시
function showSearchResults(query) {
    const searchPage = document.getElementById('search-page');
    const mainPage = document.getElementById('main-page');
    const searchQuery = document.getElementById('searchQuery');
    const searchResults = document.getElementById('searchResults');
    
    // 검색 수행
    const results = contentList.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    // 검색어 표시
    searchQuery.textContent = query;
    
    // 검색 결과 표시
    searchResults.innerHTML = '';
    
    if (results.length > 0) {
        results.forEach(item => {
            const contentElement = createContentElement(item);
            searchResults.appendChild(contentElement);
        });
    } else {
        searchResults.innerHTML = `
            <div class="no-results">
                <p>검색 결과가 없습니다.</p>
                <p>다른 검색어로 시도해보세요.</p>
            </div>
        `;
    }
    
    // 페이지 전환
    showPage(searchPage);
}

// 내 정보 페이지로 이동
function goToProfile() {
    const profilePage = document.getElementById('profile-page');
    showPage(profilePage);
    toggleSideMenu(); // 사이드 메뉴 닫기
}

// 홈으로 이동
function goToHome() {
    const mainPage = document.getElementById('main-page');
    showPage(mainPage);
}

// 페이지 전환
function showPage(targetPage) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    targetPage.classList.add('active');
    
    // 상단으로 스크롤
    scrollToTop();
}

// 새 콘텐츠 추가 (관리자용 함수)
function addNewContent(contentData) {
    contentList.push(contentData);
    loadContent(); // 콘텐츠 다시 로드
}

// 페이지 가시성 변경 시 배너 일시정지/재개
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(bannerInterval);
    } else {
        bannerInterval = setInterval(nextBanner, 5000);
    }
});

// 브라우저 크기 변경 시 반응형 처리
window.addEventListener('resize', () => {
    // 필요한 경우 배너 크기 조정 등의 처리
});

// 개인정보 처리방침 페이지 생성
function createPrivacyPage() {
    // privacy.html 파일이 없는 경우를 대비한 임시 처리
    const privacyLink = document.querySelector('.privacy-link');
    if (privacyLink) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('개인정보 처리방침 페이지는 준비 중입니다.');
        });
    }
}

// 초기화 시 개인정보 처리방침 링크 설정
document.addEventListener('DOMContentLoaded', createPrivacyPage); 
