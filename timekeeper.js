/*
uses allocated time to control Player

*/

var TimeKeeper = {
    getMove: function(alotted_time){
        var start_time = new Date();
        depth = 5;
        bestResult = [PASS, 0];
        bmbs = [PASS, 0];
        while( bmbs != undefined && bmbs[1] != Number.POSITIVE_INFINITY
                                 && bmbs[1] != Number.NEGATIVE_INFINITY){
            GameState.reset();
            bmbs = Player.getBestMove(depth, start_time, alotted_time);
            if (bmbs != undefined && bmbs[1] != Number.NEGATIVE_INFINITY
                && (bmbs[0] == PASS || bmbs[0] == TAKE || bmbs[0] == EAST ||
                    bmbs[0] == WEST || bmbs[0] == NORTH || bmbs[0] == SOUTH))
                //sort of overkill;  TODO make some test cases to reduce this
                bestResult = bmbs;         
            depth += 1;
        }
        trace("depth searched: "+String(depth-2));
        trace ("time used: "+String(new Date() - start_time));
        trace("evaluation: "+String(bestResult[1]));
        return bestResult[0];
    }
}
