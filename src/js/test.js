import Research from './research';
import Input from './input';
import $ from 'jquery';

export default class Test {
    constructor () {
        this.initApp();
    }

    initApp () {
        // Start application
        $('div.search_bar > p').click(function(){
            new Research().init();
        })

        $('input').on('input',function(){
            if ($(this).val().length > 1) {
                new Input().searchResults($(this).val());
            }
        });
    }
}