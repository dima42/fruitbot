/*
uses allocated time to control Player

*/

var TimeKeeper = {
    getMove: function(alotted_time){
        var start_time = new Date();
        depth = 5;
        bestResult = EAST;
        bmbs = [EAST, 0];
        while( bmbs != undefined){
            bestResult = bmbs[0];
            GameState.reset();
            bmbs = Player.getBestMove(depth, start_time, alotted_time);         
            depth += 1;
        }
        trace("depth searched: "+String(depth-2));
        trace ("time used: "+String(new Date() - start_time));
        LastMove = bestResult;
        return bestResult;
    }
}
