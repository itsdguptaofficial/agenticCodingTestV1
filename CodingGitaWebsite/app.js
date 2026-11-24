/**
 * CodingGita Clone Application Script
 * Handles curriculum tab switching, FAQ accordion toggling, and application submission.
 */

(function () {
  'use strict';

  // 1. Interactive Curriculum Tab Switcher
  const tabButtons = document.querySelectorAll('.cg-tab-btn');
  const tabPanes = document.querySelectorAll('.cg-tab-pane');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Update button states
      tabButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update pane visibility
      tabPanes.forEach((pane) => {
        if (pane.id === targetId) {
          pane.hidden = false;
          pane.classList.add('active');
        } else {
          pane.hidden = true;
          pane.classList.remove('active');
        }
      });
    });
  });

  // 2. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.cg-faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.cg-faq-question');
    const answerDiv = item.querySelector('.cg-faq-answer');

    if (!questionBtn || !answerDiv) return;

    questionBtn.addEventListener('click', () => {
      const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';

      // Toggle current item
      if (isExpanded) {
        questionBtn.setAttribute('aria-expanded', 'false');
        answerDiv.hidden = true;
        item.classList.remove('active');
      } else {
        questionBtn.setAttribute('aria-expanded', 'true');
        answerDiv.hidden = false;
        item.classList.add('active');
      }
    });
  });

  // 3. Admission Form Client-Side Validation and Feedback
  const form = document.getElementById('cg-admission-form');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('student-name').value.trim();
      const email = document.getElementById('student-email').value.trim();
      const phone = document.getElementById('student-phone').value.trim();
      const status = document.getElementById('student-status').value;

      if (!name || !email || !phone || !status) {
        alert('Please fill in all required fields.');
        return;
      }

      // Display success feedback
      if (feedback) {
        feedback.hidden = false;
        form.reset();

        // Scroll smoothly to feedback
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // 4. Modal / Quick Apply button scrolling
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const applySection = document.getElementById('apply');
      if (applySection) {
        e.preventDefault();
        applySection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('student-name');
        if (nameInput) {
          nameInput.focus();
        }
      }
    });
  });
})();
