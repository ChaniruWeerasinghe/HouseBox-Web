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

    // 4. Hero Background Slider
    const heroSlides = document.querySelectorAll('#hero-slider > div');
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
        }, 2000); // changes every 2 seconds
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
