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
    takeCheck: function(move_array, moves_to_check){
        //checks if move_array contains move_to_check after the last TAKE
        var i = move_array.length;
        while (i > 0 && move_array[i-1] != TAKE){
            if (moves_to_check.indexOf(move_array[i-1]) > -1)
                return true;
            i -= 1;
        }
        return false;
    },

    geoReset: function(position, candidate_move_array, previous_move_array){
        if (position[0] < (WIDTH - 1) )
            if (!PossibleMoves.takeCheck(previous_move_array, [WEST, NORTH, SOUTH]) )
                candidate_move_array.push(EAST);
        if (position[0] > 0 )
            if (!PossibleMoves.takeCheck(previous_move_array, [EAST, NORTH, SOUTH]) )
                candidate_move_array.push(WEST);
        if (position[1] < (HEIGHT - 1)) 
            if (!PossibleMoves.takeCheck(previous_move_array, [NORTH]) )
                candidate_move_array.push(SOUTH);
        if (position[1] > 0)
            if (!PossibleMoves.takeCheck(previous_move_array, [SOUTH]) )
                candidate_move_array.push(NORTH);
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
