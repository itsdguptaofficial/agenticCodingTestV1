/**
 * CodingGita Clone Application Script
 * Handles light/dark theme switching, curriculum tab switching, FAQ accordion, and inquiry submission.
 */

(function () {
  'use strict';

  // 1. Light and Dark Theme Engine
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function getPreferredTheme() {
    const saved = localStorage.getItem('cg-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cg-theme', theme);
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' ? '&#9728;' : '&#9790;';
    }
  }

  // Initialize theme
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // 2. Interactive Curriculum Tab Switcher
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

  // 3. Interactive FAQ Accordion
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

  // 4. Admission Form Client-Side Validation and Feedback
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

  // 5. Modal / Quick Apply button scrolling
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
