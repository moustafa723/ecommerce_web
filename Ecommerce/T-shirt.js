const hamburger =       document.querySelector('.hamburger');
const navLinks =        document.querySelector('.nav-links');
const addToCartBtn =    document.getElementById('add-to-cart');
const submitReviewBtn = document.getElementById('submit-review');
const writeReviewBtn =  document.getElementById('write-review');
const loadMoreBtn =     document.getElementById('load-more');
const productsGrid =    document.getElementById('productsGrid');
let   selectt =         document.querySelectorAll('.thumbnail');
let   sizee =           document.querySelectorAll('.size-btn');
let   qualityy =        document.querySelectorAll('.quantity-btn')
const fakeReviews = [
      { id: 1, reviewer: "Samantha D.", verified: true, rating: 4, text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.", date: "August 14, 2023" },
      { id: 2, reviewer: "Alex M.", verified: true, rating: 5, text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.", date: "August 15, 2023" },
      { id: 3, reviewer: "Ethan R.", verified: true, rating: 4, text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.", date: "August 16, 2023" },
      { id: 4, reviewer: "Olivia P.", verified: true, rating: 5, text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.", date: "August 17, 2023" },
      { id: 5, reviewer: "Liam K.", verified: true, rating: 4, text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.", date: "August 18, 2023" },
      { id: 6, reviewer: "Ava H.", verified: true, rating: 5, text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.", date: "August 19, 2023" },
      { id: 7, reviewer: "Samantha D.", verified: true, rating: 4, text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.", date: "August 14, 2023" },
      { id: 8, reviewer: "Alex M.", verified: true, rating: 5, text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.", date: "August 15, 2023" },
      { id: 9, reviewer: "Ethan R.", verified: true, rating: 4, text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.", date: "August 16, 2023" },
      { id: 10, reviewer: "Olivia P.", verified: true, rating: 5, text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.", date: "August 17, 2023" },
      { id: 11, reviewer: "Liam K.", verified: true, rating: 4, text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.", date: "August 18, 2023" },
      { id: 12, reviewer: "Ava H.", verified: true, rating: 5, text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.", date: "August 19, 2023" }
    ];


if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}


document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('mouseover', () => {
        if (window.innerWidth > 768) {
            link.style.color = '#ccc';
        }
    });
    link.addEventListener('mouseout', () => {
        if (window.innerWidth > 768) {
            link.style.color = '#fff';
        }
    });
});


selectt.forEach(thumb => {
    thumb.addEventListener('click', () => {
        const mainImage = document.querySelector('.main-image');
        if (!mainImage) {
            console.error('The main image element is not present.');
            return;
        }
        selectt.forEach(img => {
            img.classList.remove('selected');
            img.setAttribute('aria-selected', 'false');
        });
        thumb.classList.add('selected');
        thumb.setAttribute('aria-selected', 'true');
        mainImage.src = thumb.src.replace('100x150', '300x400');
        mainImage.alt = thumb.alt;
    });
});


sizee.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    });
});


qualityy.forEach(btn => {
    btn.addEventListener('click', () => {
        const change = parseInt(btn.dataset.change);
        const quantityInput = document.getElementById('quantity');
        let quantity = parseInt(quantityInput.value) || 1;
        quantity = Math.max(1, quantity + change);
        quantityInput.value = quantity;
    });
});



if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
        const productTitle = document.querySelector('.product-title').textContent;
        const selectedColor = document.querySelector('input[name="color"]:checked')?.value || 'Unspecified';
        const selectedSize = document.querySelector('.size-btn.selected')?.dataset.size || 'Unspecified';
        const quantity = document.getElementById('quantity').value;

        if (selectedSize === 'Unspecified') {
            alert('Please choose a size.');
            return;
        }

        alert(`Successfully added ${quantity} ${productTitle} (size: ${selectedSize}, color: ${selectedColor}) to cart!`);
    });
}


document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        const tabName = tab.dataset.tab;
        document.getElementById(tabName).classList.add('active');
        tab.classList.add('active');
        if (tabName === 'rating-reviews') {
            loadReviews();
        }
    });
});




