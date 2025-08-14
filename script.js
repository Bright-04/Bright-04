// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
	// Initialize all functionality
	initNavigation();
	initScrollAnimations();
	initSkillBars();
	initStatsCounter();
	initContactForm();
	initParallaxEffects();
	initTypingEffect();
});

// Navigation functionality
function initNavigation() {
	const hamburger = document.querySelector(".hamburger");
	const navMenu = document.querySelector(".nav-menu");
	const navLinks = document.querySelectorAll(".nav-link");

	// Mobile menu toggle
	hamburger.addEventListener("click", function () {
		hamburger.classList.toggle("active");
		navMenu.classList.toggle("active");
	});

	// Close mobile menu when clicking on a link
	navLinks.forEach((link) => {
		link.addEventListener("click", function () {
			hamburger.classList.remove("active");
			navMenu.classList.remove("active");
		});
	});

	// Smooth scrolling for navigation links
	navLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			const targetId = this.getAttribute("href");
			const targetSection = document.querySelector(targetId);

			if (targetSection) {
				const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
				window.scrollTo({
					top: offsetTop,
					behavior: "smooth",
				});
			}
		});
	});

	// Navbar background on scroll
	window.addEventListener("scroll", function () {
		const navbar = document.querySelector(".navbar");
		if (window.scrollY > 100) {
			navbar.style.background = "rgba(255, 255, 255, 0.98)";
			navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
		} else {
			navbar.style.background = "rgba(255, 255, 255, 0.95)";
			navbar.style.boxShadow = "none";
		}
	});
}

// Scroll animations
function initScrollAnimations() {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
			}
		});
	}, observerOptions);

	// Observe elements for animation
	const animatedElements = document.querySelectorAll(".about-card, .skill-category, .project-card, .contact-item");
	animatedElements.forEach((el) => {
		el.classList.add("fade-in");
		observer.observe(el);
	});

	// Observe stats for counter animation
	const statNumbers = document.querySelectorAll(".stat-number");
	statNumbers.forEach((el) => {
		observer.observe(el);
	});
}

// Skill bars animation
function initSkillBars() {
	const skillBars = document.querySelectorAll(".skill-progress");

	const skillObserver = new IntersectionObserver(
		function (entries) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const progress = entry.target;
					const targetWidth = progress.getAttribute("data-progress");
					progress.style.width = targetWidth + "%";
				}
			});
		},
		{ threshold: 0.5 }
	);

	skillBars.forEach((bar) => {
		skillObserver.observe(bar);
	});
}

// Stats counter animation
function initStatsCounter() {
	const statNumbers = document.querySelectorAll(".stat-number");

	statNumbers.forEach((stat) => {
		const target = parseInt(stat.getAttribute("data-target"));
		const duration = 2000; // 2 seconds
		const increment = target / (duration / 16); // 60fps
		let current = 0;

		const updateCounter = () => {
			current += increment;
			if (current < target) {
				stat.textContent = Math.floor(current);
				requestAnimationFrame(updateCounter);
			} else {
				stat.textContent = target;
			}
		};

		// Start animation when element comes into view
		const statObserver = new IntersectionObserver(
			function (entries) {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						updateCounter();
						statObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.5 }
		);

		statObserver.observe(stat);
	});
}

// Contact form handling
function initContactForm() {
	const contactForm = document.getElementById("contactForm");

	if (contactForm) {
		contactForm.addEventListener("submit", function (e) {
			e.preventDefault();

			// Get form data
			const formData = new FormData(this);
			const submitButton = this.querySelector('button[type="submit"]');
			const originalText = submitButton.textContent;

			// Show loading state
			submitButton.innerHTML = '<span class="loading"></span> Sending...';
			submitButton.disabled = true;

			// Simulate form submission (replace with actual form handling)
			setTimeout(() => {
				// Show success message
				showNotification("Message sent successfully! I'll get back to you soon.", "success");

				// Reset form
				this.reset();

				// Reset button
				submitButton.textContent = originalText;
				submitButton.disabled = false;
			}, 2000);
		});
	}
}

// Parallax effects
function initParallaxEffects() {
	const floatingCards = document.querySelectorAll(".floating-card");

	window.addEventListener("scroll", function () {
		const scrolled = window.pageYOffset;

		floatingCards.forEach((card) => {
			const speed = card.getAttribute("data-speed");
			const yPos = -((scrolled * speed) / 10);
			card.style.transform = `translateY(${yPos}px)`;
		});
	});
}

// Typing effect
function initTypingEffect() {
	const typingText = document.querySelector(".typing-text");
	if (typingText) {
		const text = typingText.textContent;
		typingText.textContent = "";

		let i = 0;
		const typeWriter = () => {
			if (i < text.length) {
				typingText.textContent += text.charAt(i);
				i++;
				setTimeout(typeWriter, 100);
			}
		};

		// Start typing effect after a delay
		setTimeout(typeWriter, 1000);
	}
}

