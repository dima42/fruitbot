/*
getHeuristicScore() provides a complicated and likely not good heuritic 
position evaluation.
getForcedResult() returns -1 if we lose, 1 if we win, 0 if tie, and undefined
if game is not decided yet


TODO maybe it will be a lot more efficient if rather than calculating the 
score, we keep it in memory and change with move/unmove.
*/
var comp = 0;

var Scorer = {
    getForcedResult: function(){
        
        var own_score = 0;
        var opp_score = 0;
        for (var i = 0; i < GameState.fruits.length; i++){
            var this_fruit = GameState.fruits[i];
            var total_fruit = this_fruit[0];
            if (this_fruit[1]*2 > total_fruit){
                own_score += 1;
                continue;
            }
            if (this_fruit[2]*2 > total_fruit){
                opp_score -= 1;
                continue;
            }
        }

        if (own_score*2 > GameState.fruits.length) return 1;
        if (opp_score*2 > GameState.fruits.length) return -1;
        if (own_score + opp_score == GameState.fruits.length) return 0;
        return undefined;
    },

    getHeuristicScore: function(){
        comp += 1;
        var score = 0;
        for (var i = 0; i < GameState.fruits.length; i++){
            var this_fruit = GameState.fruits[i];
            var total_fruit = this_fruit[0];
            if (this_fruit[1]*2 > total_fruit){
                score += 1;
                continue;
            }
            if (this_fruit[2]*2 > total_fruit){
                score -= 1;
                continue;
            }
            score += (this_fruit[1]-this_fruit[2])/total_fruit;  
             
        }
        
        for (var i = 0; i < WIDTH; i++){
            for (var j = 0; j < HEIGHT; j++){
                if (GameState.board[i][j] > 0){
                    this_fruit = GameState.fruits[GameState.board[i][j] -1];
                    total_fruit = this_fruit[0];
                    if (this_fruit[1]*2 <= total_fruit && 
                        this_fruit[2]*2 <= total_fruit){
                        var diff = Math.abs(this_fruit[1]-this_fruit[2]);
                        var to_win = (total_fruit+1)*0.5 - 
                                     Math.max(this_fruit[1], this_fruit[2]);
                        var own_x = GameState.own_position[0];
                        var own_y = GameState.own_position[1];
                        var opp_x = GameState.opp_position[0];
                        var opp_y = GameState.opp_position[1];
                        var own_dist = Math.abs(own_x - i)+Math.abs(own_y - j);
                        var opp_dist = Math.abs(opp_x - i)+Math.abs(opp_y - j);
                        score += 0.1*(1/(own_dist+1) - 1/(opp_dist+1)) *  
                                     1/(to_win + diff+2);
                    }
                }
            }
        }
        return score;
    }
}
