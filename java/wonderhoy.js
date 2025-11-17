  // Manga data
        const mangaData = [
            { title: "Yuru CampAnthology Comic", rating: 4.9, chapters: 7, badge: "HOT", image: "yurucamp1203.jpg" },

        ];

        // Generate manga cards
        function generateMangaCards(containerId, mangaList) {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            
            mangaList.forEach((manga, index) => {
                const card = document.createElement('div');
                card.className = 'manga-card';
                card.style.animationDelay = `${index * 0.1}s`;
card.onclick = () => {
    window.location.href = `./titles.html?title=${encodeURIComponent(manga.title)}`;
};
                
               card.innerHTML = `
    <div class="manga-badge">${manga.badge}</div>
    <img src="assets/${manga.image}" alt="${manga.title}" class="manga-cover">
    <div class="manga-info">
        <div class="manga-title">${manga.title}</div>
        <div class="manga-meta">
            <span>Ch. ${manga.chapters}</span>
            <div class="manga-rating">
                <i class="fas fa-star"></i>
                <span>${manga.rating}</span>
            </div>
        </div>
    </div>
`;

                container.appendChild(card);
            });
        }

        // Initialize manga grids
        generateMangaCards('popularManga', mangaData);
        generateMangaCards('latestManga', mangaData.slice().reverse());

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Reader functions
        let currentPage = 1;
        const totalPages = 25;

        function openReader(title) {
            document.getElementById('homepage').style.display = 'none';
            document.getElementById('readerPage').style.display = 'block';
            document.querySelector('.reader-title').textContent = `${title} - Chapter ${Math.floor(Math.random() * 100)}`;
            showToast(`Membaca ${title}`);
        }

        function showHomepage() {
            document.getElementById('homepage').style.display = 'block';
            document.getElementById('readerPage').style.display = 'none';
        }

        function previousPage() {
            if (currentPage > 1) {
                currentPage--;
                updatePage();
            }
        }

        function nextPage() {
            if (currentPage < totalPages) {
                currentPage++;
                updatePage();
            }
        }

        function updatePage() {
            document.getElementById('currentPage').textContent = currentPage;
            const mangaPage = document.getElementById('mangaPage');
            mangaPage.src = `https://picsum.photos/seed/manga${currentPage}/800/1200`;
            
            // Loading effect
            mangaPage.style.opacity = '0.5';
            setTimeout(() => {
                mangaPage.style.opacity = '1';
            }, 300);
        }

        function toggleZoom() {
            const mangaPage = document.getElementById('mangaPage');
            mangaPage.classList.toggle('zoomed');
        }

        function toggleTheme() {
            document.body.classList.toggle('light-mode');
            const themeIcon = document.getElementById('themeIcon');
            const themeText = document.getElementById('themeText');
            
            if (document.body.classList.contains('light-mode')) {
                themeIcon.className = 'fas fa-sun';
                themeText.textContent = 'Mode Terang';
            } else {
                themeIcon.className = 'fas fa-moon';
                themeText.textContent = 'Mode Malam';
            }
        }

        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }

        function showToast(message) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMessage').textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('readerPage').style.display === 'block') {
                if (e.key === 'ArrowLeft') previousPage();
                if (e.key === 'ArrowRight') nextPage();
                if (e.key === 'Escape') showHomepage();
                if (e.key === 'z' || e.key === 'Z') toggleZoom();
            }
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Initialize animations
        document.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('.manga-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });

        const profileIcon = document.getElementById("profileIcon");
const profilePopup = document.getElementById("profilePopup");

profileIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    profilePopup.classList.toggle("active");
});

// Tutup popup jika klik di luar
document.addEventListener("click", (e) => {
    if (!profileIcon.contains(e.target) && !profilePopup.contains(e.target)) {
        profilePopup.classList.remove("active");
    }
});
