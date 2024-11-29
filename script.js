let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
    // Get user input
    let userInp = document.getElementById("user-inp").value;

    // Check if input is empty
    if (userInp.trim().length === 0) {
        result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
        return;
    }

    // Fetch data from API
    fetch(url + userInp)
        .then((response) => response.json())
        .then((data) => {
            if (data.meals) {
                let myMeal = data.meals[0];

                // Extract ingredients and measurements
                let count = 1;
                let ingredients = [];
                for (let i in myMeal) {
                    if (i.startsWith("strIngredient") && myMeal[i]) {
                        let ingredient = myMeal[i];
                        let measure = myMeal[`strMeasure${count}`];
                        ingredients.push(`${measure} ${ingredient}`);
                        count++;
                    }
                }

                // Render the meal details
                result.innerHTML = `
                <img src="${myMeal.strMealThumb}" alt="Meal Image">
                <div class="details">
                    <h2>${myMeal.strMeal}</h2>
                    <h4>${myMeal.strArea}</h4>
                </div>
                <div id="ingredients-con">
                    <h3>Ingredients:</h3>
                    <ul>${ingredients.map((item) => `<li>${item}</li>`).join("")}</ul>
                </div>
                <div id="recipe" style="display: none;">
                    <button id="hide-recipe">X</button>
                    <pre id="instructions">${myMeal.strInstructions}</pre>
                </div>
                <button id="show-recipe">View Recipe</button>
                `;

                // Add functionality for the recipe buttons
                let recipe = document.getElementById("recipe");
                let hideRecipe = document.getElementById("hide-recipe");
                let showRecipe = document.getElementById("show-recipe");

                hideRecipe.addEventListener("click", () => {
                    recipe.style.display = "none";
                });
                showRecipe.addEventListener("click", () => {
                    recipe.style.display = "block";
                });
            } else {
                result.innerHTML = `<p>Meal not found!</p>`;
            }
        })
        .catch((error) => {
            console.error(error);
            result.innerHTML = `<p>An error occurred. Please try again!</p>`;
        });
});
