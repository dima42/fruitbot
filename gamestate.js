/*
GameState keeps track of the state of the game as we are exploring move trees.

After each move, call reset() to get updated info about the game
use move() and unmove() to change the game state from there.

GameState.board[i][j] - same conventions as get_board()

GameState.fruits[i] - triplet of [total_fruit, own_fruit, opp_fruit] 
0-indexed, so these correspond to get_fruit(i+1) 

GameState.own_moves, GameState.opp_moves - list of hypothetical moves
GameState.own_taken, GameState.opp_taken - correspond to moves, false if no 
fruit was taken on that turn, otherwise 1-indexed fruit (same as board)

*/

var GameState = {

    reset: function(){
        //this will be called every time a move is actually made
        //it will get info about fruit available/taken and bot locations
        GameState.own_position = [get_my_x(), get_my_y()];
        GameState.opp_position = [get_opponent_x(), get_opponent_y()];
        GameState.board = new Array(WIDTH);
        for (var i = 0; i < WIDTH; i++){
            GameState.board[i] = new Array(HEIGHT);
            for (var j = 0; j < HEIGHT; j++){
                var fruit = get_board()[i][j];
                if (get_total_item_count(fruit) >= 
                    2*Math.max(get_my_item_count(fruit), 
                               get_opponent_item_count(fruit))){
                    //ignore fruit that has already been decided
                    GameState.board[i][j] = fruit;
                } else{
                    GameState.board[i][j] = 0;
                }
            }
        } 
        GameState.fruits = new Array();
        //triplet of [total, my, opponent]
        for (var i = 0; i < get_number_of_item_types(); i++){
            GameState.fruits.push([get_total_item_count(i+1), 
                                 get_my_item_count(i+1), 
                                 get_opponent_item_count(i+1)]);
        }


    },

    move: function(own_move, opp_move){
        GameState.geomove(own_move, GameState.own_position, true);
        GameState.geomove(opp_move, GameState.opp_position, true);
        var own_taken = false;
        var opp_taken = false;
        var tie = own_move == TAKE && opp_move == TAKE && 
                  GameState.own_position[0] == GameState.opp_position[0] &&
                  GameState.own_position[1] == GameState.opp_position[1]
        if (own_move == TAKE){
            var i = GameState.own_position[0];
            var j = GameState.own_position[1];
            own_taken = GameState.board[i][j];
            GameState.fruits[own_taken - 1][1] = 
                GameState.fruits[own_taken - 1][1] + 1 - Number(tie)*0.5;
            GameState.board[i][j] = 0;
        }
        if (opp_move == TAKE){
            var i = GameState.opp_position[0];
            var j = GameState.opp_position[1];
            opp_taken = GameState.board[i][j];
            if (tie) opp_taken = own_taken;
            GameState.fruits[opp_taken - 1][2] = 
                GameState.fruits[opp_taken - 1][2] + 1 - Number(tie)*0.5;
            GameState.board[i][j] = 0;
        }
        GameState.own_moves.push(own_move);
        GameState.opp_moves.push(opp_move);
        GameState.own_taken.push(own_taken);
        GameState.opp_taken.push(opp_taken);

    },

    geomove: function(move, object_moving, forward){
        var step = forward?1:-1;
        if (move == EAST) object_moving[0] = object_moving[0] + step;
        if (move == WEST) object_moving[0] = object_moving[0] - step;
        if (move == NORTH) object_moving[1] = object_moving[1] - step;
        if (move == SOUTH) object_moving[1] = object_moving[1] + step;
    },

    unmove: function(){
        var own_move = GameState.own_moves.pop();
        var opp_move = GameState.opp_moves.pop();
        var own_taken = GameState.own_taken.pop();
        var opp_taken = GameState.opp_taken.pop();
        GameState.geomove(own_move, GameState.own_position, false);
        GameState.geomove(opp_move, GameState.opp_position, false);
        var tie = own_taken && opp_taken && 
                  GameState.own_position[0] == GameState.opp_position[0] &&
                  GameState.own_position[1] == GameState.opp_position[1]
        if (own_taken){
            GameState.board[GameState.own_position[0]]
                           [GameState.own_position[1]] = own_taken;
            GameState.fruits[own_taken - 1][1] = 
                GameState.fruits[own_taken - 1][1] - 1 + Number(tie)*0.5;
        } 
        if (opp_taken){
            GameState.board[GameState.opp_position[0]]
                           [GameState.opp_position[1]] = opp_taken;
            GameState.fruits[opp_taken - 1][2] = 
                GameState.fruits[opp_taken - 1][2] - 1 + Number(tie)*0.5;
        }  
    }
}
