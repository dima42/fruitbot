/*
getBestMove()
*/

var Player = {
    
    getBestMove: function(depth, start_time, alotted_time) {
        if (new Date()-start_time >= alotted_time)
            return undefined;

        PossibleMoves.reset();
        //we need to explicitly copy possible moves because of recursion
        var own_moves = new Array();
        for (var i = 0; i < PossibleMoves.own_candidate_moves.length; i++){
            own_moves.push(PossibleMoves.own_candidate_moves[i]);
        }
        var opp_moves = new Array();
        for (var i = 0; i < PossibleMoves.opp_candidate_moves.length; i++){
            opp_moves.push(PossibleMoves.opp_candidate_moves[i]);
        }

        
        moves_thus_far = new Array();
        opp_moves_thus_far = new Array();
        for (var i = 0; i < GameState.own_moves.length; i++) {
            moves_thus_far.push(GameState.own_moves[i]);
            opp_moves_thus_far.push(GameState.opp_moves[i]);
        }

        var best_score = -100000000;
        var best_move = false;
        for (var i = 0; i < own_moves.length; i++){
            var worst_score = 10000000;
            var opp_best_move = false;
            for (var j = 0; j < opp_moves.length; j++){
                GameState.move(own_moves[i], opp_moves[j])
                var this_score = undefined;
                
                if (depth > 1){
                    var bmbs = Player.getBestMove(depth-1, 
                                                  start_time, alotted_time);
                    if (bmbs == undefined)
                        return undefined;
                    this_score = bmbs[1];
                    if (depth >= 2){
                        //this helps avoid loops
                        this_score += Math.pow(0.1, depth) * 
                                      Scorer.getHeuristicScore();
                    }
                }
                else{
                    this_score = Scorer.getHeuristicScore();
                }
                if (this_score < worst_score){
                     worst_score = this_score;
                     opp_best_move = opp_moves[j];
                }


                GameState.unmove();

                if (worst_score <= best_score) break;
            }
            if (worst_score > best_score) {
                best_score = worst_score
                best_move = own_moves[i];
            }
        }
        return [best_move, best_score];
    },
    
}
