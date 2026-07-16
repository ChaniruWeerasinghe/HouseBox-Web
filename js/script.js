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
    const formPanes = document.querySelectorAll('.search-form-pane');

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

            // Toggle forms
            const targetId = tab.getAttribute('data-target');
            if (targetId) {
                formPanes.forEach(pane => {
                    if (pane.id === targetId) {
                        pane.classList.remove('hidden');
                        pane.classList.add('flex');
                    } else {
                        pane.classList.add('hidden');
                        pane.classList.remove('flex');
                    }
                });
            }
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

    // 6. Intersection Observer for Image Reveals, Title Bounces, Location Cards, and Fade Animations
    const revealElements = document.querySelectorAll('.reveal-clip, .title-bounce, .location-reveal, .fade-up-reveal, .fade-right-reveal, .fade-left-reveal');
    
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
                        if (entry.target.classList.contains('reveal-clip') || entry.target.classList.contains('location-reveal') || entry.target.classList.contains('fade-up-reveal') || entry.target.classList.contains('fade-right-reveal') || entry.target.classList.contains('fade-left-reveal')) {
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
                        elContent.classList.remove('text-gray-200');
                        elContent.classList.add('text-gray-600');
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
                    content.classList.remove('text-gray-600');
                    content.classList.add('text-gray-200');
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
// Carousel logic for Featured Items section
document.addEventListener('DOMContentLoaded', () => {
    const featImg = document.getElementById('feat-img');
    const featInfoPanel = document.getElementById('feat-info-panel');
    
    if (featImg && featInfoPanel) {
        const featBadge1 = document.getElementById('feat-badge-1');
        const featBadge2 = document.getElementById('feat-badge-2');
        const featTitle = document.getElementById('feat-title');
        const featLocation = document.getElementById('feat-location');
        const featBeds = document.getElementById('feat-beds');
        const featBaths = document.getElementById('feat-baths');
        const featSqft = document.getElementById('feat-sqft');
        const featAgentImg = document.getElementById('feat-agent-img');
        const featAgentName = document.getElementById('feat-agent-name');
        const featPrice = document.getElementById('feat-price');

        const properties = [
            {
                img: 'assets/images/home/hero-left-bg-1.webp',
                badge1: 'Featured',
                badge2: 'For Rent',
                title: 'Rancho Vista Verde, Santos Barba',
                location: '742 Terrace, Springfield, IL 62704, USA',
                beds: 'x12 Beds',
                baths: 'x16 Baths',
                sqft: '1200 sq',
                agentImg: 'assets/images/home/clientdp.png',
                agentName: 'Alex Roberts',
                price: '$820,000'
            },
            {
                img: 'assets/images/home/hero-main.webp',
                badge1: 'Hot Deal',
                badge2: 'For Sale',
                title: 'Sunset Boulevard Estate, LA',
                location: '124 Sunset Blvd, Los Angeles, CA 90028',
                beds: 'x8 Beds',
                baths: 'x10 Baths',
                sqft: '3400 sq',
                agentImg: 'assets/images/home/clientdp.png',
                agentName: 'Sarah Jenkins',
                price: '$1,450,000'
            },
            {
                img: 'assets/images/home/thumb-1.webp',
                badge1: 'New',
                badge2: 'For Rent',
                title: 'Lakeside Cabin Retreat',
                location: '88 Lakeview Dr, Tahoe City, CA 96145',
                beds: 'x4 Beds',
                baths: 'x3 Baths',
                sqft: '2100 sq',
                agentImg: 'assets/images/home/clientdp.png',
                agentName: 'Michael Chang',
                price: '$4,200/mo'
            },
            {
                img: 'assets/images/home/thumb-2.webp',
                badge1: 'Luxury',
                badge2: 'For Sale',
                title: 'Modern Glass House',
                location: '900 Skyline Ave, Portland, OR 97221',
                beds: 'x6 Beds',
                baths: 'x7 Baths',
                sqft: '4500 sq',
                agentImg: 'assets/images/home/clientdp.png',
                agentName: 'Emily Clark',
                price: '$2,100,000'
            }
        ];

        let currentIndex = 0;

        function updateCarousel(index) {
            // Slide out to the left
            featInfoPanel.style.transition = 'all 0.3s ease-in-out';
            featInfoPanel.style.opacity = '0';
            featInfoPanel.style.transform = 'translateX(-40px)';

            setTimeout(() => {
                const prop = properties[index];
                
                featBadge1.textContent = prop.badge1;
                featBadge2.textContent = prop.badge2;
                featTitle.textContent = prop.title;
                featLocation.textContent = prop.location;
                featBeds.textContent = prop.beds;
                featBaths.textContent = prop.baths;
                featSqft.textContent = prop.sqft;
                featAgentImg.src = prop.agentImg;
                featAgentName.textContent = prop.agentName;
                featPrice.textContent = prop.price;

                // Snap to the right while invisible
                featInfoPanel.style.transition = 'none';
                featInfoPanel.style.transform = 'translateX(40px)';
                
                // Force a browser reflow to apply the instant transform
                void featInfoPanel.offsetWidth;

                // Slide into the center
                featInfoPanel.style.transition = 'all 0.3s ease-in-out';
                featInfoPanel.style.opacity = '1';
                featInfoPanel.style.transform = 'translateX(0)';
            }, 300); // Wait for slide out transition
        }

        // Loop automatically every 3 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % properties.length;
            updateCarousel(currentIndex);
        }, 3000);
    }
});
// -----------------------------------------------------
// Global Scroll-to-Top Button Logic
// -----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.getElementById('scroll-to-top');
    const progressCircle = document.getElementById('scroll-progress-circle');
    
    if (scrollBtn && progressCircle) {
        // Circumference = 2 * PI * r = 2 * 3.14159 * 46 = 289.02
        const circumference = 289.02;

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const scrollPercent = scrollTop / (docHeight - winHeight);
            
            // Show button after scrolling down 300px
            if (scrollTop > 300) {
                scrollBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
                scrollBtn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
            } else {
                scrollBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
                scrollBtn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
            }

            // Update SVG circle stroke dash offset
            // When scrollPercent = 0, offset = circumference (empty)
            // When scrollPercent = 1, offset = 0 (full)
            const drawLength = circumference * scrollPercent;
            progressCircle.style.strokeDashoffset = circumference - drawLength;
        });

        // Click to scroll top
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// -----------------------------------------------------
// CTA Banner Text Animation Logic
// -----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const ctaText = document.getElementById('cta-text-container');
    if (ctaText) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove initial offset/opacity classes
                    ctaText.classList.remove('-translate-x-[50px]', 'opacity-0');
                    // Add settled classes
                    ctaText.classList.add('translate-x-0', 'opacity-100');
                    
                    // Stop observing once animated
                    observer.unobserve(ctaText);
                }
            });
        }, {
            root: null,
            threshold: 0.2 // Trigger when 20% visible
        });
        
        observer.observe(ctaText);
    }
});

