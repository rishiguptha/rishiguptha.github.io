'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// Add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Select all filter items (the project list items) and filter buttons
const filterItems = document.querySelectorAll("[data-filter-item]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");

// Function that shows/hides projects based on the selected value
const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    // Convert the category string to an array (ensuring lowercase for consistency)
    const categories = item.dataset.category.toLowerCase().split(", ");
    if (selectedValue === "all" || categories.includes(selectedValue)) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Keep track of the last clicked filter button
let lastClickedBtn = filterBtns[0];

filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    // Update the select dropdown text if needed
    selectValue.innerText = this.innerText;
    
    // Filter projects
    filterFunc(selectedValue);
    
    // Update active class for buttons
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // Check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.getAttribute('data-nav-link') === pages[j].getAttribute('data-page')) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Typing animation for the name and title
function setupTypingAnimation() {
  const nameElement = document.querySelector('.name');
  const titleElement = document.querySelector('.title');
  
  if (!nameElement || !titleElement) return;
  
  const originalName = nameElement.textContent;
  const originalTitle = titleElement.textContent;
  
  // Clear the text content
  nameElement.textContent = '';
  titleElement.textContent = '';
  
  // Function to animate typing
  function typeText(element, text, speed = 100, callback = null) {
    let i = 0;
    
    function typing() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else if (callback) {
        setTimeout(callback, 500);
      }
    }
    
    typing();
  }
  
  // Start the animation
  typeText(nameElement, originalName, 80, () => {
    typeText(titleElement, originalTitle, 80);
  });
}


// Enhanced navbar functionality
document.addEventListener('DOMContentLoaded', function() {
  const navbarLinks = document.querySelectorAll('.navbar-link');
  
  // Add active state with smooth transitions
  navbarLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Remove active class from all links
      navbarLinks.forEach(item => {
        item.classList.remove('active');
        item.style.transition = 'all 0.3s ease';
      });
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Slight scale animation for feedback
      this.style.transform = 'scale(1.1)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
    });
  });
  
  // Scroll spy functionality for desktop
  function updateActiveNavOnScroll() {
    const scrollPosition = window.scrollY;
    
    // Only use this for desktop where all sections are visible at once
    if (window.innerWidth >= 1250) {
      const sections = document.querySelectorAll('article[data-page]');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop - 100 && 
            scrollPosition < sectionTop + sectionHeight - 100) {
          const targetNavLink = document.querySelector(
            `.navbar-link[data-nav-link="${section.getAttribute('data-page')}"]`
          );
          
          if (targetNavLink && !targetNavLink.classList.contains('active')) {
            navbarLinks.forEach(link => link.classList.remove('active'));
            targetNavLink.classList.add('active');
          }
        }
      });
    }
  }
  
  // For larger screens where all content is visible at once
  if (window.innerWidth >= 1250) {
    window.addEventListener('scroll', updateActiveNavOnScroll);
  }
});
// Execute when DOM is loaded
document.addEventListener('DOMContentLoaded', setupTypingAnimation);