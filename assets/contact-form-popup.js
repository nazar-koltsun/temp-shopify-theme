const openFormBtn = document.querySelector('.show-contact-form-btn')

function openForm(e) {
  e.preventDefault();

  document.getElementById('formModal').classList.remove('hidden');
}

openFormBtn.addEventListener('click', openForm);

function goToStep(step) {
  const selectedRole = document.querySelector('input[name="role"]:checked')?.value;
  document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));

  if (step === 2 && selectedRole === 'System integrator') {
    document.querySelector('.step-2.integrator').classList.add('active');
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
  document.querySelector('.step-1').classList.add('active');
});
