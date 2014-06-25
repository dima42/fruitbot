this is a bot for the fruitbots.org competition

it is based on a recursive search.  each of the "possible" moves is evaluated,
along with each of the opponent's "possible moves".  we pick the move for which
the opponent's best response is least damaging to us.

the "possible moves" are heavily restricted: in between TAKE moves, all 
east/west motion comes before north/south motion.  this is not ideal, but the
increased depth search it allows offsets the lack of flexibility.

the evaluation function is a weighted sum of a heuristic evaluated at every
depth of the recursive search.  this works better than evaluating it at the end
only because of the increased effective depth.  (it also prevents some back
and forth motion).

feel free to modify, but please attribute original.
