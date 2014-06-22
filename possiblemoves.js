/*
PossibleMoves.own_candidate_moves and PossibleMoves.opp_candidate_moves
are built based on GameState's positions and previous moves

PossbleMoves.reset() updates them based on GameState.  Right now the possible
moves are based on:
*No going off edges off board
*No going in two opposite directions without a TAKE move in between them

In the future it will be helpful to add options here.  More restricted 
possible moves mean missing some cases but deeper search tree.

*/

var PossibleMoves = {
    geoReset: function(position, candidate_move_array, previous_move_array){
        //if previous move is empty/take, append north/south/east/west
        //if previous move is east/west, append that one and north/south
        //if previous move is north/south, append that one only
        last_move = false;
        if (previous_move_array.length > 0) {
            last_move = previous_move_array[previous_move_array.length-1]
            if (last_move == TAKE)
                //treat same as empty
                last_move = false;
        }
        if ((!last_move || last_move != SOUTH) && (position[1] > 0))
            candidate_move_array.push(NORTH);
        if ((!last_move || last_move != NORTH) && (position[1] < HEIGHT-1))
            candidate_move_array.push(SOUTH);
        if ((!last_move || (last_move != NORTH && last_move != SOUTH && 
                            last_move != WEST)) && position[0] < WIDTH -1)
            candidate_move_array.push(EAST);
        if ((!last_move || (last_move != NORTH && last_move != SOUTH &&
                            last_move != EAST)) && position[0] > 0)
            candidate_move_array.push(WEST);
    
    },
    
    reset: function(){
        
        PossibleMoves.own_candidate_moves = new Array();
        PossibleMoves.opp_candidate_moves = new Array();        

        if (GameState.board[GameState.own_position[0]]
                           [GameState.own_position[1]] > 0) {
            PossibleMoves.own_candidate_moves.push(TAKE);
        }
        if (GameState.board[GameState.opp_position[0]]
                           [GameState.opp_position[1]] > 0) {
            PossibleMoves.opp_candidate_moves.push(TAKE);
        }

        PossibleMoves.geoReset(GameState.opp_position, 
                               PossibleMoves.opp_candidate_moves,
                               GameState.opp_moves);

        PossibleMoves.geoReset(GameState.own_position, 
                               PossibleMoves.own_candidate_moves,
                               GameState.own_moves);
    }
}
