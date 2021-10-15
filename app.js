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
        const start_stop_btn = document.getElementById('start-pause-restart-btn');
        start_stop_btn.addEventListener('click', this.start_stop.bind(this));
        start_stop_btn.addEventListener('click', this.toggle_start_stop);

        const clear_btn = document.getElementById('clear-btn');
        clear_btn.addEventListener('click', this.clear.bind(this));

        const random_btn = document.getElementById('random-btn');
        random_btn.addEventListener('click', this.random.bind(this));

        const step_btn = document.getElementById('step-btn');
        step_btn.addEventListener('click', this.step.bind(this));

        const close_btn = document.getElementById('close-btn');
        close_btn.addEventListener('click', this.close_div);
    }

    close_div(e){
        // close the menu div
        const _body = document.getElementsByClassName('content')[0];

        // hide the menu
        if(_body.style.display === "none"){
            _body.style.display = "block";
            e.target.innerText = "X";
        }else{
            _body.style.display = "none";
            e.target.innerText = "V";
        }
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

    toggle_start_stop(e){
        const btn = e.target;
        // we will rename the button based on current state of the button
        if(btn.innerText == "Start"){
            // next state is "Pause"
            btn.innerText = "Pause";
        }else if(btn.innerText == "Pause"){
            // next state is "Restart"
            btn.innerText = "Restart";
        }else{
            // go back to Pause state, currently in "Restart" state
            btn.innerText = "Pause";
        }
    }

    clear(){
        // we will refresh the app
        this.app.clear();

        // set the start-stop-refresh button to start state
        document.getElementById('start-pause-restart-btn').innerText = "Start";
    }

    random(){
        // generate a random state for the app
        this.app.random();

        // set the start-stop-refresh button to start stats
        document.getElementById('start-pause-restart-btn').innerText = "Start";
    }

    step(){
        // take the next step
        this.app.step(true);
    }
}