let visibleReviews = 6;


function loadReviews() {
    const reviewsContainer = document.getElementById('reviews-container');
    if (!reviewsContainer) return;
    reviewsContainer.innerHTML = '';
    fakeReviews.slice(0, visibleReviews).forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <span class="rating">${'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</span>
            <div class="review-content">
                <div><span class="reviewer">${review.reviewer} <span class="verified">${review.verified ? '✔' : ''}</span></span> - "${review.text}"</div>
                <div class="date">نُشر في ${review.date}</div>
            </div>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = visibleReviews >= fakeReviews.length ? 'none' : 'block';
    }
}


if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        visibleReviews += 2;
        loadReviews();
    });
}



if (writeReviewBtn) {
    writeReviewBtn.addEventListener('click', () => {
        const reviewForm = document.getElementById('review-form');
        if (reviewForm) {
            reviewForm.classList.add('active');
        }
    });
}


document.querySelectorAll('.rating-stars').forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        const ratingValue = document.getElementById('rating-value');
        if (ratingValue) {
            ratingValue.value = rating;
        }
        document.querySelectorAll('.rating-stars').forEach(s => {
            s.style.color = s.dataset.rating <= rating ? '#ffd700' : '#ccc';
        });
    });
});



if (submitReviewBtn) {
    submitReviewBtn.addEventListener('click', () => {
        const name = document.getElementById('reviewer-name')?.value.trim();
        const rating = document.getElementById('rating-value')?.value;
        const reviewText = document.getElementById('review-text')?.value.trim();

        if (!name || rating <= 0 || !reviewText) {
           alert('Please fill in all fields and select a rating.');
            return;
        }
 
        const newReview = {
            id: fakeReviews.length + 1,
            reviewer: name,
            verified: true,
            rating: parseInt(rating),
            text: reviewText,
            date: new Date().toLocaleDateString('ar-EG')
        };
        fakeReviews.push(newReview);
        loadReviews();
        document.getElementById('review-form').classList.remove('active');
        document.getElementById('reviewer-name').value = '';
        document.getElementById('rating-value').value = '0';
        document.getElementById('review-text').value = '';
        document.querySelectorAll('.rating-stars').forEach(star => {
            star.style.color = '#ccc';
        });
    });
}



if (productsGrid) {
    let isDragging = false;
    let startX;
    let scrollLeft;
    let animationFrameId;

    function startDrag(event) {
        isDragging = true;
        startX = event.pageX || event.touches[0].pageX;
        scrollLeft = productsGrid.scrollLeft;
        productsGrid.style.cursor = 'grabbing';
        cancelAnimationFrame(animationFrameId);
    }

    function drag(event) {
        if (!isDragging) return;
        event.preventDefault();
        const x = event.pageX || event.touches[0].pageX;
        const walk = (x - startX) * 1.2;
        const newScrollLeft = scrollLeft - walk;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
            productsGrid.scrollLeft = newScrollLeft;
        });
    }

    function stopDrag() {
        isDragging = false;
        productsGrid.style.cursor = 'grab';
        cancelAnimationFrame(animationFrameId);
    }

    productsGrid.addEventListener('mousedown', startDrag);
    productsGrid.addEventListener('mousemove', drag);
    productsGrid.addEventListener('mouseup', stopDrag);
    productsGrid.addEventListener('mouseleave', stopDrag);
    productsGrid.addEventListener('touchstart', startDrag, { passive: true });
    productsGrid.addEventListener('touchmove', drag, { passive: false });
    productsGrid.addEventListener('touchend', stopDrag);
    productsGrid.addEventListener('wheel', (e) => {
        e.preventDefault();
        productsGrid.scrollLeft += e.deltaY;
    }, { passive: false });
}


window.addEventListener('load', () => {
    loadReviews();
});