// -----------------------------------------------------
// Mobile Menu Logic
// -----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('mobile-menu-overlay');

    if (mobileBtn && closeBtn && mobileMenu && menuOverlay) {
        const toggleMenu = () => {
            const isOpen = !mobileMenu.classList.contains('-translate-x-full');
            
            if (isOpen) {
                // Close Menu
                mobileMenu.classList.add('-translate-x-full');
                menuOverlay.classList.remove('opacity-100');
                setTimeout(() => {
                    menuOverlay.classList.add('hidden');
                }, 300);
            } else {
                // Open Menu
                menuOverlay.classList.remove('hidden');
                // Force reflow
                void menuOverlay.offsetWidth;
                menuOverlay.classList.add('opacity-100');
                mobileMenu.classList.remove('-translate-x-full');
            }
        };

        mobileBtn.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);

        // Mobile Accordion Logic
        const accordions = mobileMenu.querySelectorAll('.mobile-accordion');
        accordions.forEach(acc => {
            const btn = acc.querySelector('.mobile-accordion-btn');
            const content = acc.querySelector('.mobile-accordion-content');
            const icon = acc.querySelector('svg');

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const isOpen = !content.classList.contains('hidden');

                // Close all others
                accordions.forEach(otherAcc => {
                    if (otherAcc !== acc) {
                        const otherContent = otherAcc.querySelector('.mobile-accordion-content');
                        const otherIcon = otherAcc.querySelector('svg');
                        if (otherContent && !otherContent.classList.contains('hidden')) {
                            otherContent.classList.add('hidden');
                            otherContent.classList.remove('flex');
                            if (otherIcon) otherIcon.classList.remove('rotate-180');
                        }
                    }
                });

                if (isOpen) {
                    content.classList.add('hidden');
                    content.classList.remove('flex');
                    if (icon) icon.classList.remove('rotate-180');
                } else {
                    content.classList.remove('hidden');
                    content.classList.add('flex');
                    if (icon) icon.classList.add('rotate-180');
                }
            });
        });
    }
});

// -----------------------------------------------------
// Mobile Search Widget Toggle Logic
// -----------------------------------------------------
window.toggleMobileSearch = function() {
    const toggleBtn = document.getElementById('mobile-search-toggle');
    const searchWidget = document.getElementById('search-widget-container');

    if (toggleBtn && searchWidget) {
        const isClosed = searchWidget.classList.contains('translate-y-full');
        
        if (isClosed) {
            // Open Widget
            searchWidget.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
            searchWidget.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
            
            // Hide Toggle Button
            toggleBtn.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
            toggleBtn.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
        } else {
            // Close Widget
            searchWidget.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
            searchWidget.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
            
            // Show Toggle Button
            toggleBtn.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
            toggleBtn.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
        }
    }
};

