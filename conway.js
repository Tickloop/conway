import NODE from './node.js';

export default class Conway {
    constructor(target, rows = 10, cols = 10, step_duration = 100, max_it = 100){
        this.target = target;
        this.interval = false;
        this.duration = step_duration;
        this.max = max_it;
        this.step_count = 0;

        this.ROWS = rows;
        this.COLS = cols;

        const ROWS = this.ROWS;
        const COLS = this.COLS;

        // create a ROWS x COLS array and populate it with NODE objects
        const BOARD = [];
        for(let i = 0; i < ROWS; i++){
            BOARD[i] = [];
            for(let j = 0; j < COLS; j++){
                // create a div and append it to the app div
                const _div = document.createElement('div');
                _div.classList.add('grid-item');
                target.append(_div);

                // create a new NODE object, default state is 0
                if(this.#randomize()){
                    BOARD[i][j] = new NODE(i, j, _div);
                }else{
                    BOARD[i][j] = new NODE(i, j, _div, 1);
                }
            }
        }

        this.BOARD = BOARD;

        for(let i = 0; i < ROWS; i++){
            for(let j = 0; j < COLS; j++){
                // now introduce each of the cells to its neighbors
                this.#introduce_neighbor(BOARD[i][j], i, j);
            }
        }
    }

