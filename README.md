# Conway's Game of Life

Conway's game of life is a cellular automata simulation that follows four basic rules:

* If a cell is alive then:
    * A cell with 0 or 1 neighbors dies of loneliness (Everyone needs a friend)
    * A cell with 2 or 3 neighbors thrives for another generation (The Goldilock's zone)
    * A cell with 4 or more neighbors dies of overpopulation (Too many friends can strain anyone)
* However, if a cell is dead and has exactly 3 neighbors, it comes back to life (The miracle of life)

Based on these rules a lot of simple designs can be made. This repository hosts a simple implementation of Conway's game of life!