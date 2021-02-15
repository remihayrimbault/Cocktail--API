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
    }

    initEvents () {
        this.init();
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

    searchResult (id) {

            const api = {
                endpoint: `${this.url}lookup.php?i=${id}`,
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


    renderCocktail (cocktailData) {

        const cocktailContent = cocktailData.drinks[0].strDrink;
        const cocktailRecipe = cocktailData.drinks[0].strInstructions;
        const cocktailThumb = cocktailData.drinks[0].strDrinkThumb;

        let list_ingr = [];
        let list_meas = [];
        let list = [];

        for (let i = 1; i < 16; i++) {
            list_ingr.push(eval("cocktailData.drinks[0].strIngredient"+i));
            list_meas.push(eval("cocktailData.drinks[0].strMeasure"+i));
        }

        list.push(' - ');
        for (let i = 1; i < 16; i++) {
            let ingr = list_ingr[i];
            let mesu = list_meas[i];
            if (ingr != null) {
                list.push(ingr);

                if (mesu != null) {
                    list.push(' : ');
                    list.push(mesu);
                    list.push('   - ');
                } else {
                    list.push('   - ');
                }
            }
        }

        this.els.list_ingredients.empty().append(list);

        this.els.title.text(cocktailContent);
        this.els.recipe.text(cocktailRecipe);
        this.els.thumbnail.html(`<img src="${cocktailThumb}" alt="Photo de cocktail">`);
    }

}