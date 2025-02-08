document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('feedbackName').value;
            const email = document.getElementById('feedbackEmail').value;
            const message = document.getElementById('feedbackMessage').value;

            const feedbackData = {
                name: name,
                email: email,
                message: message
            };

            try {
                const response = await fetch('https://database-90b8.restdb.io/rest/feedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-apikey': '677b36236ad1907ce53cbff9',
                        'cache-control': 'no-cache'
                    },
                    body: JSON.stringify(feedbackData)
                });

                if (response.ok) {
                    alert('Feedback submitted successfully!');
                    feedbackForm.reset();
                } else {
                    alert('Failed to submit feedback. Please try again.');
                }
            } catch (error) {
                console.error('Error submitting feedback:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
});