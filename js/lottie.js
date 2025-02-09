document.addEventListener('DOMContentLoaded', () => {
    const loadingElement = document.getElementById('loadingAnimation');
    
    // Initialize Lottie animation
    const animation = lottie.loadAnimation({
        container: document.getElementById('lottieAnimation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json'
    });

    // Function to hide loading
    const hideLoading = () => {
        loadingElement.classList.add('hidden');
        // Remove the element after transition
        setTimeout(() => {
            loadingElement.remove();
        }, 300);
    };

    // Hide loading in these scenarios:
    
    // 1. Fallback: If loading takes too long
    setTimeout(hideLoading, 5000);

    // 2. When animation loads
    animation.addEventListener('DOMLoaded', () => {
        // Give a small delay to show the animation
        setTimeout(hideLoading, 1000);
    });
});