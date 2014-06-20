/*
uses allocated time to control Player

*/

var TimeKeeper = {
    getMove: function(alotted_time){
        var start_time = new Date();
        depth = 5;
        bestResult = PASS;
        bmbs = [PASS, 0];
        while( bmbs != undefined && bmbs[1] != Number.POSITIVE_INFINITY
                                 && bmbs[1] != Number.NEGATIVE_INFINITY){
            GameState.reset();
            bmbs = Player.getBestMove(depth, start_time, alotted_time);
            if (bmbs != undefined && bmbs[1] != Number.NEGATIVE_INFINITY)
                bestResult = bmbs;         
            depth += 1;
        }
        trace("depth searched: "+String(depth-2));
        trace ("time used: "+String(new Date() - start_time));
        trace("evaluation: "+String(bestResult[1]));
        return bestResult[0];
    }
}
