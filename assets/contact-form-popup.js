const countryList = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Belgium',
  'Brazil',
  'Bulgaria',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Croatia',
  'Czech Republic',
  'Denmark',
  'Egypt',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Ireland',
  'Israel',
  'Italy',
  'Japan',
  'Kazakhstan',
  'Kenya',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malaysia',
  'Mexico',
  'Netherlands',
  'New Zealand',
  'Nigeria',
  'Norway',
  'Pakistan',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Saudi Arabia',
  'Serbia',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'South Africa',
  'South Korea',
  'Spain',
  'Sweden',
  'Switzerland',
  'Thailand',
  'Turkey',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Vietnam',
  'Other',
];

const ROLES = {
  system_integrator: 'System integrator',
  property_developer: 'Property developer',
  home_owner: 'Home owner',
};

const SYSTEM_INTEGRATOR_INQUIRiES = {
  bTob: 'Request B2B prices',
  tech: 'Technical question',
};

const HOME_OWNER_INQUIRiES = {
  recommend: 'Recommend me to a local Atios partner',
  other: 'Other requests',
};

const DEVELOPER_BUILDING_TYPES = {
  resComplex: 'Residential complex',
  apartBuilding: 'Apartment building',
  hotel: 'Hotel',
};

const showContactFormBtn = document.querySelector('.show-contact-form-btn');
const form = document.querySelector('.contact-form');
const countrySelects = form.querySelectorAll('.country-select');

async function openForm(e) {
  e.preventDefault();

  document.body.style.overflow = 'hidden';
  form.classList.remove('hidden');

  const userCountry = await getUserCountry();
  setUserCountry(userCountry);
}

function closeForm() {
  document.body.style.overflow = 'auto';
  form.classList.add('hidden');
  goToStep(1);
  form.querySelector('form').reset();
  showInitialTitle();
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
if (showContactFormBtn) {
  showContactFormBtn.addEventListener('click', openForm);
}

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

// Go back from step 2 to step 1
goBack('.step-two-back-btn', 1);

// Go back from step 3 to step 2
goBack('.step-three-back-btn', 2);

document.addEventListener('DOMContentLoaded', async () => {
  form.querySelector('.step-one').classList.add('active');

  countrySelects.forEach((select) => {
    countryList.forEach((country) => {
      const option = document.createElement('option');
      option.value = country;
      option.textContent = country;
      select.appendChild(option);
    });
  });
});

function goBack(selector, step) {
  form.querySelectorAll(selector).forEach((backBtn) => {
    backBtn.addEventListener('click', function () {
      goToStep(step);
      showInitialTitle();
    });
  });
}

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

function showInitialTitle() {
  form.querySelector('.contact-form-title').style.display = 'block';
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
  const buildingTypes = form.querySelectorAll(
    '.step-two.property-developer input[name=developer_building_type]'
  );
  let checkedBuildingType = Array.from(buildingTypes).find(
    (buildingType) => buildingType.checked
  ).value;

  // Hide all steps
  form.querySelectorAll('.contact-form-step').forEach((stepEl) => {
    stepEl.classList.remove('active');
  });

  // Disable all fields in hidden steps
  form
    .querySelectorAll('.contact-form-step:not(.step-one)')
    .forEach((stepEl) => {
      disableAllUnactiveFields(stepEl);
    });

  if (step === 1) {
    form.querySelector('.step-one').classList.add('active');
  }

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

      buildingTypes.forEach((buildingType) => {
        buildingType.addEventListener('change', (event) => {
          checkedBuildingType = event.target.value;
          showHideUnitsRooms(checkedBuildingType);
        });
      });

      showHideUnitsRooms(checkedBuildingType);
    }

    if (selectedRole === ROLES.home_owner) {
      const el = form.querySelector('.step-two.home-owner');
      el.classList.add('active');
      enableAllActiveFields(el);

      const nextBtn = form.querySelector('.home-owner-step-two-next');
      const sendBtn = form.querySelector('.home-owner-step-two-send');
      const inquirySelect = form.querySelector('select[name=home_owner_inquiry]');

      inquirySelect.addEventListener('change', function() {
        if(this.value === HOME_OWNER_INQUIRiES.recommend) {
          nextBtn.style.display = 'none';
          sendBtn.style.display = 'block';
        } else {
          nextBtn.style.display = 'block';
          sendBtn.style.display = 'none';
        }
      })
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
    } else {
      deleteInitialTitle();
      const el = form.querySelector('.step-three.message');
      el.classList.add('active');
      enableAllActiveFields(el);

      if (selectedRole === ROLES.property_developer) {
        enableAllActiveFields(
          form.querySelector('.step-two.property-developer')
        );

        showHideUnitsRooms(checkedBuildingType);
      }

      if (selectedRole === ROLES.home_owner) {
        enableAllActiveFields(form.querySelector('.step-two.home-owner'));
      }
    }
  }
}

function showHideUnitsRooms(checkedBuildingType) {
  const roomsLabelEl = form.querySelector('.step-two.property-developer .rooms-label');
  const unitsLabelEl = form.querySelector('.step-two.property-developer .units-label');

  if (checkedBuildingType === DEVELOPER_BUILDING_TYPES.hotel) {
    roomsLabelEl.style.display = 'block';
    roomsLabelEl.querySelector('input').disabled = false;

    unitsLabelEl.style.display = 'none';
    unitsLabelEl.querySelector('input').disabled = true;
  } else {
    roomsLabelEl.style.display = 'none';
    roomsLabelEl.querySelector('input').disabled = true;

    unitsLabelEl.style.display = 'block';
    unitsLabelEl.querySelector('input').disabled = false;
  }
}

async function getUserCountry() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_name;
  } catch (error) {
    console.error('Geolocation failed:', error);
  }
}

function setUserCountry(country) {
  countrySelects.forEach((select) => {
    Array.from(select.options).forEach((option) => {
      if (option.value === country) {
        option.selected = true;
      }
    });
  });
}
