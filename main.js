/**
 * 手機版導航選單控制
 * 功能：點擊漢堡選單按鈕顯示/隱藏導航連結
 */

// 等待 DOM 內容載入完成
document.addEventListener('DOMContentLoaded', function() {
    // 取得元素
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // 確保元素存在
    if (!mobileBtn || !navLinks) {
        console.error('找不到必要的導航元素');
        return;
    }
    
    /**
     * 切換選單顯示狀態
     */
    function toggleMenu() {
        // 切換 active 類別
        navLinks.classList.toggle('active');
        
        // 切換按鈕圖示（☰ ↔ ✕）
        if (navLinks.classList.contains('active')) {
            mobileBtn.textContent = '✕';  // 選單開啟時顯示關閉符號
            mobileBtn.setAttribute('aria-label', '關閉選單');
        } else {
            mobileBtn.textContent = '☰';  // 選單關閉時顯示漢堡符號
            mobileBtn.setAttribute('aria-label', '開啟選單');
        }
    }
    
    /**
     * 關閉選單
     */
    function closeMenu() {
        navLinks.classList.remove('active');
        mobileBtn.textContent = '☰';
        mobileBtn.setAttribute('aria-label', '開啟選單');
    }
    
    // 1. 點擊漢堡選單按鈕
    mobileBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // 防止事件冒泡
        toggleMenu();
    });
    
    // 2. 點擊導航連結後自動關閉選單
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // 如果是錨點連結，可以平滑滾動
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
            closeMenu(); // 關閉選單
        });
    });
    
    // 3. 點擊頁面其他地方關閉選單
    document.addEventListener('click', function(e) {
        // 如果點擊的不是選單內部且不是按鈕本身，就關閉選單
        if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
            closeMenu();
        }
    });
    
    // 4. 視窗大小改變時，如果回到電腦版，自動關閉手機選單
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    // 5. 防止點擊選單內部時關閉（但保留連結功能）
    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // 6. 處理鍵盤存取性 (Esc 鍵關閉選單)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
});