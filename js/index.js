
document.addEventListener("DOMContentLoaded", function () {
	// Initialize Lenis
	const lenis = new Lenis({
		autoRaf: true,
	});

});


document.addEventListener("DOMContentLoaded", function () {
	// Initialize a new Lenis instance for smooth scrolling
	const lenis = new Lenis();

	// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
	lenis.on('scroll', ScrollTrigger.update);

	// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
	// This ensures Lenis's smooth scroll animation updates on each GSAP tick
	gsap.ticker.add((time) => {
		lenis.raf(time * 1000); // Convert time from seconds to milliseconds
	});

	// Disable lag smoothing in GSAP to prevent any delay in scroll animations
	gsap.ticker.lagSmoothing(0);

});

