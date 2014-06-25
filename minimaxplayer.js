/*
getBestMove() returns the move for which the opponent's best reply is least
effective.

*/

var Player = {
    
    getBestMove: function(depth, start_time, alotted_time) {
        if (new Date()-start_time >= alotted_time)
            return undefined;
        //an undefined return starts a chain of these, and exits minimaxplayer

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

        var best_score = Number.NEGATIVE_INFINITY;
        if (own_moves.length == 0)
            return [PASS, Number.NEGATIVE_INFINITY];
        var best_move = own_moves[0];
        for (var i = 0; i < own_moves.length; i++){
            var worst_score = Number.POSITIVE_INFINITY;
            if (opp_moves.length == 0)
                opp_moves.push(PASS);
            //TODO this is not really correct.  just because a bot has
            //0 legal moves based on its past because we heavily restricted
            //the "possible" moves does not mean we have a forced win
            var opp_best_move = opp_moves[0];
            for (var j = 0; j < opp_moves.length; j++){
                GameState.move(own_moves[i], opp_moves[j])
                var this_score = undefined;
                
                if (depth > 1){
                    var bmbs = Player.getBestMove(depth-1, 
                                                  start_time, alotted_time);
                    if (bmbs == undefined)
                        return undefined;
                    this_score = bmbs[1];
                    this_score += Math.pow(0.1, depth) *
                                  Scorer.getHeuristicScore()
                    //the score is a weighted sum of score at every depth
                    //the weights are highest at the deepest level and
                    //reduced by 90% for each level shallower
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
