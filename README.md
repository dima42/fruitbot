This is a bot for the http://www.fruitbots.org competition.

Rules of the competition
----
Two bots traverse a 2-dimensional grid.  On each turn, the bots can move in any of the four cardinal directions, pick up a fruit located at the current location
("TAKE"), or PASS.

There are several categories of fruit.  For winning the majority of fruit in 
a given category, the bot wins that category.  The goal of the game is to 
win the majority of categories.

For more information, see http://fruitbots.org/docs/rules

How this bot works
----
The structure of the bot is a Minimax algorithm with the paranoid assumption.
Rather than examine all possible moves, the bot limits its search to segments 
of [EAST or WEST], [NORTH or SOUTH], TAKE (see possiblemoves.js).  While the 
optimal play is to consider other segment types as well, the increased depth of
search makes up for the cases where this form of play is inferior.

The Minimax player itself (see minimaxplayer.js) recursively computes the 
evaluation function for each possible move for both players.  In addition to
computing the evaluation function at the greatest depth search, we do a weighted
sum of the evaluation function at shallower depths.

We assume that our opponent will pick the move for which we will have the least advantageous best response, and pick that best response.  This is the so-called
"paranoid assumption" of the Minimax algorithm.

The evaluation function (see scorer.js) awards a point for every category won,
a partial value of up to 0.5 points for a lead in a category, and a heuristic
function based on the distance of the remaining fruits.

We run increasing depth searches of this form until we are close to running
out of time.

Known Problems and future direction
----

Known bugs that have been patched over with a bandaid include:
    -When an opponent has no legal moves as specified by possiblemoves.js (but
     has plenty by the game rules) we assume that the opponent will pass as the
     next move
    -When we have no legal move (for instance due to some previouly existing 
     fruit being taken) we pass.

There is still a lot of room for improvement in terms of the evaluation function
(which is basically just some random heuristic I made up and haven't tested),
pruning (right now we only prune at the simultaneous move juncture rather than
attempting to insert any deeper logic), and adding logic about when to extend
possible moves.
