import $ from 'jquery';

/*
* Objectif : récupérer une image aléatoire à partir d'une API et l'afficher
*
* Étapes :
* 1- Créer une référence vers les éléments du DOM qu'on va utiliser
* 2- Récupérer une image de façon asynchrone à partir de l'API d'Unsplash (https://source.unsplash.com/)
* 3- Définir l'image comme fond
* */
export default class Research {

    constructor () {
        this.initEls();
        this.initEvents();
    }

    initEls () {
        this.els = {
            title : $('.result'),
            thumbnail : $('.image'),
            recipe : $('.recipe'),
            list_ingredients : $('.list'),
            search : $('input'),
            random : $('header > .search_bar > p'),
            button : $('header > .search_bar > img')
        };
        this.url = 'https://www.thecocktaildb.com/api/json/v1/1/';
        this.val = "";
    }

    initEvents () {
        if (this.els.search.value) {
            this.searchResult(this.els.search.value);
        } else {
            this.init();
        }
    }

    init () {
        const api = {
            endpoint: `${this.url}random.php`,
        };
        $.ajaxSetup({cache: false});
        $.getJSON(api.endpoint)
            .then((response) => {
                this.renderCocktail(response);
            })
            .catch((err) => {
                console.log('Error Cocktail', err);
            });
    }

    searchResult (data) {

        this.els.button.onclick = function() {
            this.val = data;
        };

            const api = {
                endpoint: `${this.url}search.php?s=${this.val}`,
            };
            $.ajaxSetup({cache: false});
            $.getJSON(api.endpoint)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log('Error Cocktail', err);
                });

    }


    renderCocktail (cocktailData) {
        const cocktailContent = cocktailData.drinks[0].strDrink;
        const cocktailRecipe = cocktailData.drinks[0].strInstructions;
        const cocktailThumb = cocktailData.drinks[0].strDrinkThumb;
        const cocktailIngredient1 = cocktailData.drinks[0].strIngredient1;
        const cocktailIngredient2 = cocktailData.drinks[0].strIngredient2;
        const cocktailIngredient3 = cocktailData.drinks[0].strIngredient3;
        const cocktailIngredient4 = cocktailData.drinks[0].strIngredient4;
        const cocktailIngredient5 = cocktailData.drinks[0].strIngredient5;
        const cocktailIngredient6 = cocktailData.drinks[0].strIngredient6;
        const cocktailIngredient7 = cocktailData.drinks[0].strIngredient7;
        const cocktailIngredient8 = cocktailData.drinks[0].strIngredient8;
        const cocktailIngredient9 = cocktailData.drinks[0].strIngredient9;
        const cocktailIngredient10 = cocktailData.drinks[0].strIngredient10;
        const cocktailIngredient11 = cocktailData.drinks[0].strIngredient11;
        const cocktailIngredient12 = cocktailData.drinks[0].strIngredient12;
        const cocktailIngredient13 = cocktailData.drinks[0].strIngredient13;
        const cocktailIngredient14 = cocktailData.drinks[0].strIngredient14;
        const cocktailIngredient15 = cocktailData.drinks[0].strIngredient15;

        var list = [];
        list.push(cocktailIngredient1);
        list.push(' ');
        list.push(cocktailIngredient2);
        list.push(' ');
        list.push(cocktailIngredient3);
        list.push(' ');
        list.push(cocktailIngredient4);
        list.push(' ');
        list.push(cocktailIngredient5);
        list.push(' ');
        list.push(cocktailIngredient6);
        list.push(' ');
        list.push(cocktailIngredient7);
        list.push(' ');
        list.push(cocktailIngredient8);
        list.push(' ');
        list.push(cocktailIngredient9);
        list.push(' ');
        list.push(cocktailIngredient10);
        list.push(' ');
        list.push(cocktailIngredient11);
        list.push(' ');
        list.push(cocktailIngredient12);
        list.push(' ');
        list.push(cocktailIngredient13);
        list.push(' ');
        list.push(cocktailIngredient14);
        list.push(' ');
        list.push(cocktailIngredient15);

        this.els.list_ingredients.empty().append(list);

        this.els.title.text(cocktailContent);
        this.els.recipe.text(cocktailRecipe);
        this.els.thumbnail.html(`<img src="${cocktailThumb}" alt="Photo de cocktail">`);
    }

}