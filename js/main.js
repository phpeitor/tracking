// Preloader Logic
$(window).on('load', function() {
    // Animate progress bar to full then remove preloader
    const progressBar = document.querySelector('.loader-progress-bar');
    if(progressBar) progressBar.style.width = '100%';
    
    setTimeout(function() {
        document.body.classList.add('loaded');
        
        // Remove from DOM after transition
        setTimeout(function() {
            const preloader = document.getElementById('preloader');
            if(preloader) preloader.style.display = 'none';
            window.dispatchEvent(new Event('preloader:complete'));
        }, 900);
    }, 900); // Wait for logo/bar animation
});

// Cargo Template Specific Scripts
$(document).ready(function() {
    
    // Swiper Initialization - Testimonials (Home)
    if($(".testimonials-slider").length) {
        var testimonialSwiper = new Swiper(".testimonials-slider", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 4,
                },
            },
        });
    }

    // Swiper Initialization - Team (About)
    if($(".team-slider").length) {
        var teamSwiper = new Swiper(".team-slider", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 3,
                },
            },
        });
    }

    if($(".home-hero-slider").length) {
        var homeHeroSlider = new Swiper(".home-hero-slider", {
            slidesPerView: 1,
            loop: true,
            effect: "fade",
            speed: 1100,
            autoplay: {
                delay: 5200,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".hero-slider-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".hero-slider-next",
                prevEl: ".hero-slider-prev",
            }
        });
    }

    // Scroll to Top with Progress
    var progressPath = document.querySelector('.progress-wrap path');
    if(progressPath) {
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        
        updateProgress();
        $(window).scroll(updateProgress);
        
        var offset = 50;
        var duration = 550;
        
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > offset) {
                $('.progress-wrap').addClass('active-progress');
            } else {
                $('.progress-wrap').removeClass('active-progress');
            }
        });
        
        $('.progress-wrap').on('click', function (event) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        });
    }

    // Header Scroll Effect
    const header = $('.cargo-header');
    
    function checkScroll() {
        if ($(window).scrollTop() > 50) {
            header.addClass('header-sticky');
        } else {
            header.removeClass('header-sticky');
        }
    }
    
    function checkFade() {
        $('.fade-on-scroll').not('.visible').each(function() {
            const elementTop = $(this).offset().top;
            const viewportBottom = $(window).scrollTop() + $(window).height();
            if (elementTop < viewportBottom - 50) {
                $(this).addClass('visible');
            }
        });
    }

    let fadeObserver = null;
    const supportsObserver = 'IntersectionObserver' in window;

    function initEntranceObservers() {
        if (!supportsObserver) return;
        if (!fadeObserver) {
            fadeObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                });
            }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
        }

        $('.fade-on-scroll').not('.visible').each(function() {
            fadeObserver.observe(this);
        });
    }

    let entranceAnimationsReady = false;

    function runEntranceAnimations() {
        if (!entranceAnimationsReady) return;
        if (supportsObserver) {
            initEntranceObservers();
            return;
        }
        checkFade();
    }

    let entranceTicking = false;
    function scheduleEntranceAnimations() {
        if (!entranceAnimationsReady || entranceTicking) return;
        entranceTicking = true;
        window.requestAnimationFrame(function() {
            runEntranceAnimations();
            entranceTicking = false;
        });
    }

    function activateEntranceAnimations() {
        if (entranceAnimationsReady) return;
        entranceAnimationsReady = true;
        runEntranceAnimations();
    }

    // Add fade class to sections
    $('section').not('.features-section, .hero-section, .page-header, .hero-slider-section').addClass('fade-on-scroll');
    
    // Always make the first section after page-header visible immediately so user doesn't have to scroll
    $('.page-header').next('section').addClass('visible');

    // Initial check
    checkScroll();
    if (!document.getElementById('preloader')) {
        activateEntranceAnimations();
    }
    $(window).on('preloader:complete', activateEntranceAnimations);
    
    // Scroll event
    $(window).on('scroll', function() {
        checkScroll();
        if (supportsObserver) return;
        scheduleEntranceAnimations();
    });

    // Side Panel Toggle
    $("#btn-extra").on("click", function() {
        $('#extra-wrap').addClass('open');
    });

    $("#btn-close").on("click", function() {
        $('#extra-wrap').removeClass('open');
    });

    const menuToggle = $('.menu-toggle');
    const mainNav = $('.main-nav');
    const body = $('body');

    function closeMobileMenu() {
        mainNav.removeClass('mobile-open');
        menuToggle.removeClass('active');
        $('.main-nav .has-child').removeClass('open');
        body.removeClass('mobile-menu-open');
    }

    menuToggle.on('click', function(e) {
        e.preventDefault();
        mainNav.toggleClass('mobile-open');
        menuToggle.toggleClass('active');
        body.toggleClass('mobile-menu-open', mainNav.hasClass('mobile-open'));
    });

    $('.main-nav .has-child > a').on('click', function(e) {
        if ($(window).width() <= 1124) {
            const rect = this.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const toggleZoneStart = rect.width - 52;
            if (clickX >= toggleZoneStart) {
                e.preventDefault();
                const parentItem = $(this).parent();
                parentItem.toggleClass('open');
                parentItem.siblings('.has-child').removeClass('open');
            }
        }
    });

    $('.main-nav a').on('click', function() {
        if ($(window).width() <= 1124 && !$(this).parent().hasClass('has-child')) {
            closeMobileMenu();
        }
    });

    $(document).on('click', function(e) {
        if ($(window).width() <= 1124 && !$(e.target).closest('.main-nav, .menu-toggle').length) {
            closeMobileMenu();
        }
    });

    $(window).on('resize', function() {
        if ($(window).width() > 1124) {
            closeMobileMenu();
        }
        if (supportsObserver) return;
        scheduleEntranceAnimations();
    });

    /* ==================================================
       # Counter Animation
    ================================================== */
    const $counters = $('.counter-animate');
    if ($counters.length) {
        const $win = $(window);
        let ticking = false;

        const animateCounter = (el) => {
            const $el = $(el);
            if ($el.data('counted')) return;
            const target = Number($el.data('target'));
            if (!Number.isFinite(target) || target <= 0) {
                $el.text('0');
                $el.data('counted', true);
                return;
            }

            $el.data('counted', true);
            const step = target / (2000 / 16);
            let current = 0;

            const tick = () => {
                current += step;
                if (current < target) {
                    $el.text(Math.ceil(current));
                    requestAnimationFrame(tick);
                } else {
                    $el.text(target);
                }
            };
            tick();
        };

        const isVisible = (el) => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;
            return rect.top <= vh * 0.9 && rect.bottom >= 0;
        };

        const checkCounters = () => {
            $counters.each((_, el) => {
                if (!$(el).data('counted') && isVisible(el)) animateCounter(el);
            });

            const pending = $counters.toArray().some(el => !$(el).data('counted'));
            if (!pending) {
                $win.off('scroll.counter resize.counter', scheduleCheck);
                window.removeEventListener('preloader:complete', scheduleCheck);
            }
        };

        const scheduleCheck = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                checkCounters();
                ticking = false;
            });
        };

        scheduleCheck();
        $win.on('scroll.counter resize.counter', scheduleCheck);
        $(window).on('preloader:complete', scheduleCheck);
    }

    /* ==================================================
       # Contact Form Handling
    ================================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const messageDiv = this.querySelector('.form-message');
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            if (messageDiv) messageDiv.innerHTML = '';
            submitBtn.innerHTML = '<span>Sending Message...</span>';
            submitBtn.disabled = true;

            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (messageDiv) messageDiv.innerHTML = `<div class="alert alert-success mt-3 form-alert-message">${data.message}</div>`;
                    this.reset();
                } else {
                    if (messageDiv) messageDiv.innerHTML = `<div class="alert alert-danger mt-3 form-alert-message">${data.message}</div>`;
                }
            })
            .catch(error => {
                if (messageDiv) messageDiv.innerHTML = `<div class="alert alert-danger mt-3 form-alert-message">An error occurred. Please try again.</div>`;
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    /* ==================================================
       # Quote Form Handling
    ================================================== */
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const messageDiv = this.querySelector('.form-message');
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            if (messageDiv) messageDiv.innerHTML = '';
            submitBtn.innerHTML = '<span>Sending Request...</span>';
            submitBtn.disabled = true;

            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (messageDiv) messageDiv.innerHTML = `<div class="alert alert-success mt-3 form-alert-message">${data.message}</div>`;
                    this.reset();
                } else {
                    if (messageDiv) messageDiv.innerHTML = `<div class="alert alert-danger mt-3 form-alert-message">${data.message}</div>`;
                }
            })
            .catch(error => {
                if (messageDiv) messageDiv.innerHTML = `<div class="alert alert-danger mt-3 form-alert-message">An error occurred. Please try again.</div>`;
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

});
