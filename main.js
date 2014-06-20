function new_game(){

}

function make_move(){
    var move = TimeKeeper.getMove(1000);
    trace("scores computed: "+String(comp));
    comp = 0;
    return move;
}

function default_board_number() {
    return 582771;
}
