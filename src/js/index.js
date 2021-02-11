import '../css/app.scss'; 
import Research from './research';
import Test from './test';

class App {
    constructor () {
        this.initApp();
    }

    initApp () {
      // Start application
      new Research();
      new Test();
    }
}

new App();
