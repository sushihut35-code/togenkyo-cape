// ===================================
// Togenkyo Cape - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initNavigation();
    initSmoothScroll();
    initScrollAnimation();
    initGallery();
    initInstagramFeed();
});

// ===================================
// Header scroll effect
// ===================================
function initHeader() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===================================
// Mobile navigation toggle
// ===================================
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = navLinks.querySelectorAll('a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ===================================
// Smooth scroll for anchor links
// ===================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Scroll animations
// ===================================
function initScrollAnimation() {
    const animateElements = document.querySelectorAll(
        '.feature-card, .gallery-item, .info-card, .stat-item, .season-card, .nature-item, .tip-card, .highlight-card, .instagram-post'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// ===================================
// Gallery functionality
// ===================================
function initGallery() {
    console.log('initGallery called');
    const galleryItems = document.querySelectorAll('.gallery-item');
    console.log('galleryItems found:', galleryItems.length);

    // ライトボックス機能
    galleryItems.forEach((item, index) => {
        console.log(`Adding click listener to item ${index}`);
        item.addEventListener('click', function() {
            console.log('Gallery item clicked');
            const img = this.querySelector('img');
            console.log('img found:', img);
            if (img) {
                console.log('Creating lightbox with:', img.src, img.alt);
                createLightbox(img.src, img.alt);
            }
        });
    });

    // 「もっと見る」ボタン機能
    const showMoreBtn = document.getElementById('gallery-show-more-btn');
    const galleryGrid = document.querySelector('.gallery-grid');

    // 写真が9枚以上ある場合、「もっと見る」ボタンを表示
    if (galleryItems.length > 9 && showMoreBtn) {
        showMoreBtn.style.display = 'inline-block';

        // 9枚目以降を非表示に
        galleryItems.forEach((item, index) => {
            if (index >= 9) {
                item.classList.add('hidden');
            }
        });

        // ボタンクリックで全て表示
        showMoreBtn.addEventListener('click', function() {
            galleryItems.forEach(item => {
                item.classList.remove('hidden');
            });
            galleryGrid.classList.add('show-all');

            // ボタンを非表示に
            this.style.display = 'none';

            // スムーズに最後の写真へスクロール
            const lastItem = galleryItems[galleryItems.length - 1];
            if (lastItem) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = lastItem.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    } else if (showMoreBtn) {
        // 写真が9枚以下の場合はボタンを非表示
        showMoreBtn.style.display = 'none';
    }
}

function createLightbox(src, alt) {
    console.log('createLightbox called with:', src, alt);
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close" aria-label="閉じる">&times;</button>
        </div>
    `;

    // Add to body
    document.body.appendChild(lightbox);
    console.log('lightbox added to body');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Close on close button click
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', function() {
        closeLightbox(lightbox);
    });

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox(lightbox);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeLightbox(lightbox);
            document.removeEventListener('keydown', closeOnEscape);
        }
    });

    // Add active class for animation
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
}

function closeLightbox(lightbox) {
    lightbox.style.opacity = '0';
    lightbox.style.transition = 'opacity 0.3s ease';

    setTimeout(function() {
        if (lightbox && lightbox.parentNode) {
            lightbox.parentNode.removeChild(lightbox);
        }
        document.body.style.overflow = '';
    }, 300);
}

// ===================================
// Instagram Feed
// ===================================

// Instagramアクセストークン（ここに取得したトークンを貼り付けてください）
const INSTAGRAM_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN_HERE';

function initInstagramFeed() {
    const feedContainer = document.getElementById('instagram-feed');

    // アクセストークンが設定されていない場合
    if (INSTAGRAM_ACCESS_TOKEN === 'YOUR_ACCESS_TOKEN_HERE') {
        feedContainer.innerHTML = `
            <div class="loading">
                <p>📸 Instagram連携の準備中です</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">
                    アクセストークンを設定すると、Instagramの投稿が自動的に表示されます。
                </p>
            </div>
        `;
        return;
    }

    // Instagram APIから投稿を取得
    fetchInstagramPosts(feedContainer);
}

async function fetchInstagramFeed(container) {
    try {
        // Instagram Basic Display APIのエンドポイント
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=9`);

        if (!response.ok) {
            throw new Error('Instagram APIリクエスト失敗');
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        // 投稿を表示
        displayInstagramPosts(data.data, container);

    } catch (error) {
        console.error('Instagramフィードの取得に失敗しました:', error);
        container.innerHTML = `
            <div class="loading">
                <p>⚠️ Instagramフィードの読み込みエラー</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">
                    エラー: ${error.message}
                </p>
                <p style="font-size: 0.9rem; margin-top: 10px;">
                    アクセストークンの有効期限が切れている可能性があります。
                </p>
            </div>
        `;
    }
}

function displayInstagramPosts(posts, container) {
    // 投稿がない場合
    if (!posts || posts.length === 0) {
        container.innerHTML = `
            <div class="loading">
                <p>📷 投稿がまだありません</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">
                    Instagramに投稿すると、ここに表示されます。
                </p>
            </div>
        `;
        return;
    }

    // HTMLを生成
    const postsHtml = posts.map(post => {
        // 日時をフォーマット
        const date = new Date(post.timestamp);
        const formattedDate = date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // キャプション（最初の100文字のみ）
        const caption = post.caption
            ? post.caption.substring(0, 150) + (post.caption.length > 150 ? '...' : '')
            : '';

        return `
            <div class="instagram-post">
                <a href="${post.permalink}" target="_blank" rel="noopener noreferrer">
                    <img src="${post.media_url}" alt="Instagram投稿" class="instagram-post-image">
                </a>
                <div class="instagram-post-content">
                    <p class="instagram-post-caption">${escapeHtml(caption)}</p>
                    <span class="instagram-post-date">${formattedDate}</span>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = postsHtml;
}

// HTMLエスケープ
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