// Advanced Panel Toggle
window.toggleAdvancePanel = function(type) {
    const panel = document.getElementById('advanced-panel-' + type);
    const btn = document.getElementById('btn-advance-' + type);
    
    if (panel.classList.contains('hidden')) {
        // Open it
        panel.classList.remove('hidden');
        panel.classList.add('flex');
        
        // Change button to active (yellow)
        btn.classList.remove('bg-lightbg', 'hover:bg-gray-200', 'text-gray-800');
        btn.classList.add('bg-primary', 'hover:bg-[#b5c724]', 'text-black');
    } else {
        // Close it
        panel.classList.add('hidden');
        panel.classList.remove('flex');
        
        // Revert button
        btn.classList.add('bg-lightbg', 'hover:bg-gray-200', 'text-gray-800');
        btn.classList.remove('bg-primary', 'hover:bg-[#b5c724]', 'text-black');
    }
};


// Dual Range Slider Logic
document.addEventListener("DOMContentLoaded", function() {
    const sliders = document.querySelectorAll('.dual-slider');
    
    sliders.forEach(slider => {
        const thumb1 = slider.querySelector('.thumb-1');
        const thumb2 = slider.querySelector('.thumb-2');
        const track = slider.querySelector('.slider-track');
        const label = slider.previousElementSibling;
        const type = slider.getAttribute('data-type');
        
        function updateTrack() {
            let val1 = parseInt(thumb1.value);
            let val2 = parseInt(thumb2.value);
            const min = parseInt(thumb1.min);
            const max = parseInt(thumb1.max);
            
            // Prevent thumbs from crossing
            if (val1 > val2) {
                [val1, val2] = [val2, val1];
                thumb1.value = val1;
                thumb2.value = val2;
            }
            
            const percent1 = ((val1 - min) / (max - min)) * 100;
            const percent2 = ((val2 - min) / (max - min)) * 100;
            
            track.style.left = percent1 + '%';
            track.style.width = (percent2 - percent1) + '%';
            
            // Update label text
            if (label && type) {
                if (type === 'price') {
                    label.textContent = `Price Range: LKR ${val1.toLocaleString('en-LK')} - LKR ${val2.toLocaleString('en-LK')}`;
                } else if (type === 'size') {
                    label.textContent = `Size Range: ${val1.toLocaleString()} SqFt - ${val2.toLocaleString()} SqFt`;
                }
            }
        }
        
        thumb1.addEventListener('input', updateTrack);
        thumb2.addEventListener('input', updateTrack);
        
        updateTrack();
    });
});

// -----------------------------------------------------
// Grid/List View Toggle Logic
// -----------------------------------------------------
window.setViewMode = function(mode) {
    const container = document.getElementById('property-container');
    const gridBtn = document.getElementById('view-grid-btn');
    const listBtn = document.getElementById('view-list-btn');

    if (!container || !gridBtn || !listBtn) return;

    if (mode === 'list') {
        container.classList.remove('view-grid', 'md:grid-cols-2');
        container.classList.add('view-list');
        
        gridBtn.classList.remove('bg-primary', 'border-primary');
        gridBtn.classList.add('bg-white', 'border-gray-200');
        
        listBtn.classList.remove('bg-white', 'border-gray-200');
        listBtn.classList.add('bg-primary', 'border-primary');
    } else {
        container.classList.remove('view-list');
        container.classList.add('view-grid', 'md:grid-cols-2');
        
        gridBtn.classList.remove('bg-white', 'border-gray-200');
        gridBtn.classList.add('bg-primary', 'border-primary');
        
        listBtn.classList.remove('bg-primary', 'border-primary');
        listBtn.classList.add('bg-white', 'border-gray-200');
    }
};

// -----------------------------------------------------
// Property Sorting Logic
// -----------------------------------------------------
window.sortProperties = function(type, event) {
    if (event) event.preventDefault();
    
    const container = document.getElementById('property-container');
    const label = document.getElementById('current-sort-label');
    if (!container || !label) return;

    // Get all property cards (immediate children that are divs)
    const cards = Array.from(container.children).filter(child => child.tagName === 'DIV');
    
    // Sort visually by just reversing or shuffling (since we don't have real dates)
    if (type === 'newest') {
        label.textContent = 'Newest';
        cards.reverse().forEach(card => container.appendChild(card));
    } else if (type === 'oldest') {
        label.textContent = 'Oldest';
        cards.reverse().forEach(card => container.appendChild(card));
    } else {
        label.textContent = 'Sort by (Default)';
        cards.reverse().forEach(card => container.appendChild(card));
    }
    
    // Force dropdown to close visually by temporarily removing pointer-events
    const dropdown = label.closest('.group\\/sort-dropdown');
    if (dropdown) {
        const menu = dropdown.querySelector('.absolute');
        if (menu) {
            menu.style.display = 'none';
            setTimeout(() => { menu.style.display = ''; }, 100);
        }
    }
};
