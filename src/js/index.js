import '../css/app.scss'; 
import Research from './research';
import Transition from "./transition";


class App {
    constructor () {
        this.initApp();
    }

    initApp () {
      // Start application
        new Transition();
      new Research().init();
    }
}

new App();