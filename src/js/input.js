import $ from 'jquery';

/*
* Objectif : récupérer une image aléatoire à partir d'une API et l'afficher
*
* Étapes :
* 1- Créer une référence vers les éléments du DOM qu'on va utiliser
* 2- Récupérer une image de façon asynchrone à partir de l'API d'Unsplash (https://source.unsplash.com/)
* 3- Définir l'image comme fond
* */
export default class Input {

    constructor () {
        this.initEls();
    }

    initEls () {
        this.els = {
            input : $('input'),
            val : "",
            list : [],
            show : $('div.show')
        }
        this.url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    }

    searchResults (results) {
        const api = {
            endpoint: `${this.url}${results}`,
        };
        $.getJSON(api.endpoint)
            .then((response) => {
                this.showResult(response);
            })
            .catch((err) => {
                console.log('Error Searching', err);
            });
    }

    showResult (listresults) {
        let list = [];
        this.els.show.empty();
        for (let i = 0; i < (listresults.drinks.length+1); i++) {
            console.log(listresults.drinks[i].idDrink);
            const cocktailTitle = listresults.drinks[i].strDrink;
            const cocktailId = listresults.drinks[i].idDrink;
            const cocktailThumb = listresults.drinks[i].strDrinkThumb;
            this.els.show.innerHTML += `<a id='${cocktailId}'><img src='${cocktailThumb}' alt='Image de cocktail'><p>${cocktailTitle}</p></a>`;
        }
        console.log(list);
    }



}