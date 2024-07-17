//alert("error")

const searchbox = document.querySelector('.searchbox');


const searchbutton = document.querySelector('.searchbutton');




const recipecontainer = document.querySelector('.recipecontainer');

const recipedetailcontent = document.querySelector('.recipe-details-content');


const recipeclosebtn = document.querySelector('.recipe-close-button');




const getrecipe = async (query) => {

    recipecontainer.innerHTML = "<h2>fetching recipes.....<h2>";

try{
    
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

    const respond = await data.json();

    //to empty the div container
    
    recipecontainer.innerHTML = "";

    //loop



    respond.meals.forEach(meal => {



        const recipediv = document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML =
            ` 
    <img src="${meal.strMealThumb}"> 
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span></p>
    
    
    `

        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipediv.appendChild(button);


        // adding event listner to the button
        button.addEventListener('click', () => {

            openrecipepopup(meal);




        });


        recipecontainer.appendChild(recipediv);


        //console.log(meal);

    });

}  catch(error){


    recipecontainer.innerHTML = "<h2> ERROR in Fetching Recipes.....<h2>";

}



    //console.log(respond.meals[0]);





    const fetchingredients = (meal) => {

        let ingredientslist = "";

        for (let i = 1; i < 21; i++) {

            const ingredient = meal[`strIngredient${i}`];
            if (ingredient) {
                const measure = meal[`strMeasures${i}`]

                ingredientslist += `<li>${measure} ${ingredient}</li>`

            }
            else {
                break;
            }

        }
        return ingredientslist;

    }



    const openrecipepopup = (meal) => {
        recipedetailcontent.innerHTML = `
        
        
        <h2 class="recipename">${meal.strMeal}</h2>
        <h3 >INGREDIENTS : </h3>
        <ul class="ingredientlist" >${fetchingredients(meal)}</ul>

        <div>

            <h3>INSTRUCTIONS :</h3>
            <p class="recipeinstructions"> ${meal.strInstructions}</p>
        </div>
        
        `

        recipedetailcontent.parentElement.style.display = "block";


    }




}



recipeclosebtn.addEventListener('click', () => {

    recipedetailcontent.parentElement.style.display = "none";

});


searchbutton.addEventListener('click', (e) => {
    e.preventDefault();

    const sinput = searchbox.value.trim();
    if (!sinput) {
        recipecontainer.innerHTML = `<h2>Type the Meal in the search box  </h2>`;
        return;
    }

    getrecipe(sinput);
    //console.log("button clicked");


});