// Tab Switching Logic
document.addEventListener('DOMContentLoaded', () => {
  function setupTabs(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    const buttons = container.querySelectorAll('.tab-btn');
    const panes = container.querySelectorAll('.tab-pane');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        // Remove active class from all buttons and panes
        buttons.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button and target pane
        btn.classList.add('active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }

  // Initialize tabs for both sections
  setupTabs('ai-tabs');
  setupTabs('suite-tabs');
  setupTabs('solution-tabs');

  // Simple scroll animation observer
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Add fade-in animation class to major sections
  const sections = document.querySelectorAll('section, header');
  sections.forEach((sec) => {
    sec.classList.add('fade-section');
    observer.observe(sec);
  });

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((q) => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Smooth Scroll for Anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  });

  // --- FORM SUBMISSION LOGIC ---
  // const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwkcSpS7g37C75TMLSM5nIRiS-2JgPNKlfAwxjHO-h7hbugzRi1IglOfYttPajU2huUSQ/exec';

  const forms = document.querySelectorAll('.waitlist-form');

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Control explicitly

      const submitBtn = form.querySelector('button[type="submit"]');

      // 1. Loading State
      submitBtn.textContent = 'Joining...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      // 2. Trigger Submit explicitly
      // This ensures it goes to the hidden_iframe defined in HTML
      form.submit();

      // 3. Success UI Flow
      const showSuccess = () => {
        form.innerHTML = `
                    <div style="text-align: center; padding: 20px; color: #10b981; font-weight: 600;">
                        <i class="fa-solid fa-circle-check" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                        You're on the list!
                    </div>
                `;
      };

      const iframe = document.getElementById('hidden_iframe');
      let successTriggered = false;

      const onLoad = () => {
        if (successTriggered) {
          return;
        }
        successTriggered = true;
        showSuccess();
        iframe.removeEventListener('load', onLoad);
      };
      iframe.addEventListener('load', onLoad);

      // Fallback Success
      setTimeout(() => {
        if (!successTriggered) {
          successTriggered = true;
          showSuccess();
          iframe.removeEventListener('load', onLoad);
        }
      }, 1500);
    });
  });
});

// function showFeedback(form, type, message) {
//     const existing = form.nextElementSibling;
//     if (existing && existing.classList.contains('form-feedback')) {
//         existing.remove();
//     }

//     const feedback = document.createElement('div');
//     feedback.classList.add('form-feedback', type);
//     feedback.textContent = message;

//     // Style it (can be moved to CSS, but inline for safety here)
//     feedback.style.marginTop = '12px';
//     feedback.style.fontSize = '0.9rem';
//     feedback.style.fontWeight = '600';
//     feedback.style.opacity = '0';
//     feedback.style.transition = 'opacity 0.3s';

//     if (type === 'success') {
//         feedback.style.color = '#10b981'; // Green
//     } else if (type === 'error') {
//         feedback.style.color = '#ef4444'; // Red
//     } else if (type === 'neutral') {
//         feedback.style.color = '#f59e0b'; // Amber (Duplicate)
//     }

//     form.after(feedback);

//     // Animate in
//     requestAnimationFrame(() => {
//         feedback.style.opacity = '1';
//     });

//     // Remove after 5 seconds
//     setTimeout(() => {
//         feedback.style.opacity = '0';
//         setTimeout(() => feedback.remove(), 300);
//     }, 5000);
// }
