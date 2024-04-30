AOS.init();


// Get the navbar and burger menu elements by their IDs.
const navbarMenu = document.getElementById("navbar");
const burgerMenu = document.getElementById("burger");


// Function to toggle the visibility of the navbar menu and burger icon animation.

const toggleMenu = () => {
  navbarMenu.classList.toggle("active");
  burgerMenu.classList.toggle("open");


  // Conditionally control the page's scroll behavior based on the menu's visibility and window size.
  if (navbarMenu.classList.contains("active")) {
    if (window.innerWidth <= 1024) {
      document.documentElement.classList.add("overflow-hidden");
    }
  } else {
    document.documentElement.classList.remove("overflow-hidden");
  }
};


// Function to toggle the submenu when its parent menu item is clicked, only on smaller screens.
const collapseSubMenu = () => {
  navbarMenu
    .querySelector(".menu-dropdown.active .submenu")
    .removeAttribute("style");
  navbarMenu.querySelector(".menu-dropdown.active").classList.remove("active");
};

const toggleSubMenu = (e) => {
  if (e.target.hasAttribute("data-toggle") && window.innerWidth <= 992) {
    e.preventDefault();
    const menuDropdown = e.target.parentElement;
    const icon = e.target.querySelector(".bx");

    if (menuDropdown.classList.contains("active")) {
      collapseSubMenu();
      icon.style.transform = "rotate(0deg)";
    } else {
      if (navbarMenu.querySelector(".menu-dropdown.active")) {
        collapseSubMenu();
      }

      menuDropdown.classList.add("active");
      const subMenu = menuDropdown.querySelector(".submenu");
      subMenu.style.maxHeight = subMenu.scrollHeight + "px";

      icon.style.transform = "rotate(180deg)";
    }
  }
};

// Function to handle screen resizing, adjusting menu visibility and interaction based on width.

const resizeWindow = () => {
  if (window.innerWidth > 992) {
    if (navbarMenu.classList.contains("active")) {
      toggleMenu();
    }
    if (navbarMenu.querySelector(".menu-dropdown.active")) {
      collapseSubMenu();
    }
  }
};

// Event listeners for burger menu click, navbar menu click, and window resize.
burgerMenu.addEventListener("click", toggleMenu);
navbarMenu.addEventListener("click", toggleSubMenu);
window.addEventListener("resize", resizeWindow);

// Select header and all menu links for scroll-related style changes.

const header = document.querySelector("header");
const menuLinks = document.querySelectorAll(".menu-link");

// Function to add or remove styles based on scroll position.

const checkScroll = () => {
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
    menuLinks.forEach((link) => {
      link.classList.add("scrolled-hover");
      link.classList.remove("notScrolled-hover");
    });
  } else {
    header.classList.remove("scrolled");
    menuLinks.forEach((link) => {
      link.classList.remove("scrolled-hover");
      link.classList.add("notScrolled-hover");
    });
  }
};


// Initial check and event listener for scroll events.
checkScroll();
window.addEventListener("scroll", checkScroll);

// Additional event listeners for menu links to manage submenu interactions.

menuLinks.forEach((link) => {
  const hasSubMenu = link.parentElement.classList.contains("menu-dropdown");
  if (!hasSubMenu) {
    link.addEventListener("click", toggleMenu);
  }
});