// Notification system
function showNotification(message, type = "info") {
	// Remove existing notifications
	const existingNotifications = document.querySelectorAll(".notification");
	existingNotifications.forEach((notification) => notification.remove());

	// Create notification element
	const notification = document.createElement("div");
	notification.className = `notification notification-${type}`;
	notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

	// Add styles
	notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#3b82f6"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        max-width: 400px;
    `;

	// Add to page
	document.body.appendChild(notification);

	// Animate in
	setTimeout(() => {
		notification.style.transform = "translateX(0)";
	}, 100);

	// Close button functionality
	const closeButton = notification.querySelector(".notification-close");
	closeButton.addEventListener("click", () => {
		notification.style.transform = "translateX(100%)";
		setTimeout(() => notification.remove(), 300);
	});

	// Auto remove after 5 seconds
	setTimeout(() => {
		if (notification.parentNode) {
			notification.style.transform = "translateX(100%)";
			setTimeout(() => notification.remove(), 300);
		}
	}, 5000);
}

// Smooth scroll for all internal links
document.addEventListener("click", function (e) {
	if (e.target.tagName === "A" && e.target.getAttribute("href").startsWith("#")) {
		e.preventDefault();
		const targetId = e.target.getAttribute("href");
		const targetElement = document.querySelector(targetId);

		if (targetElement) {
			const offsetTop = targetElement.offsetTop - 70;
			window.scrollTo({
				top: offsetTop,
				behavior: "smooth",
			});
		}
	}
});

// Add hover effects to project cards
document.addEventListener("DOMContentLoaded", function () {
	const projectCards = document.querySelectorAll(".project-card");

	projectCards.forEach((card) => {
		card.addEventListener("mouseenter", function () {
			this.style.transform = "translateY(-10px) scale(1.02)";
		});

		card.addEventListener("mouseleave", function () {
			this.style.transform = "translateY(0) scale(1)";
		});
	});
});

// Add particle effect to hero section
function createParticles() {
	const hero = document.querySelector(".hero");
	if (!hero) return;

	for (let i = 0; i < 50; i++) {
		const particle = document.createElement("div");
		particle.className = "particle";
		particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
		hero.appendChild(particle);
	}
}

// Add particle animation CSS
const particleStyle = document.createElement("style");
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
document.addEventListener("DOMContentLoaded", createParticles);

// Add scroll progress indicator
function addScrollProgress() {
	const progressBar = document.createElement("div");
	progressBar.className = "scroll-progress";
	progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
	document.body.appendChild(progressBar);

	window.addEventListener("scroll", function () {
		const scrollTop = window.pageYOffset;
		const docHeight = document.body.scrollHeight - window.innerHeight;
		const scrollPercent = (scrollTop / docHeight) * 100;
		progressBar.style.width = scrollPercent + "%";
	});
}

// Initialize scroll progress
document.addEventListener("DOMContentLoaded", addScrollProgress);

// Add keyboard navigation
document.addEventListener("keydown", function (e) {
	// Escape key to close mobile menu
	if (e.key === "Escape") {
		const navMenu = document.querySelector(".nav-menu");
		const hamburger = document.querySelector(".hamburger");
		if (navMenu.classList.contains("active")) {
			navMenu.classList.remove("active");
			hamburger.classList.remove("active");
		}
	}

	// Arrow keys for navigation (when focus is on navigation)
	if (e.target.closest(".nav-menu")) {
		const navLinks = Array.from(document.querySelectorAll(".nav-link"));
		const currentIndex = navLinks.indexOf(e.target);

		if (e.key === "ArrowDown" || e.key === "ArrowRight") {
			e.preventDefault();
			const nextIndex = (currentIndex + 1) % navLinks.length;
			navLinks[nextIndex].focus();
		} else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
			e.preventDefault();
			const prevIndex = currentIndex === 0 ? navLinks.length - 1 : currentIndex - 1;
			navLinks[prevIndex].focus();
		}
	}
});

// Add loading animation for images (if any are added later)
function handleImageLoading() {
	const images = document.querySelectorAll("img");
	images.forEach((img) => {
		img.addEventListener("load", function () {
			this.style.opacity = "1";
		});

		img.addEventListener("error", function () {
			this.style.opacity = "0.5";
			this.style.filter = "grayscale(100%)";
		});
	});
}

// Initialize image loading
document.addEventListener("DOMContentLoaded", handleImageLoading);

// Add theme toggle functionality (for future dark mode)
function addThemeToggle() {
	const themeToggle = document.createElement("button");
	themeToggle.className = "theme-toggle";
	themeToggle.innerHTML = "🌙";
	themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient-primary);
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: var(--transition);
        box-shadow: var(--shadow-medium);
    `;

	themeToggle.addEventListener("click", function () {
		document.body.classList.toggle("dark-theme");
		this.innerHTML = document.body.classList.contains("dark-theme") ? "☀️" : "🌙";
	});

	document.body.appendChild(themeToggle);
}

// Initialize theme toggle
document.addEventListener("DOMContentLoaded", addThemeToggle);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function () {
	// Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener("scroll", debouncedScrollHandler);

// Add accessibility improvements
function improveAccessibility() {
	// Add skip link
	const skipLink = document.createElement("a");
	skipLink.href = "#main-content";
	skipLink.textContent = "Skip to main content";
	skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;

	skipLink.addEventListener("focus", function () {
		this.style.top = "6px";
	});

	skipLink.addEventListener("blur", function () {
		this.style.top = "-40px";
	});

	document.body.insertBefore(skipLink, document.body.firstChild);

	// Add main content landmark
	const mainContent = document.querySelector(".hero");
	if (mainContent) {
		mainContent.id = "main-content";
		mainContent.setAttribute("role", "main");
	}
}

// Initialize accessibility improvements
document.addEventListener("DOMContentLoaded", improveAccessibility);
