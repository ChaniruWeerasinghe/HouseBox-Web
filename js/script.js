document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard ease out
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Request Animation Frame loop for Lenis
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // 1. Navbar Logic (now hardcoded in index.html)

    // 2. Search Tabs Logic
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active styles from all tabs
            tabs.forEach(t => {
                t.classList.remove('active', 'bg-primary', 'text-black');
                t.classList.add('bg-lightbg', 'text-gray-800');
            });
            // Add active styles to clicked tab
            tab.classList.remove('bg-lightbg', 'text-gray-800');
            tab.classList.add('active', 'bg-primary', 'text-black');
        });
    });

    // 3. Custom Select Interactivity (Visual only for now)
    const selects = document.querySelectorAll('.custom-select');
    selects.forEach(select => {
        select.addEventListener('click', () => {
            select.style.borderColor = '#ffc107'; // yellow border on click
            setTimeout(() => {
                select.style.borderColor = 'transparent';
            }, 300);
        });
    });

    // 4. Dual Hero Background Sliders with Ken Burns Zoom and Thumbnails
    const heroSlides = document.querySelectorAll('#hero-slider > div');
    const leftSlides = document.querySelectorAll('#left-slider > div');
    const thumbContainer = document.getElementById('thumb-container');
    
    if (thumbContainer) {
        thumbContainer.style.transition = 'transform 0.5s ease-in-out';
    }

    // --- Right Slider (3 seconds) ---
    if (heroSlides.length > 0) {
        let currentRightSlide = 0;
        setInterval(() => {
            // Remove active from current
            heroSlides[currentRightSlide].classList.remove('active');
            
            // Move to next
            currentRightSlide = (currentRightSlide + 1) % heroSlides.length;
            
            // Add active to next
            heroSlides[currentRightSlide].classList.add('active');

            // Slide thumbnails up by exactly one circle + gap (80px + 20px = 100px)
            if (thumbContainer) {
                thumbContainer.style.transform = `translateY(-100px)`;
                
                setTimeout(() => {
                    // Disable transition to snap back invisibly
                    thumbContainer.style.transition = 'none';
                    
                    // Move the first thumb to the end of the list
                    const firstThumb = thumbContainer.firstElementChild;
                    thumbContainer.appendChild(firstThumb);
                    
                    // Reset transform immediately
                    thumbContainer.style.transform = `translateY(0)`;
                    
                    // Restore transition for the next slide
                    setTimeout(() => {
                        thumbContainer.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }, 500); // 500ms matches the transition duration
            }
        }, 3000);
    }

    // --- Left Slider (4 seconds) ---
    if (leftSlides.length > 0) {
        let currentLeftSlide = 0;
        setInterval(() => {
            // Remove active from current
            leftSlides[currentLeftSlide].classList.remove('active');
            
            // Move to next
            currentLeftSlide = (currentLeftSlide + 1) % leftSlides.length;
            
            // Add active to next
            leftSlides[currentLeftSlide].classList.add('active');
            
            // Trigger staggered text animation
            const heroTexts = document.querySelectorAll('.hero-text-anim');
            heroTexts.forEach(t => {
                t.classList.remove('animate-text');
                void t.offsetWidth; // trigger reflow to restart animation
                t.classList.add('animate-text');
            });
        }, 4500);
    }

    // 5. Search Overlay Logic
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchBackdrop = document.getElementById('search-backdrop');
    const searchBox = document.getElementById('search-box');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');

    if (searchBtn && searchOverlay) {
        function openSearch() {
            searchOverlay.classList.remove('pointer-events-none');
            searchOverlay.classList.add('pointer-events-auto');
            searchBackdrop.classList.remove('opacity-0');
            searchBackdrop.classList.add('opacity-100');
            searchBox.classList.remove('-translate-y-full');
            searchBox.classList.add('translate-y-0');
            setTimeout(() => searchInput.focus(), 300);
        }
        
        function closeSearch() {
            searchOverlay.classList.remove('pointer-events-auto');
            searchOverlay.classList.add('pointer-events-none');
            searchBackdrop.classList.remove('opacity-100');
            searchBackdrop.classList.add('opacity-0');
            searchBox.classList.remove('translate-y-0');
            searchBox.classList.add('-translate-y-full');
        }

        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openSearch();
        });

        searchClose.addEventListener('click', closeSearch);
        searchBackdrop.addEventListener('click', closeSearch);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('pointer-events-auto')) {
                closeSearch();
            }
        });
    }

    // 6. Intersection Observer for Image Reveals, Title Bounces, and Location Cards
    const revealElements = document.querySelectorAll('.reveal-clip, .title-bounce, .location-reveal');
    
    // Pre-process title-bounce elements for letter-by-letter animation
    document.querySelectorAll('.title-bounce').forEach(title => {
        // Keep <br> intact by splitting on it first
        const lines = title.innerHTML.split(/<br\s*\/?>/i);
        let charIndex = 0;
        
        const newHTML = lines.map(line => {
            return line.split('').map(char => {
                // Ignore spaces so they don't break layout or animate weirdly
                if (char === ' ' || char === '\n') return char;
                
                // Wrap each letter in a span with a staggered delay
                const delay = (charIndex * 0.04).toFixed(2);
                charIndex++;
                return `<span class="bounce-letter" style="animation-delay: ${delay}s">${char}</span>`;
            }).join('');
        }).join('<br>');
        
        title.innerHTML = newHTML;
    });

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        if (entry.target.classList.contains('reveal-clip') || entry.target.classList.contains('location-reveal')) {
                            entry.target.classList.add('is-revealed');
                        }
                        if (entry.target.classList.contains('title-bounce')) {
                            entry.target.classList.add('is-bouncing');
                        }
                    }, 150);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1, // Trigger when 10% is visible
            rootMargin: '0px 0px -50px 0px' 
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 7. Intersection Observer for Stats Counters
    const statCounters = document.querySelectorAll('.stat-counter');
    if (statCounters.length > 0) {
        const statObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    let current = 0;
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // roughly 60fps

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            entry.target.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.innerText = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.5 // Trigger when stats are halfway visible
        });

        statCounters.forEach(counter => statObserver.observe(counter));
    }

    // 8. Locations Image Swapping Animation
    const swapGroupA = document.querySelectorAll('[data-swap-group="A"]');
    const swapGroupB = document.querySelectorAll('[data-swap-group="B"]');
    
    if (swapGroupA.length > 0 && swapGroupB.length > 0) {
        let toggleA = true;
        
        function swapImages(cards) {
            cards.forEach(card => {
                const imgFront = card.querySelector('.img-front');
                const imgBack = card.querySelector('.img-back');
                if (!imgFront || !imgBack) return;
                
                const images = card.dataset.images.split(',');
                let currentIndex = parseInt(card.dataset.currentIndex || '0');
                let nextIndex = (currentIndex + 1) % images.length;
                card.dataset.currentIndex = nextIndex;
                
                // Set the bottom image to the next picture
                imgBack.src = `assets/images/home/${images[nextIndex]}`;
                
                // Fade out the top image to reveal the bottom one
                imgFront.style.opacity = '0';
                
                // After fade finishes (700ms), snap top image to the new one and reset opacity
                setTimeout(() => {
                    imgFront.src = imgBack.src;
                    imgFront.style.opacity = '1';
                }, 750); 
            });
        }
        
        // Run swap every 1.5 seconds alternating between group A and B
        setInterval(() => {
            if (toggleA) {
                swapImages(swapGroupA);
            } else {
                swapImages(swapGroupB);
            }
            toggleA = !toggleA;
        }, 1500);
    }

    // 9. Accordion Menu Logic
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            item.addEventListener('click', () => {
                // If clicking an already active item, do nothing (keep it open) or toggle?
                // Standard accordions toggle, but screenshots imply one is always active.
                
                // Remove active styles from all items
                accordionItems.forEach(el => {
                    el.classList.remove('active', 'bg-[#0f4a47]', 'text-white');
                    el.classList.add('bg-white', 'text-gray-900');
                    
                    const elIconWrapper = el.querySelector('.icon-wrapper');
                    if(elIconWrapper) {
                        elIconWrapper.classList.remove('bg-white');
                        elIconWrapper.classList.add('bg-[#0f4a47]');
                        
                        const elSvg = elIconWrapper.querySelector('svg');
                        if (elSvg) {
                            elSvg.classList.remove('text-gray-900');
                            elSvg.classList.add('text-white');
                            // Replace UP arrow with DOWN arrow
                            elSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>';
                        }
                    }
                    
                    const elContent = el.querySelector('.accordion-content');
                    if(elContent) {
                        elContent.classList.add('hidden');
                    }
                });
                
                // Add active styles to clicked item
                item.classList.remove('bg-white', 'text-gray-900');
                item.classList.add('active', 'bg-[#0f4a47]', 'text-white');
                
                const iconWrapper = item.querySelector('.icon-wrapper');
                if(iconWrapper) {
                    iconWrapper.classList.remove('bg-[#0f4a47]');
                    iconWrapper.classList.add('bg-white');
                    
                    const svg = iconWrapper.querySelector('svg');
                    if (svg) {
                        svg.classList.remove('text-white');
                        svg.classList.add('text-gray-900');
                        // Replace DOWN arrow with UP arrow
                        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>';
                    }
                }
                
                const content = item.querySelector('.accordion-content');
                if(content) {
                    content.classList.remove('hidden');
                }
            });
        });
    }
});

// Logic that applies to the dynamically loaded navbar
function initializeNavbarLogic() {
    const siteLogo = document.getElementById('site-logo');
    if (siteLogo) {
        siteLogo.addEventListener('error', function() {
            this.style.display = 'none';
            const parent = this.parentElement;
            if(!parent.querySelector('.logo-fallback')) {
                const fallback = document.createElement('span');
                fallback.className = 'logo-fallback';
                fallback.innerText = 'HOUSEBOX';
                fallback.style.fontSize = '20px';
                fallback.style.fontWeight = '700';
                fallback.style.color = '#1f2937';
                fallback.style.marginLeft = '8px';
                parent.appendChild(fallback);
            }
        });
    }
}
