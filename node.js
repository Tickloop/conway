export default class NODE {
    static height = 25;
    static width = 25;

    constructor(row, col, ele, state = 0){
        this.state = state;
        this.neighbor_count = 0;
        this.neighbors = [];
        this.row = row;
        this.col = col;
        this.element = ele;
        
        // visually reflect that node is alive
        if(this.state === 1){
            this.element.classList.add('alive');
        }

        // create and bind an event listener to these nodes
        ele.addEventListener('click', this.clicked.bind(this));
        ele.addEventListener('pointerenter', this.drag.bind(this));
    }

    clicked(){
        // toggle the cell from alive to dead and dead to alive
        if(this.isAlive){
            this.#die();
        }else{
            this.#born();
        }
    }

    drag(e){
        if(e.buttons === 1){
            // toggle the cell from alive to dead and dead to alive
            if(this.isAlive){
                this.#die();
            }else{
                this.#born();
            }
        }
    }

    addNeighbor(cell){
        // this looks simple but look in conway.js,
        // how many neighbors a simple cell might have
        this.neighbors.push(cell);

        if(cell.isAlive){
            this.neighbor_count += 1;
        }
    }

    get isAlive(){
        return this.state === 1;
    }

    #let_live(){
        this.live = 1;
    }

    #let_die(){
        this.live = 0;
    }

    get willLive(){
        return this.live === 1;
    }

    #born(){
        if(!this.isAlive){
            // signifies an alive cell
            this.state = 1;

            // reflect change in state with element becoming green in color
            if(!this.element.classList.contains('add')){
                this.element.classList.add('alive');
            }

            // update each of the neighbors that their neighbor is alive
            // they may quarrel over pety things in life
            this.neighbors.forEach(neighbor => {
                neighbor.neighbor_count += 1;
            });
        }
    }

    #die(){
        if(this.isAlive){
            // signifies a dead cell
            this.state = 0;

            // reflect change in state by element becoming colorless
            if(this.element.classList.contains('alive')){
                this.element.classList.remove('alive');
            }

            // update each of the neighbors that their neighbor is dead
            // they may mourn the passing of their fellow cell for upto 4 step counts
            this.neighbors.forEach(neighbor => {
                neighbor.neighbor_count  -= 1;
            });
        }
    }

    check(){
        if(this.state === 1){
            if(this.neighbor_count <= 1 || this.neighbor_count >= 4){
                // cell will die of loneliness OR cell die of overpopulation
                this.#let_die();
            }else{
                // cell lives for another generation
                this.#let_live();
            }
        }else{
            if(this.neighbor_count === 3){
                // the miracle of life
                this.#let_live();
            }
        }
    }

    step(){
        if(this.willLive){
            this.#born();
        }else{
            this.#die();
        }
    }
}