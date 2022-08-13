import Conway from './conway.js';
import NODE from './node.js';

export default class App{
    constructor(){
        // the target div which will be used to render the game
        const div_app = document.getElementById('app');

        // finding the total number of rows and columns to be rendered
        const ROW = Math.ceil(div_app.clientHeight / NODE.height);
        const COL = Math.ceil(div_app.clientWidth / NODE.width);

        // setting the properties in css. see style.css for clarity
        div_app.style.setProperty('--app-rows', ROW);
        div_app.style.setProperty('--app-cols', COL);

        // saving instance variables for later
        this.target = div_app;
        this.ROW = ROW;
        this.COL = COL;
        
        // setup the Conway board
        this.app = new Conway(this.target, this.ROW, this.COL);

        // setup click listeners for the buttons
        const start_stop_btn = document.getElementById('start-pause-btn');
        start_stop_btn.addEventListener('click', this.start_stop.bind(this));

        const clear_btn = document.getElementById('clear-btn');
        clear_btn.addEventListener('click', this.clear.bind(this));

        const random_btn = document.getElementById('random-btn');
        random_btn.addEventListener('click', this.random.bind(this));

        const step_btn = document.getElementById('step-btn');
        step_btn.addEventListener('click', this.step.bind(this));

        // setup change listener for drag bar for iteration speed
        const speed_slider = document.getElementById('speed-input');
        speed_slider.addEventListener('change', this.change_speed.bind(this));
    }

    start_stop(){
        if(this.app.isRunning){
            // stop the app from running 
            this.app.stop();
        }else{
            // start the app
            this.app.start();
        }
    }

    clear(){
        // we will refresh the app
        this.app.clear();

        // set the start-stop-refresh button to start state
        document.getElementById('start-pause-btn').innerText = "Start";
    }

    random(){
        // generate a random state for the app
        this.app.random();

        // set the start-stop-refresh button to start stats
        document.getElementById('start-pause-btn').innerText = "Start";
    }

    step(){
        // take the next step
        this.app.step(true);
    }

    change_speed(e){
        // change the iterations speed 
        const speed = e.target.value;
        this.app.step_duration = Number(speed);
    }
}
