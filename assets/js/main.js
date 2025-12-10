document.addEventListener('DOMContentLoaded', () => {
    // Loading Animation
    const loadingScreen = document.getElementById('loading-screen');
    const decryptionText = document.getElementById('decryption-text');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingStatus = document.querySelector('.loading-status');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const messages = ['INITIALIZING SYSTEM...', 'ACCESSING DATABASE...', 'DECRYPTING FILES...', 'ESTABLISHING CONNECTION...', 'ACCESS GRANTED'];

    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';

    let messageIndex = 0;

    // Function to animate random characters before settling on the text
    function animateText(element, targetText, callback) {
        let iterations = 0;
        const interval = setInterval(() => {
            element.innerText = targetText
                .split('')
                .map((letter, index) => {
                    if (index < iterations) {
                        return targetText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iterations >= targetText.length) {
                clearInterval(interval);
                if (callback) callback();
            }

            iterations += 1 / 3;
        }, 30);
    }

    // Sequence of animations
    function startLoadingSequence() {
        let progress = 0;

        // Update progress bar
        const progressInterval = setInterval(() => {
            progress += 1;
            if(loadingBar) loadingBar.style.width = `${progress}%`;

            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, 40);

        // Update status text
        const statusInterval = setInterval(() => {
            if (messageIndex < messages.length - 1) {
                messageIndex++;
                animateText(decryptionText, messages[messageIndex]);

                // Update small status text
                if(loadingStatus) {
                    const statuses = ['Loading modules...', 'Verifying keys...', 'Bypassing firewalls...', 'Rendering assets...'];
                    loadingStatus.innerText = statuses[messageIndex % statuses.length];
                }
            } else {
                clearInterval(statusInterval);
                finishLoading();
            }
        }, 1000);
    }

    function finishLoading() {
        setTimeout(() => {
            if(loadingScreen) {
                loadingScreen.style.transition = 'opacity 0.5s ease';
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 500);
            }
        }, 500);
    }

    // Start the animation
    startLoadingSequence();

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('fa-bars');
            menuBtn.classList.toggle('fa-times');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuBtn.classList.remove('fa-times');
                    menuBtn.classList.add('fa-bars');
                }
            }
        });
    });

    // Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
});
