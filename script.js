// 页面加载完成后执行所有交互逻辑
window.addEventListener('DOMContentLoaded', function() {
    // 1. 导航栏滚动效果 - 滚动时收缩并加深背景
    const blogHeader = document.querySelector('.blog-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            blogHeader.style.background = 'rgba(15, 20, 35, 0.9)';
            blogHeader.style.height = '60px';
            blogHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            blogHeader.style.background = 'rgba(15, 20, 35, 0.7)';
            blogHeader.style.height = '70px';
            blogHeader.style.boxShadow = 'none';
        }
    });

    // 2. 导航栏平滑滚动与激活状态切换
    const navLinks = document.querySelectorAll('.blog-nav a');
    const sections = document.querySelectorAll('section[id]');

    // 导航点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // 获取目标区域ID
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            // 平滑滚动到目标区域
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });

            // 切换激活状态
            navLinks.forEach(item => item.classList.remove('nav-active'));
            this.classList.add('nav-active');
        });
    });

    // 滚动时更新导航激活状态
    window.addEventListener('scroll', function() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('nav-active');
            }
        });
    });

    // 3. 图片预览弹窗功能
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imgModal = document.getElementById('imgModal');
    const modalImg = document.getElementById('modalImg');
    const modalClose = document.getElementById('modalClose');

    // 点击图片打开弹窗
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            modalImg.setAttribute('src', imgSrc);
            modalImg.setAttribute('alt', this.querySelector('img').getAttribute('alt'));
            imgModal.style.display = 'flex';
            // 禁止页面滚动
            document.body.style.overflow = 'hidden';
        });
    });

    // 关闭弹窗
    modalClose.addEventListener('click', function() {
        imgModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 点击弹窗外区域关闭弹窗
    imgModal.addEventListener('click', function(e) {
        if (e.target === imgModal) {
            imgModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 4. 页面初始化动画 - 元素渐入
    const animateElements = document.querySelectorAll('.section-title, .profile-card, .works-card, .stage-card, .gallery-item');
    animateElements.forEach((elem, index) => {
        elem.style.opacity = '0';
        elem.style.transform = 'translateY(30px)';
        setTimeout(() => {
            elem.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            elem.style.opacity = '1';
            elem.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // 5. 按钮悬浮增强动画
    const btnPrimary = document.querySelector('.btn-primary');
    if (btnPrimary) {
        btnPrimary.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        btnPrimary.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});