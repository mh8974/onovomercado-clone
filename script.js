document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Insert button before nav
        header.insertBefore(mobileMenuBtn, nav);
        
        // Toggle menu on click
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change icon based on menu state
            if (nav.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 992px) {
                nav {
                    display: block;
                    position: fixed;
                    top: 70px;
                    left: 0;
                    width: 100%;
                    background-color: #fff;
                    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                    padding: 20px;
                    transform: translateY(-150%);
                    transition: transform 0.3s ease;
                    z-index: 999;
                }
                
                nav.active {
                    transform: translateY(0);
                }
                
                nav ul {
                    flex-direction: column;
                }
                
                nav ul li {
                    margin: 0 0 15px 0;
                }
                
                .mobile-menu-btn {
                    display: block;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #333;
                }
            }
            
            @media (min-width: 993px) {
                .mobile-menu-btn {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Form submission handling
    const setupFormSubmission = () => {
        const profileForm = document.getElementById('profile-form');
        
        if (profileForm) {
            profileForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(profileForm);
                const formButton = profileForm.querySelector('button[type="submit"]');
                
                // Show submitting state
                const originalButtonText = formButton.textContent;
                formButton.textContent = 'Enviando...';
                formButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Reset form
                    profileForm.reset();
                    
                    // Show success message
                    const formContainer = document.querySelector('.form-container');
                    formContainer.innerHTML = '<h3>Obrigado pelo seu interesse!</h3><p>Em breve entraremos em contato com mais informações sobre o seu perfil profissional.</p>';
                }, 1500);
            });
        }
    };
    
    // Smooth scrolling for anchor links
    const setupSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId !== '#') {
                    e.preventDefault();
                    
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Account for header height
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    };
    
    // Add sticky header effect
    const setupStickyHeader = () => {
        const header = document.querySelector('header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
                
                // Hide header when scrolling down, show when scrolling up
                if (scrollTop > lastScrollTop) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.classList.remove('scrolled');
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Add styles for scrolled header
        const style = document.createElement('style');
        style.textContent = `
            header {
                transition: transform 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease;
            }
            
            header.scrolled {
                padding: 10px 0;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
        `;
        document.head.appendChild(style);
    };
    
    // Cookie notice handling
    const setupCookieNotice = () => {
        const cookieNotice = document.querySelector('.cookie-notice');
        
        if (cookieNotice && !localStorage.getItem('cookieAccepted')) {
            // Create accept button
            const acceptButton = document.createElement('button');
            acceptButton.classList.add('btn', 'primary');
            acceptButton.textContent = 'Aceitar';
            acceptButton.style.marginTop = '10px';
            acceptButton.style.padding = '8px 16px';
            acceptButton.style.fontSize = '0.85rem';
            
            cookieNotice.appendChild(acceptButton);
            
            // Show cookie notice with animation
            setTimeout(() => {
                cookieNotice.style.display = 'block';
                cookieNotice.style.animation = 'slideUp 0.5s forwards';
            }, 1000);
            
            // Add animation styles
            const style = document.createElement('style');
            style.textContent = `
                .cookie-notice {
                    display: none;
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    max-width: 90%;
                    width: 500px;
                    z-index: 1000;
                }
                
                @keyframes slideUp {
                    from {
                        transform: translate(-50%, 100%);
                        opacity: 0;
                    }
                    to {
                        transform: translate(-50%, 0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Handle accept button click
            acceptButton.addEventListener('click', () => {
                localStorage.setItem('cookieAccepted', 'true');
                cookieNotice.style.animation = 'slideDown 0.5s forwards';
                
                // Add slideDown animation
                const slideDownStyle = document.createElement('style');
                slideDownStyle.textContent = `
                    @keyframes slideDown {
                        from {
                            transform: translate(-50%, 0);
                            opacity: 1;
                        }
                        to {
                            transform: translate(-50%, 100%);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(slideDownStyle);
                
                // Remove notice after animation
                setTimeout(() => {
                    cookieNotice.style.display = 'none';
                }, 500);
            });
        }
    };
    
    // Initialize all functionality
    createMobileMenu();
    setupFormSubmission();
    setupSmoothScrolling();
    setupStickyHeader();
    setupCookieNotice();
});
