// JavaScript Document

// Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
  // Ensure the button exists before trying to access its style
  if (mybutton) {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
}

// When the user clicks on the button, scroll to the top of the document


document.addEventListener("DOMContentLoaded", function() {
  var nut = document.querySelectorAll('div.nut ul li');
  var slides = document.querySelectorAll('div.slide div');

  if (nut.length > 0 && slides.length > 0) {
    // Add click event for each button
    nut.forEach(function(button, index) {
      button.addEventListener('click', function() {
        // Remove 'ra' class from all slides
        slides.forEach(slide => slide.classList.remove('ra'));
        
        // Add 'ra' class to the current slide
        slides[index].classList.add('ra');
      });
    });

    // Automatic slide change
    auto();

    function auto() {
      var thoigian = setInterval(function() {
        var currentSlide = document.querySelector('div.slide div.ra');
        var vitrislide = 0;

        // Determine the position of the current slide
        if (currentSlide) {
          vitrislide = Array.from(slides).indexOf(currentSlide);
          // Remove 'ra' class from all slides
          slides.forEach(slide => slide.classList.remove('ra'));

          // If the current slide is the last one, start over
          if (vitrislide === slides.length - 1) {
            slides[0].classList.add('ra');
          } else {
            // Move to the next slide
            slides[vitrislide + 1].classList.add('ra');
          }
        }
      }, 5000);

      // Stop automatic slide change when a button is clicked
      nut.forEach(function(button) {
        button.addEventListener('click', function() {
          clearInterval(thoigian);
        });
      });
    }
  }

  // Test interval (for debugging purposes)
}, false);
