const form = document.querySelector('.contact-form');

function openForm(e) {
  e.preventDefault();

  document.body.style.overflow = 'hidden';
  form.classList.remove('hidden');
}

function closeForm() {
  document.body.style.overflow = 'auto';
  form.classList.add('hidden');
}

// Close form when click is outside the form content
form.addEventListener('click', function(e) {
  const target = e.target;

  if(target !== this) return;

  closeForm();
})

// Close form on Escape 
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeForm();
  }
});

// Open form
document.querySelector('.show-contact-form-btn').addEventListener('click', openForm);

// Close form on close button click
form.querySelector('.contact-form-close-btn').addEventListener('click', closeForm);

// Go to step 2
form.querySelector('.contact-form-btn.step-one-btn').addEventListener('click', function() {
  return goToStep(2);
})

function goToStep(step) {
  const selectedRole = document.querySelector('input[name="role"]:checked')?.value;
  
  form.querySelectorAll('.contact-form-step').forEach(el => el.classList.remove('active'));

  if (step === 2 && selectedRole === 'System integrator') {
    form.querySelector('.step-two.integrator').classList.add('active');
  }
  
  if (step === 3) {
    const inquiry = document.querySelector('select[name="inquiry"]').value;
    if (inquiry === 'Request B2B prices') {
      document.querySelector('.step-3.b2b').classList.add('active');
    } else {
      document.querySelector('.step-3.tech').classList.add('active');
    }
  }
}

function handleInquiryChange(value) {
  // Optional: auto-change step 3 options based on value
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.step-one').classList.add('active');
});
