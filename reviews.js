document.addEventListener('DOMContentLoaded', function() {
    // Load cart count
    updateCartCount();
    
    // Initialize star rating
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    
    stars.forEach(star => {
      star.addEventListener('click', function() {
        const value = parseInt(this.getAttribute('data-value'));
        ratingInput.value = value;
        
        // Update star display
        stars.forEach((s, index) => {
          if (index < value) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      });
    });
    
    // Handle form submission
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const product = document.getElementById('product').value;
      const rating = document.getElementById('rating').value;
      const reviewText = document.getElementById('review').value;
      
      if (!name || !product || !rating || !reviewText) {
        alert('Please fill in all fields');
        return;
      }
      
      const review = {
        name,
        product,
        rating,
        review: reviewText,
        date: new Date().toLocaleDateString()
      };
      
      // Save review to localStorage
      saveReview(review);
      
      // Add to display
      addReviewToDisplay(review);
      
      // Reset form
      reviewForm.reset();
      stars.forEach(star => star.classList.remove('active'));
      ratingInput.value = '';
      
      alert('Thank you for your review!');
    });
    
    // Load and display reviews when page loads
    loadReviews();
  });
  
  function saveReview(review) {
    let reviews = JSON.parse(localStorage.getItem('hivepure-reviews')) || [];
    reviews.unshift(review); // Add new review at beginning
    localStorage.setItem('hivepure-reviews', JSON.stringify(reviews));
  }
  
  function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('hivepure-reviews')) || [];
    const reviewsList = document.getElementById('reviewsList');
    
    if (reviews.length === 0) {
      reviewsList.innerHTML = '<p>No reviews yet. Be the first to review!</p>';
      return;
    }
    
    reviewsList.innerHTML = '';
    reviews.forEach(review => {
      addReviewToDisplay(review);
    });
  }
  
  function addReviewToDisplay(review) {
    const reviewsList = document.getElementById('reviewsList');
    
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    
    // Create stars string
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < review.rating ? '★' : '☆';
    }
    
    reviewCard.innerHTML = `
      <div class="review-header">
        <span class="reviewer-name">${review.name}</span>
        <span class="review-rating">${stars}</span>
      </div>
      <div class="review-product">Purchased: ${review.product}</div>
      <p class="review-text">${review.review}</p>
      <div class="review-date">${review.date}</div>
    `;
    
    reviewsList.prepend(reviewCard);
  }
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
  }