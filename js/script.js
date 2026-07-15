document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Load Navbar Component
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        fetch('components/navbar.html')
            .then(response => {
                if (!response.ok) throw new Error("Could not load navbar");
                return response.text();
            })
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                initializeNavbarLogic(); // Call logic related to navbar after it loads
            })
            .catch(error => console.error("Error loading component:", error));
    }

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

    // 4. Hero Background Slider and Sync Thumbnails
    const heroSlides = document.querySelectorAll('#hero-slider > div');
    const thumbContainer = document.getElementById('thumb-container');
    
    if (thumbContainer) {
        thumbContainer.style.transition = 'transform 0.5s ease-in-out';
    }

    if (heroSlides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            // Fade out current
            heroSlides[currentSlide].classList.remove('opacity-100');
            heroSlides[currentSlide].classList.add('opacity-0');
            
            // Move to next
            currentSlide = (currentSlide + 1) % heroSlides.length;
            
            // Fade in next
            heroSlides[currentSlide].classList.remove('opacity-0');
            heroSlides[currentSlide].classList.add('opacity-100');

            // Slide thumbnails up by exactly one circle + gap (80px + 20px = 100px)
            if (thumbContainer) {
                const thumbs = thumbContainer.children;
                if(thumbs.length > 1) {
                    // Update borders during the slide transition
                    thumbs[0].classList.remove('border-white');
                    thumbs[0].classList.add('border-dark');
                    
                    thumbs[1].classList.remove('border-dark');
                    thumbs[1].classList.add('border-white');
                }

                thumbContainer.style.transform = `translateY(-100px)`;
                
                setTimeout(() => {
                    // Disable transition to snap back invisibly
                    thumbContainer.style.transition = 'none';
                    
                    // Move the first element to the end to loop it
                    thumbContainer.appendChild(thumbContainer.firstElementChild);
                    thumbContainer.style.transform = 'translateY(0)';
                    
                    // Force browser to acknowledge the change without transition
                    void thumbContainer.offsetWidth;
                    
                    // Re-enable transition for the next cycle
                    thumbContainer.style.transition = 'transform 0.5s ease-in-out';
                }, 500); // Wait for the transition to finish
            }
        }, 2000); // changes every 2 seconds
    }

    // 5. Left Background Slider
    const leftSlides = document.querySelectorAll('#left-slider > div');
    if (leftSlides.length > 0) {
        let currentLeftSlide = 0;
        setInterval(() => {
            // Fade out current
            leftSlides[currentLeftSlide].classList.remove('opacity-20');
            leftSlides[currentLeftSlide].classList.add('opacity-0');
            
            // Move to next
            currentLeftSlide = (currentLeftSlide + 1) % leftSlides.length;
            
            // Fade in next
            leftSlides[currentLeftSlide].classList.remove('opacity-0');
            leftSlides[currentLeftSlide].classList.add('opacity-20');
        }, 3000); // changes every 3 seconds
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
