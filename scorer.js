/*
getHeuristicScore() provides a complicated and likely not good heuritic 
position evaluation.

TODO maybe it will be a lot more efficient if rather than calculating the 
score, we keep it in memory and change with move/unmove.
*/
var comp = 0;
var factorials = new Array();
factorials.push(1);
factorials.push(1);
for (var i = 2; i < 12; i++){
    factorials.push(factorials[i-1]*i);
}

var Scorer = {

    getHeuristicScore: function(){
        comp += 1;
        var score = 0;
        var win_cats = 0;
        var lose_cats = 0;
        var fruit_importance = new Array();
        for (var i = 0; i < GameState.fruits.length; i++){
            fruit_importance.push(0);
            var this_fruit = GameState.fruits[i];
            var total_fruit = this_fruit[0];
            if (this_fruit[1]*2 > total_fruit){
                score += 1;
                win_cats += 1;
                continue;
            }
            if (this_fruit[2]*2 > total_fruit){
                score -= 1;
                lose_cats += 1;
                continue;
            }
            if (this_fruit[1] == this_fruit[2])
                continue;
            score_adj = 0;
            remaining_fruit = total_fruit-this_fruit[1]-this_fruit[2];
            if (remaining_fruit == 0){
                win_cats += 0.5;
                lose_cats += 0.5;
                continue;
            }/*
            for(var j = 0; j <= remaining_fruit; j++){
                //j is how many fruits we will win
                //assumes equal chance of winning each fruit for both bots
                var prob = Math.pow(0.5, remaining_fruit) * 
                           factorials[remaining_fruit]/
                           (1.0*factorials[j]*factorials[remaining_fruit-j]);
                if ((this_fruit[1]+j)*2 > total_fruit){
                    score_adj = prob;
                    continue;
                } 
                if ((this_fruit[1]+j)*2 == total_fruit)
                    continue;
                score_adj = -prob;
            }*/
            //score += score_adj;
            score += (this_fruit[1]-this_fruit[2])/total_fruit;  
        }

        if ((win_cats*2) > GameState.fruits.length){
            return Number.POSITIVE_INFINITY;
        }
        if (win_cats*2 == GameState.fruits.length && 
            lose_cats*2 == GameState.fruits.length)
            return 0;
        /*
        if ((lose_cats*2) > GameState.fruits.length){
            //this is commented out because sometimes we think a situation is
            //a forced loss, but our opponent does not realise it;  in these 
            //cases, we still want to make a decent move based on the distance
            //logic
            return Number.NEGATIVE_INFINITY;
        }
        */
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
                        score += 0.5*(1/(own_dist+1) - 1/(opp_dist+1)) *  
                                     1/(to_win + diff+2);
                    }
                }
            }
        }
        return score;
    }
}