    #randomize(){
        return Number(Math.random().toString(2).substring(2,3)) === 1;
    }

    #introduce_neighbor(cell, row, col){
        const ROWS = this.ROWS;
        const COLS = this.COLS;
        const BOARD = this.BOARD;

        if(row == 0){
            if(col == 0){
                cell.addNeighbor(BOARD[row + 1][col]);
                cell.addNeighbor(BOARD[row + 1][col + 1]);
                cell.addNeighbor(BOARD[row][col + 1]);
            }else if(col == COLS - 1){
                cell.addNeighbor(BOARD[row + 1][col]);
                cell.addNeighbor(BOARD[row + 1][col - 1]);
                cell.addNeighbor(BOARD[row][col - 1]);
            }else{
                cell.addNeighbor(BOARD[row][col - 1]);
                cell.addNeighbor(BOARD[row][col + 1]);

                cell.addNeighbor(BOARD[row + 1][col - 1]);
                cell.addNeighbor(BOARD[row + 1][col]);
                cell.addNeighbor(BOARD[row + 1][col + 1]);
            }
        }else if(row == ROWS - 1){
            if(col == 0){
                cell.addNeighbor(BOARD[row - 1][col]);
                cell.addNeighbor(BOARD[row - 1][col + 1]);
                cell.addNeighbor(BOARD[row][col + 1]);
            }else if(col == COLS - 1){
                cell.addNeighbor(BOARD[row - 1][col]);
                cell.addNeighbor(BOARD[row - 1][col - 1]);
                cell.addNeighbor(BOARD[row][col - 1]);
            }else{
                cell.addNeighbor(BOARD[row][col - 1]);
                cell.addNeighbor(BOARD[row][col + 1]);
                
                cell.addNeighbor(BOARD[row - 1][col - 1]);
                cell.addNeighbor(BOARD[row - 1][col]);
                cell.addNeighbor(BOARD[row - 1][col + 1]);
            }
        }else if(col == 0){
            if(row > 0 && row < ROWS - 1){
                cell.addNeighbor(BOARD[row - 1][col]);
                cell.addNeighbor(BOARD[row + 1][col]);

                cell.addNeighbor(BOARD[row][col + 1]);
                cell.addNeighbor(BOARD[row - 1][col + 1]);
                cell.addNeighbor(BOARD[row + 1][col + 1]);
            }
        }else if(col == COLS - 1){
            if(row > 0 && row < ROWS - 1){
                cell.addNeighbor(BOARD[row - 1][col]);
                cell.addNeighbor(BOARD[row + 1][col]);

                cell.addNeighbor(BOARD[row - 1][col - 1]);
                cell.addNeighbor(BOARD[row][col - 1]);
                cell.addNeighbor(BOARD[row + 1][col - 1]);
            }
        }else{
            // the general case 
            cell.addNeighbor(BOARD[row - 1][col - 1]);
            cell.addNeighbor(BOARD[row - 1][col]);
            cell.addNeighbor(BOARD[row - 1][col + 1]);

            cell.addNeighbor(BOARD[row + 1][col - 1]);
            cell.addNeighbor(BOARD[row + 1][col]);
            cell.addNeighbor(BOARD[row + 1][col + 1]);
            
            cell.addNeighbor(BOARD[row][col - 1]);
            cell.addNeighbor(BOARD[row][col + 1]);
        }
    }

    set max_it(max_it){
        this.max = max_it;
    }

    get max_it(){
        return this.max;
    }

    set step_duration(step_duration){
        this.duration = step_duration;
    }

    get step_duration(){
        return this.duration;
    }

    get isRunning(){
        return this.interval !== false;
    }

    start(){
        this.interval = setInterval(this.step.bind(this), this.duration);
        console.log('Simulation started');
    }

    stop(){
        clearInterval(this.interval);
        this.interval = false;
        this.step_count = 0;
        console.log('Simulation stopped');
    }

    random(){
        // stop the current simulation
        this.stop();
        
        const ROWS = this.ROWS;
        const COLS = this.COLS;
        const target = this.target;

        while(target.firstChild) target.removeChild(target.firstChild);

        // create a ROWS x COLS array and populate it with NODE objects
        const BOARD = [];
        for(let i = 0; i < ROWS; i++){
            BOARD[i] = [];
            for(let j = 0; j < COLS; j++){
                // create a div and append it to the app div
                const _div = document.createElement('div');
                _div.classList.add('grid-item');
                target.append(_div);

                // create a new NODE object, default state is 0
                if(this.#randomize()){
                    BOARD[i][j] = new NODE(i, j, _div);
                }else{
                    BOARD[i][j] = new NODE(i, j, _div, 1);
                }
            }
        }

        this.BOARD = BOARD;
        
        for(let i = 0; i < ROWS; i++){
            for(let j = 0; j < COLS; j++){
                // now introduce each of the cells to its neighbors
                this.#introduce_neighbor(BOARD[i][j], i, j);
            }
        }
    }

    refresh(){
        // stop the current simulation
        this.stop();

        const ROWS = this.ROWS;
        const COLS = this.COLS;
        const target = this.target;

        while(target.firstChild) target.removeChild(target.firstChild);

        const BOARD = [];
        for(let i = 0; i < ROWS; i++){
            BOARD[i] = [];
            for(let j = 0; j < COLS; j++){
                // create a div and append it to the app div
                const _div = document.createElement('div');
                _div.classList.add('grid-item');
                target.append(_div);

                // create a new NODE object, default state is 0
                BOARD[i][j] = new NODE(i, j, _div);
            }
        }

        this.BOARD = BOARD;
        
        for(let i = 0; i < ROWS; i++){
            for(let j = 0; j < COLS; j++){
                // now introduce each of the cells to its neighbors
                this.#introduce_neighbor(BOARD[i][j], i, j);
            }
        }
    }

    step(forced=false){
        // loop through all cells in the and check for surrournding cels
        for(let i = 0; i < this.ROWS; i++){
            for(let j = 0; j < this.COLS; j++){
                // check each cell whether the node is supposed to be alive or dead
                this.BOARD[i][j].check();
            }
        }

        for(let i = 0; i < this.ROWS; i++){
            for(let j = 0; j < this.COLS; j++){
                // check each cell whether the node is supposed to be alive or dead
                this.BOARD[i][j].step();
            }
        }
    
        if(!forced){
            // called for each step in the game of life
            this.step_count += 1;
        
            if(this.step_count === this.max){
                // stop the interval
                this.stop();
            }
        }
    }
}