const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const btn =document.querySelectorAll('button')
let topS =document.querySelector('.top-selling')
let news =document.querySelector('.new-arrivals')
let container = document.querySelector(".products-grid")
let topv = document.querySelector(".product-grid")

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
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
const cards = document.querySelectorAll('.testimonial-card');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    
    let currentIndex = 0;

    nextBtn.addEventListener('click', () => {
      if (currentIndex < 2) { 
        cards[currentIndex].style.display = 'none'; 
        cards[currentIndex + 3].style.display = 'block'; 
        currentIndex++;
      }
    });
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) { 
        cards[currentIndex + 2].style.display = 'none'; 
        cards[currentIndex - 1].style.display = 'block'; 
        currentIndex--;
      }
    });
    

function loadProducts() {
  btn[3].style.display = 'none';
  fetch("https://fakestoreapi.com/products/category/men's%20clothing")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => 
      {
      data.forEach(element => {
        container.innerHTML += `
                <div class="product">
                    <img src="${element.image}">
                    <p>${element.title}</p>
                    <div class="rating"> ★★★★☆ <span>${element.rating?.rate || 'N/A'} (${element.rating?.count || 0})</span></div>
                    <p>$${element.price}</p>
                </div>
        `;
      });
     
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      container.innerHTML = '<p>An error occurred while loading the products. Please try again later.</p>';
      btn[3].style.display = 'block';
    });
}

btn[3].addEventListener('click', loadProducts);

function loadProducts2() { 
  btn[4].style.display = 'none';
  fetch("https://fakestoreapi.com/products/category/women's%20clothing")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => 
      {
      data.forEach(element => {
        topv.innerHTML += `
                <div class="product">
                    <img src="${element.image}">
                    <p>${element.title}</p>
                    <div class="rating"> ★★★★☆ <span>${element.rating?.rate || 'N/A'} (${element.rating?.count || 0})</span></div>
                    <p>$${element.price}</p>
                </div>
        `;
      });
     
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      container.innerHTML = '<p> An error occurred while loading the products. Please try again later. </p>';
      btn[4].style.display = 'block';
    });
}

btn[4].addEventListener('click', loadProducts2);

