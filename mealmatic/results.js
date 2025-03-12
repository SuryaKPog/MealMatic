document.addEventListener('DOMContentLoaded', function() {
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('mealMaticUserData') || '{"name":"User"}');
  
  // Set user name
  document.getElementById('user-name').textContent = userData.name;
  
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button and corresponding pane
      button.classList.add('active');
      const day = button.getAttribute('data-day');
      document.getElementById(day).classList.add('active');
    });
  });
  
  // Generate meal plans for other days
  const days = ['tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  
  const breakfastOptions = [
    { name: "Greek Yogurt with Berries and Granola", calories: 380, protein: 15, carbs: 45, fat: 12 },
    { name: "Spinach and Mushroom Omelette", calories: 350, protein: 22, carbs: 8, fat: 18 },
    { name: "Overnight Oats with Chia Seeds", calories: 410, protein: 14, carbs: 52, fat: 16 },
    { name: "Whole Grain Pancakes with Fruit", calories: 450, protein: 12, carbs: 65, fat: 14 },
  ];
  
  const lunchOptions = [
    { name: "Mediterranean Wrap with Hummus", calories: 480, protein: 18, carbs: 58, fat: 20 },
    { name: "Lentil Soup with Whole Grain Bread", calories: 440, protein: 20, carbs: 62, fat: 10 },
    { name: "Tuna Salad with Mixed Greens", calories: 380, protein: 28, carbs: 18, fat: 22 },
    { name: "Vegetable Stir Fry with Tofu", calories: 420, protein: 22, carbs: 40, fat: 18 },
  ];
  
  const dinnerOptions = [
    { name: "Chickpea and Vegetable Curry with Brown Rice", calories: 520, protein: 18, carbs: 75, fat: 16 },
    { name: "Lean Beef Stir Fry with Broccoli", calories: 480, protein: 35, carbs: 32, fat: 22 },
    { name: "Baked Chicken with Sweet Potato and Greens", calories: 510, protein: 40, carbs: 45, fat: 18 },
    { name: "Zucchini Noodles with Turkey Meatballs", calories: 420, protein: 32, carbs: 25, fat: 20 },
  ];
  
  const snackOptions = [
    { name: "Apple with Almond Butter", calories: 220, protein: 6, carbs: 25, fat: 12 },
    { name: "Mixed Nuts and Dried Fruit", calories: 240, protein: 8, carbs: 18, fat: 16 },
    { name: "Protein Smoothie", calories: 250, protein: 20, carbs: 30, fat: 5 },
    { name: "Hummus with Vegetable Sticks", calories: 190, protein: 6, carbs: 22, fat: 10 },
  ];
  
  days.forEach(day => {
    const dayPane = document.getElementById(day);
    let dayHTML = `
      <div class="day-header">
        <h2><i class="fas fa-calendar"></i> ${day.charAt(0).toUpperCase() + day.slice(1)}</h2>
        <div class="day-total">
          <span>Total: </span>
          <span class="day-calories">2000 kcal</span>
        </div>
      </div>
      
      <div class="meal-grid">
    `;
    
    // Breakfast
    const breakfast = breakfastOptions[Math.floor(Math.random() * breakfastOptions.length)];
    dayHTML += createMealCard('Breakfast', breakfast);
    
    // Lunch
    const lunch = lunchOptions[Math.floor(Math.random() * lunchOptions.length)];
    dayHTML += createMealCard('Lunch', lunch);
    
    // Dinner
    const dinner = dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)];
    dayHTML += createMealCard('Dinner', dinner);
    
    // Snack
    const snack = snackOptions[Math.floor(Math.random() * snackOptions.length)];
    dayHTML += createMealCard('Snack', snack);
    
    dayHTML += `
      </div>
    `;
    
    dayPane.innerHTML = dayHTML;
  });
  
  function createMealCard(type, meal) {
    return `
      <div class="meal-card">
        <div class="meal-header">
          <div>
            <span class="meal-badge">${type}</span>
            <h3>${meal.name}</h3>
          </div>
          <span class="calories-badge">${meal.calories} kcal</span>
        </div>
        <div class="meal-content">
          <div class="meal-nutrients">
            <div class="nutrient">
              <p>Protein</p>
              <p class="nutrient-value">${meal.protein}g</p>
            </div>
            <div class="nutrient">
              <p>Carbs</p>
              <p class="nutrient-value">${meal.carbs}g</p>
            </div>
            <div class="nutrient">
              <p>Fat</p>
              <p class="nutrient-value">${meal.fat}g</p>
            </div>
          </div>
        </div>
        <div class="meal-footer">
          <button class="btn btn-outline btn-sm btn-full">View Recipe</button>
        </div>
      </div>
    `;
  }
});