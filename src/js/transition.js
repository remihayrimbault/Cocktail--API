import Research from './research';
import Input from './input';
import $ from 'jquery';

export default class Transition {
    constructor () {
        this.initApp();
        this.initEvents();
    }

    initApp () {
        // Start application

        function show_search () {
            $('div.show').css({
                "display": "flex"
            });
        }

        function hide_search () {
            $('div.show').css({
                "display": "none"
            });
        }

        $('div.search_bar > p').click(function(){
            new Transition();
            new Research().init();
        })

        $('div.test').click(function(){
            console.log("ok");
        })

        $('input').on('input',function(){
            $('div.searching').css({
                "background" : "RGBA(0,0,0,0.76",
            });
            if ($(this).val().length > 0) {
                show_search();
                new Input().searchResults($(this).val());
            } else {
                hide_search();
            }
        });

        $('input').focusout('input',function() {
            $('div.searching').css({
                "background": "none"
            });
        });
    }

    initEvents () {

        function show_anim () {
            $('body').css({
                "overflow" : "hidden"
            });
            $('div.transition').css({
                "transition" : "all 0.1s ease-in-out",
                "z-index" : "1000",
                "opacity" : "100%",
            });
        }

        function hide_anim () {
            $('body').css({
                "overflow" : "visible"
            });
            $('div.transition').css({
                "transition" : "all 0.5s ease-in-out",
                "z-index" : "-1000",
                "opacity" : "0%",
            });
        }

        function transition () {
            show_anim();
            setTimeout(hide_anim, 1000);
        }

        transition();
    }
}