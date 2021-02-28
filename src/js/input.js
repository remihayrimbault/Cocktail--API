import $ from 'jquery';
import Research from "./research";
import Transition from "./transition";

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
            show : $('div.show'),
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

    show_anim () {
        $('body').css({
            "overflow" : "hidden"
        });
        $('div.transition').css({
            "transition" : "all 0.1s ease-in-out",
            "z-index" : "1000",
            "opacity" : "100%",
        });
    }

    hide_anim () {
        $('body').css({
            "overflow" : "visible"
        });
        $('div.transition').css({
            "transition" : "all 0.5s ease-in-out",
            "z-index" : "-1000",
            "opacity" : "0%",
        });
    }

    transition () {
        this.show_anim();
        setTimeout(this.hide_anim, 1000);
    }

    showResult (listresults) {
        this.els.show.empty();
        for (let i = 0; i < 10; i++) {
            const cocktailTitle = listresults.drinks[i].strDrink;
            const cocktailId = listresults.drinks[i].idDrink;
            this.els.show.append(`<div class="test" id='${cocktailId}'><p>${cocktailTitle}</p></div>`);

            $('div.show > div').click(function(){
                new Research().searchResult(($(this)).attr('id'));
                new Transition();
                $('div.show').css({
                    "display" : "none"
                });
            })
        }
    }
}