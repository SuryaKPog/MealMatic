document.addEventListener('DOMContentLoaded', function() {
  // Form steps handling
  const form = document.getElementById('meal-planner-form');
  const steps = Array.from(document.querySelectorAll('.form-step'));
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const progressFill = document.getElementById('progress-fill');
  
  let currentStep = 0;
  
  // Initialize
  showStep(currentStep);
  updateProgress();
  
  // Next button click
  nextBtn.addEventListener('click', function() {
    if (currentStep < steps.length - 1) {
      if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
        updateProgress();
      }
    } else {
      if (validateStep(currentStep)) {
        submitForm();
      }
    }
  });
  
  // Previous button click
  prevBtn.addEventListener('click', function() {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
      updateProgress();
    }
  });
  
  // Show current step
  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.remove('active');
      if (index === stepIndex) {
        step.classList.add('active');
      }
    });
    
    // Update buttons
    prevBtn.disabled = stepIndex === 0;
    
    if (stepIndex === steps.length - 1) {
      nextBtn.textContent = 'Generate Meal Plan';
    } else {
      nextBtn.textContent = 'Next';
      nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
    }
  }
  
  // Update progress bar
  function updateProgress() {
    const progress = ((currentStep + 1) / steps.length) * 100;
    progressFill.style.width = `${progress}%`;
  }
  
  // Validate current step
  function validateStep(stepIndex) {
    let isValid = true;
    
    // Clear previous error messages
    const errorMessages = steps[stepIndex].querySelectorAll('.error-message');
    errorMessages.forEach(error => error.textContent = '');
    
    if (stepIndex === 0) {
      // Validate personal information
      const name = document.getElementById('name');
      const age = document.getElementById('age');
      const height = document.getElementById('height');
      const weight = document.getElementById('weight');
      
      if (name.value.trim() === '') {
        document.getElementById('name-error').textContent = 'Name is required';
        isValid = false;
      }
      
      if (age.value.trim() === '') {
        document.getElementById('age-error').textContent = 'Age is required';
        isValid = false;
      } else if (parseInt(age.value) <= 0 || parseInt(age.value) >= 120) {
        document.getElementById('age-error').textContent = 'Please enter a valid age between 1-120';
        isValid = false;
      }
      
      if (height.value.trim() === '') {
        document.getElementById('height-error').textContent = 'Height is required';
        isValid = false;
      }
      
      if (weight.value.trim() === '') {
        document.getElementById('weight-error').textContent = 'Weight is required';
        isValid = false;
      }
    } else if (stepIndex === 1) {
      // Validate dietary preferences
      const dietaryPreference = document.querySelector('input[name="dietaryPreference"]:checked');
      const cuisinePreferences = document.querySelectorAll('input[name="cuisinePreferences"]:checked');
      
      if (!dietaryPreference) {
        document.getElementById('dietary-preference-error').textContent = 'Please select a dietary preference';
        isValid = false;
      }
      
      if (cuisinePreferences.length === 0) {
        document.getElementById('cuisine-preferences-error').textContent = 'Please select at least one cuisine';
        isValid = false;
      }
    } else if (stepIndex === 2) {
      // Validate health information
      const activityLevel = document.getElementById('activity-level');
      
      if (activityLevel.value === '') {
        document.getElementById('activity-level-error').textContent = 'Please select your activity level';
        isValid = false;
      }
    }
    
    return isValid;
  }
  
  // Submit form
  function submitForm() {
    // Collect form data
    const formData = new FormData(form);
    const userData = {
      name: formData.get('name'),
      age: formData.get('age'),
      height: formData.get('height'),
      weight: formData.get('weight'),
      dietaryPreference: formData.get('dietaryPreference'),
      cuisinePreferences: Array.from(document.querySelectorAll('input[name="cuisinePreferences"]:checked')).map(el => el.value),
      dietaryRestrictions: Array.from(document.querySelectorAll('input[name="dietaryRestrictions"]:checked')).map(el => el.value),
      activityLevel: formData.get('activityLevel')
    };
    
    // Store in localStorage for the results page
    localStorage.setItem('mealMaticUserData', JSON.stringify(userData));
    
    // Redirect to results page
    window.location.href = 'results.html';
  }
});