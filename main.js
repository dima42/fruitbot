/*
Public functions for the game controller to call.  new_game() is run once per game and make_move() is run each move.
*/
function new_game(){
    GameState.own_moves = new Array();
    GameState.opp_moves = new Array();
    GameState.own_taken = new Array();
    GameState.opp_taken = new Array();
    GameState.own_prior_moves = new Array();
}

function make_move(){
    var move = TimeKeeper.getMove(1000);
    trace("scores computed: "+String(comp));
    comp = 0;
    
    GameState.own_moves = new Array();
    GameState.opp_moves = new Array();
    GameState.own_taken = new Array();
    GameState.opp_taken = new Array();
    if (move == TAKE){ 
        GameState.own_prior_moves = new Array();
    } else {
        GameState.own_prior_moves.push(move);
    }
    for (var i = 0; i < GameState.own_prior_moves.length; i++){
        GameState.own_moves.push(GameState.own_prior_moves[i]);
        GameState.own_taken.push(0);
    }
    
    return move;
}

function default_board_number() {
    return 582772;
}
