const ROLES = {
  system_integrator: 'System integrator',
  property_developer: 'Property developer',
  home_owner: 'Home owner',
};

const SYSTEM_INTEGRATOR_INQUIRiES = {
  bTob: 'Request B2B prices',
  tech: 'Technical question',
};

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
form.addEventListener('click', function (e) {
  const target = e.target;

  if (target !== this) return;

  closeForm();
});

// Close form on Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeForm();
  }
});

// Open form
document
  .querySelector('.show-contact-form-btn')
  .addEventListener('click', openForm);

// Close form on close button click
form
  .querySelector('.contact-form-close-btn')
  .addEventListener('click', closeForm);

// Go to step 2
form
  .querySelector('.contact-form-btn.step-one-btn')
  .addEventListener('click', function () {
    goToStep(2);
  });

// Go to step 3 for 'System integrator'
form
  .querySelector('.step-two.integrator .step-two-btn')
  .addEventListener('click', function () {
    goToStepWithValidation('.step-two.integrator', 3);
  });

// Go to step 3 for 'Property developer'
form
  .querySelector('.step-two.property-developer .step-two-btn')
  .addEventListener('click', function () {
    goToStepWithValidation('.step-two.property-developer', 3);
  });

// Go to step 3 for 'Home owner'
form
  .querySelector('.step-two.home-owner .step-two-btn')
  .addEventListener('click', function () {
    goToStepWithValidation('.step-two.home-owner', 3);
  });


function goToStepWithValidation(selector, step) {
  const stepElement = form.querySelector(selector);
  const inputs = stepElement.querySelectorAll('input, select, textarea');

  let isValid = true;

  for (const input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity(); // This shows the native validation message
      isValid = false;
      break; // Stop on first invalid field
    }
  }

  if (isValid) {
    goToStep(step);
  }
}

function deleteInitialTitle() {
  form.querySelector('.contact-form-title').style.display = 'none';
}

function disableAllUnactiveFields(el) {
  el.querySelectorAll('input, select, textarea').forEach((input) => {
    input.disabled = true;
  });
}

function enableAllActiveFields(el) {
  el.querySelectorAll('input, select, textarea').forEach(
    (i) => (i.disabled = false)
  );
}

function goToStep(step) {
  const selectedRole = form.querySelector('input[name="role"]:checked')?.value;

  // Hide all steps
  form.querySelectorAll('.contact-form-step').forEach((stepEl) => {
    stepEl.classList.remove('active');
  });

  // Disable all fields in hidden steps
  form.querySelectorAll('.contact-form-step:not(.step-one)').forEach((stepEl) => {
    disableAllUnactiveFields(stepEl);
  });

  // Show and enable only the relevant step
  if (step === 2) {
    if (selectedRole === ROLES.system_integrator) {
      const el = form.querySelector('.step-two.integrator');
      el.classList.add('active');
      enableAllActiveFields(el);
    }

    if (selectedRole === ROLES.property_developer) {
      const el = form.querySelector('.step-two.property-developer');
      el.classList.add('active');
      enableAllActiveFields(el);
    }

    if (selectedRole === ROLES.home_owner) {
      const el = form.querySelector('.step-two.home-owner');
      el.classList.add('active');
      enableAllActiveFields(el);
    }
  }

  if (step === 3) {
    if (selectedRole === ROLES.system_integrator) {
      const inquiry = form.querySelector(
        'select[name="integrator_inquiry"]'
      ).value;

      if (inquiry === SYSTEM_INTEGRATOR_INQUIRiES.bTob) {
        const el = form.querySelector('.step-three.integrator.b-two-b');
        el.classList.add('active');
        enableAllActiveFields(el);
        enableAllActiveFields(form.querySelector('.step-two.integrator'));
      } else {
        deleteInitialTitle();

        const el = form.querySelector('.step-three.message');
        el.classList.add('active');
        enableAllActiveFields(el);
        enableAllActiveFields(form.querySelector('.step-two.integrator'));
      }
    }
    
    else {
      deleteInitialTitle();
      const el = form.querySelector('.step-three.message');
      el.classList.add('active');
      enableAllActiveFields(el);

      if (selectedRole === ROLES.property_developer) {
        enableAllActiveFields(form.querySelector('.step-two.property-developer'));
      }

      if (selectedRole === ROLES.home_owner) {
        enableAllActiveFields(form.querySelector('.step-two.home-owner'));
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  form.querySelector('.step-one').classList.add('active');
});
