
# GTP

From https://www.gnu.org/software/gnugo/gnugo_19.html GPL


## Example

```
virihaure 462% ./gnugo --mode gtp
1 boardsize 7
=1

2 clear_board
=2

3 play black D5
=3

4 genmove white
=4 C3

5 play black C3
?5 illegal move

6 play black E3
=6

7 showboard
=7
   A B C D E F G
 7 . . . . . . . 7
 6 . . . . . . . 6
 5 . . + X + . . 5
 4 . . . + . . . 4
 3 . . O . X . . 3
 2 . . . . . . . 2     WHITE (O) has captured 0 stones
 1 . . . . . . . 1     BLACK (X) has captured 0 stones
   A B C D E F G

8 quit
=8
```


## Non-Obsolete Commands

### quit: Quit

Arguments: none
Fails:     never
Returns:   nothing

Status:    GTP version 2 standard command.

### protocol_version: Report protocol version.

Arguments: none
Fails:     never
Returns:   protocol version number

Status:    GTP version 2 standard command.

### name: Report the name of the program.

Arguments: none
Fails:     never
Returns:   program name

Status:    GTP version 2 standard command.

### version: Report the version number of the program.

Arguments: none
Fails:     never
Returns:   version number

Status:    GTP version 2 standard command.
boardsize: Set the board size to NxN and clear the board.
Arguments: integer
Fails:     board size outside engine's limits
Returns:   nothing

Status:    GTP version 2 standard command.

### query_boardsize: Find the current boardsize

Arguments: none
Fails:     never
Returns:   board_size
clear_board: Clear the board.
Arguments: none
Fails:     never
Returns:   nothing

Status:    GTP version 2 standard command.

### orientation: Set the orientation to N and clear the board

Arguments: integer
Fails:     illegal orientation
Returns:   nothing

### query_orientation: Find the current orientation

Arguments: none
Fails:     never
Returns:   orientation

### komi: Set the komi.

Arguments: float
Fails:     incorrect argument
Returns:   nothing

Status:    GTP version 2 standard command.

### get_komi: Get the komi

Arguments: none
Fails:     never
Returns:   Komi

### play: Play a stone of the given color at the given vertex.

Arguments: color, vertex
Fails:     invalid vertex, illegal move
Returns:   nothing

Status:    GTP version 2 standard command.

### fixed_handicap: Set up fixed placement handicap stones.

Arguments: number of handicap stones
Fails:     invalid number of stones for the current boardsize
Returns:   list of vertices with handicap stones

Status:    GTP version 2 standard command.

### place_free_handicap: Choose free placement handicap stones and put them on the board.

Arguments: number of handicap stones
Fails:     invalid number of stones
Returns:   list of vertices with handicap stones

Status:    GTP version 2 standard command.

### set_free_handicap: Put free placement handicap stones on the board.

Arguments: list of vertices with handicap stones
Fails:     board not empty, bad list of vertices
Returns:   nothing

Status:    GTP version 2 standard command.
get_handicap: Get the handicap
Arguments: none
Fails:     never
Returns:   handicap

### loadsgf: Load an sgf file, possibly up to a move number or the first occurence of a move.

Arguments: filename + move number, vertex, or nothing
Fails:     missing filename or failure to open or parse file
Returns:   color to play

Status:    GTP version 2 standard command.

### color: Return the color at a vertex.

Arguments: vertex
Fails:     invalid vertex
Returns:   "black", "white", or "empty"
list_stones: List vertices with either black or white stones.
Arguments: color
Fails:     invalid color
Returns:   list of vertices

### countlib: Count number of liberties for the string at a vertex.

Arguments: vertex
Fails:     invalid vertex, empty vertex
Returns:   Number of liberties.
findlib: Return the positions of the liberties for the string at a vertex.
Arguments: vertex
Fails:     invalid vertex, empty vertex
Returns:   Sorted space separated list of vertices.

### accuratelib: Determine which liberties a stone of given color will get if played at given vertex.

Arguments: move (color + vertex)
Fails:     invalid color, invalid vertex, occupied vertex
Returns:   Sorted space separated list of liberties

### accurate_approxlib: Determine which liberties a stone of given color will get if played at given vertex.

Arguments: move (color + vertex)
Fails:     invalid color, invalid vertex, occupied vertex
Returns:   Sorted space separated list of liberties

Supposedly identical in behavior to the above function and
can be retired when this is confirmed.

### is_legal: Tell whether a move is legal.

Arguments: move
Fails:     invalid move
Returns:   1 if the move is legal, 0 if it is not.
all_legal: List all legal moves for either color.
Arguments: color
Fails:     invalid color
Returns:   Sorted space separated list of vertices.

### captures: List the number of captures taken by either color.

Arguments: color
Fails:     invalid color
Returns:   Number of captures.

### last_move: Return the last move.

Arguments: none
Fails:     no previous move known
Returns:   Color and vertex of last move.
move_history: Print the move history in reverse order
Arguments: none
Fails:     never
Returns:   List of moves played in reverse order in format:
           color move (one move per line)

### invariant_hash: Return the rotation/reflection invariant board hash.

Arguments: none
Fails:     never
Returns:   Invariant hash for the board as a hexadecimal number.

### invariant_hash_for_moves: Return the rotation/reflection invariant board hash obtained by playing all the possible moves for the given color.

Arguments: color
Fails:     invalid color
Returns:   List of moves + invariant hash as a hexadecimal number,
           one pair of move + hash per line.

### trymove: Play a stone of the given color at the given vertex.
Arguments: move (color + vertex)
Fails:     invalid color, invalid vertex, illegal move
Returns:   nothing

### tryko: Play a stone of the given color at the given vertex, allowing illegal ko capture.

Arguments: move (color + vertex)
Fails:     invalid color, invalid vertex, illegal move
Returns:   nothing

### popgo: Undo a trymove or tryko.

Arguments: none
Fails:     stack empty
Returns:   nothing
clear_cache: clear the caches.
Arguments: none.
Fails:     never.
Returns:   nothing.

### attack: Try to attack a string.

Arguments: vertex
Fails:     invalid vertex, empty vertex
Returns:   attack code followed by attack point if attack code nonzero.
attack_either: Try to attack either of two strings
Arguments: two vertices
Fails:     invalid vertex, empty vertex
Returns:   attack code against the strings.  Guarantees there
           exists a move which will attack one of the two
           with attack_code, but does not return the move.

### defend: Try to defend a string.

Arguments: vertex
Fails:     invalid vertex, empty vertex
Returns:   defense code followed by defense point if defense code nonzero.
does_attack: Examine whether a specific move attacks a string tactically.
Arguments: vertex (move), vertex (dragon)
Fails:     invalid vertex, empty vertex
Returns:   attack code

### does_defend: Examine whether a specific move defends a string tactically.

Arguments: vertex (move), vertex (dragon)
Fails:     invalid vertex, empty vertex
Returns:   attack code
ladder_attack: Try to attack a string strictly in a ladder.
Arguments: vertex
Fails:     invalid vertex, empty vertex
Returns:   attack code followed by attack point if attack code nonzero.

### increase_depths: Increase depth values by one.

Arguments: none
Fails:     never
Returns:   nothing
decrease_depths: Decrease depth values by one.
Arguments: none
Fails:     never
Returns:   nothing

### owl_attack: Try to attack a dragon.

Arguments: vertex
Fails:     invalid vertex, empty vertex
Returns:   attack code followed by attack point if attack code nonzero.

### owl_defend: Try to defend a dragon.

Arguments: vertex
Fails:     invalid vertex, empty vertex
Returns:   defense code followed by defense point if defense code nonzero.

### owl_threaten_attack: Try to attack a dragon in 2 moves.

Arguments: vertex
Fails:     invalid vertex, empty vertex
Returns:   attack code followed by the two attack points if
           attack code nonzero.

### owl_threaten_defense: Try to defend a dragon with 2 moves.

Arguments: vertex
Fails:     invalid vertex, empty vertex
Returns:   defense code followed by the 2 defense points if
           defense code nonzero.

### owl_does_attack: Examine whether a specific move attacks a dragon.

Arguments: vertex (move), vertex (dragon)
Fails:     invalid vertex, empty vertex
Returns:   attack code

### owl_does_defend: Examine whether a specific move defends a dragon.

Arguments: vertex (move), vertex (dragon)
Fails:     invalid vertex, empty vertex
Returns:   defense code

### owl_connection_defends: Examine whether a connection defends involved dragons.

Arguments: vertex (move), vertex (dragon1), vertex (dragon2)
Fails:     invalid vertex, empty vertex
Returns:   defense code

### defend_both: Try to defend both of two strings

Arguments: two vertices
Fails:     invalid vertex, empty vertex
Returns:   defend code for the strings.  Guarantees there
           exists a move which will defend both of the two
           with defend_code, but does not return the move.

### owl_substantial: Determine whether capturing a string gives a living dragon

Arguments: vertex
Fails:     invalid vertex, empty vertex
Returns:   1 if dragon can live, 0 otherwise

### analyze_semeai: Analyze a semeai

Arguments: dragona, dragonb
Fails:     invalid vertices, empty vertices
Returns:   semeai defense result, semeai attack result, semeai move

### analyze_semeai_after_move: Analyze a semeai after a move have been made.

Arguments: color, vertex, dragona, dragonb
Fails:     invalid vertices
Returns:   semeai defense result, semeai attack result, semeai move

### tactical_analyze_semeai: Analyze a semeai, not using owl

Arguments: dragona, dragonb
Fails:     invalid vertices, empty vertices
Returns:   status of dragona, dragonb assuming dragona moves first

### connect: Try to connect two strings.

Arguments: vertex, vertex
Fails:     invalid vertex, empty vertex, vertices of different colors
Returns:   connect result followed by connect point if successful.

### disconnect: Try to disconnect two strings.

Arguments: vertex, vertex
Fails:     invalid vertex, empty vertex, vertices of different colors
Returns:   disconnect result followed by disconnect point if successful.

### break_in: Try to break from string into area.

Arguments: vertex, vertices
Fails:     invalid vertex, empty vertex.
Returns:   result followed by break in point if successful.

### block_off: Try to block string from area.

Arguments: vertex, vertices
Fails:     invalid vertex, empty vertex.
Returns:   result followed by block point if successful.

### eval_eye: Evaluate an eye space

Arguments: vertex
Fails:     invalid vertex
Returns:   Minimum and maximum number of eyes. If these differ an
           attack and a defense point are additionally returned.
           If the vertex is not an eye space or not of unique color,
           a single -1 is returned.

### dragon_status: Determine status of a dragon.

Arguments: optional vertex
Fails:     invalid vertex, empty vertex
Returns:   status ("alive", "critical", "dead", or "unknown"),
           attack point, defense point. Points of attack and
           defense are only given if the status is critical.
           If no vertex is given, the status is listed for all
           dragons, one per row in the format "A4: alive".

FIXME: Should be able to distinguish between life in seki
       and independent life. Should also be able to identify ko.

### same_dragon: Determine whether two stones belong to the same dragon.

Arguments: vertex, vertex
Fails:     invalid vertex, empty vertex
Returns:   1 if the vertices belong to the same dragon, 0 otherwise

### unconditional_status: Determine the unconditional status of a vertex.

Arguments: vertex
Fails:     invalid vertex
Returns:   unconditional status ("undecided", "alive", "dead",
           "white_territory", "black_territory"). Occupied vertices can
           be undecided, alive, or dead. Empty vertices can be
           undecided, white territory, or black territory.

### combination_attack: Find a move by color capturing something through a combination attack.

Arguments: color
Fails:     invalid color
Returns:   Recommended move, PASS if no move found
combination_defend: If color can capture something through a combination attack, list moves by the opponent of color to defend against this attack.
Arguments: color
Fails:     invalid color
Returns:   Recommended moves, PASS if no combination attack found.

### aa_confirm_safety: Run atari_atari_confirm_safety().

Arguments: move, optional int
Fails:     invalid move
Returns:   success code, if failure also defending move

### genmove: Generate and play the supposedly best move for either color.

Arguments: color to move
Fails:     invalid color
Returns:   a move coordinate or "PASS" (or "resign" if resignation_allowed)

Status:    GTP version 2 standard command.

### reg_genmove: Generate the supposedly best move for either color.

Arguments: color to move
Fails:     invalid color
Returns:   a move coordinate (or "PASS")

Status:    GTP version 2 standard command.

### gg_genmove: Generate the supposedly best move for either color.

Arguments: color to move, optionally a random seed
Fails:     invalid color
Returns:   a move coordinate (or "PASS")

This differs from reg_genmove in the optional random seed.

### restricted_genmove: Generate the supposedly best move for either color from a choice of allowed vertices.

Arguments: color to move, allowed vertices
Fails:     invalid color, invalid vertex, no vertex listed
Returns:   a move coordinate (or "PASS")

### level: Set the playing level.

Arguments: int
Fails:     incorrect argument
Returns:   nothing
undo: Undo one move
Arguments: none
Fails:     If move history is too short.
Returns:   nothing

Status:    GTP version 2 standard command.

### gg-undo: Undo a number of moves

Arguments: optional int
Fails:     If move history is too short.
Returns:   nothing

### time_settings: Set time allowance

Arguments: int main_time, int byo_yomi_time, int byo_yomi_stones
Fails:     syntax error
Returns:   nothing

Status:    GTP version 2 standard command.

### time_left: Report remaining time

Arguments: color color, int time, int stones
Fails:     syntax error
Returns:   nothing

Status:    GTP version 2 standard command.

### final_score: Compute the score of a finished game.

Arguments: Optional random seed
Fails:     never
Returns:   Score in SGF format (RE property).

Status:    GTP version 2 standard command.

### final_status: Report the final status of a vertex in a finished game.

Arguments: Vertex, optional random seed
Fails:     invalid vertex
Returns:   Status in the form of one of the strings "alive", "dead",
           "seki", "white_territory", "black_territory", or "dame".

### final_status_list: Report vertices with a specific final status in a finished game.

Arguments: Status in the form of one of the strings "alive", "dead",
           "seki", "white_territory", "black_territory", or "dame".
           An optional random seed can be added.
Fails:     missing or invalid status string
Returns:   Vertices having the specified status. These are split with
           one string on each line if the vertices are nonempty (i.e.
           for "alive", "dead", and "seki").

Status:    GTP version 2 standard command.
           However, "dame", "white_territory", and "black_territory"
           are private extensions.

### estimate_score: Estimate the score

Arguments: None
Fails:     never
Returns:   upper and lower bounds for the score
experimental_score: Estimate the score, taking into account which player moves next
Arguments: Color to play
Fails:     Invalid color
Returns:   Score.

This function generates a move for color, then adds the
value of the move generated to the value of the position.
Critical dragons are awarded to the opponent since the
value of rescuing a critical dragon is taken into account
in the value of the move generated.

### reset_owl_node_counter: Reset the count of owl nodes.

Arguments: none
Fails:     never
Returns:   nothing

### get_owl_node_counter: Retrieve the count of owl nodes.

Arguments: none
Fails:     never
Returns:   number of owl nodes

### reset_reading_node_counter: Reset the count of reading nodes.

Arguments: none
Fails:     never
Returns:   nothing

### get_reading_node_counter: Retrieve the count of reading nodes.

Arguments: none
Fails:     never
Returns:   number of reading nodes

### reset_trymove_counter: Reset the count of trymoves/trykos.

Arguments: none
Fails:     never
Returns:   nothing

### get_trymove_counter: Retrieve the count of trymoves/trykos.

Arguments: none
Fails:     never
Returns:   number of trymoves/trykos

### reset_connection_node_counter: Reset the count of connection nodes.

Arguments: none
Fails:     never
Returns:   nothing

### get_connection_node_counter: Retrieve the count of connection nodes.

Arguments: none
Fails:     never
Returns:   number of connection nodes

### test_eyeshape: Test an eyeshape for inconsistent evaluations

Arguments: Eyeshape vertices
Fails:     Bad vertices
Returns:   Failure reports on stderr.

### analyze_eyegraph: Compute an eyevalue and vital points for an eye graph
Arguments: Eyeshape encoded in string
Fails:     Bad eyeshape, analysis failed
Returns:   Eyevalue, vital points

### cputime: Returns elapsed CPU time in seconds.

Arguments: none
Fails:     never
Returns:   Total elapsed (user + system) CPU time in seconds.
showboard: Write the position to stdout.
Arguments: none
Fails:     never
Returns:   nothing

Status:    GTP version 2 standard command.

### dump_stack: Dump stack to stderr.

Arguments: none
Fails:     never
Returns:   nothing

### initial_influence: Return information about the initial influence function.

Arguments: color to move, what information
Fails:     never
Returns:   Influence data formatted like:

  0.51   1.34   3.20   6.60   9.09   8.06   1.96   0.00   0.00
  0.45   1.65   4.92  12.19  17.47  15.92   4.03   0.00   0.00
                  .
                  .
                  .
  0.00   0.00   0.00   0.00   0.00 100.00  75.53  41.47  23.41

The available choices of information are:

white_influence (float)
black_influence (float)
white_strength (float)
black_strength (float)
white_attenuation (float)
black_attenuation (float)
white_permeability (float)
black_permeability (float)
territory_value (float)
influence_regions (int)
non_territory (int)

The encoding of influence_regions is as follows:
 4 white stone
 3 white territory
 2 white moyo
 1 white area
 0 neutral
-1 black area
-2 black moyo
-3 black territory
-4 black stone

### move_influence: Return information about the influence function after a move.

Arguments: move, what information
Fails:     never
Returns:   Influence data formatted like for initial_influence.

### move_probabilities: List probabilities of each move being played (when non-zero). If no previous genmove command has been issued, the result of this command will be meaningless.

Arguments: none
Fails:     never
Returns:   Move, probabilty pairs, one per row.

### move_uncertainty: Return the number of bits of uncertainty in the move. If no previous genmove command has been issued, the result of this command will be meaningless.

Arguments: none
Fails:     never
Returns:   bits of uncertainty

### followup_influence: Return information about the followup influence after a move.

Arguments: move, what information
Fails:     never
Returns:   Influence data formatted like for initial_influence.

### worm_data: Return the information in the worm data structure.

Arguments: optional vertex
Fails:     never
Returns:   Worm data formatted like:

A19:
color           black
size            10
effective_size  17.83
origin          A19
liberties       8
liberties2      15
liberties3      10
liberties4      8
attack          PASS
attack_code     0
lunch           B19
defend          PASS
defend_code     0
cutstone        2
cutstone2       0
genus           0
inessential     0
B19:
color           white
.
.
.
inessential     0
C19:
...

If an intersection is specified, only data for this one will be returned.

### worm_stones: List the stones of a worm

Arguments: the location, "BLACK" or "WHITE"
Fails:     if called on an empty or off-board location
Returns:   list of stones

### worm_cutstone: Return the cutstone field in the worm data structure.

Arguments: non-empty vertex
Fails:     never
Returns:   cutstone

### dragon_data: Return the information in the dragon data structure.

Arguments: optional intersection
Fails:     never
Returns:   Dragon data formatted in the corresponding way to worm_data.

### dragon_stones: List the stones of a dragon

Arguments: the location
Fails:     if called on an empty or off-board location
Returns:   list of stones

### eye_data: Return the information in the eye data structure.

Arguments: color, vertex
Fails:     never
Returns:   eye data fields and values, one pair per row

### half_eye_data: Return the information in the half eye data structure.

Arguments: vertex
Fails:     never
Returns:   half eye data fields and values, one pair per row

### start_sgftrace: Start storing moves executed during reading in an sgf tree in memory.

Arguments: none
Fails:     never
Returns:   nothing

Warning: You had better know what you're doing if you try to use this
         command.

### finish_sgftrace: Finish storing moves in an sgf tree and write it to file.

Arguments: filename
Fails:     never
Returns:   nothing

Warning: You had better know what you're doing if you try to use this
         command.

### printsgf: Dump the current position as a static sgf file to filename, or as output if filename is missing or "-"

Arguments: optional filename
Fails:     never
Returns:   nothing if filename, otherwise the sgf

### tune_move_ordering: Tune the parameters for the move ordering in the tactical reading.
Arguments: MOVE_ORDERING_PARAMETERS integers
Fails:     incorrect arguments
Returns:   nothing

### echo: Echo the parameter

Arguments: string
Fails:     never
Returns:   nothing

### echo_err: Echo the parameter to stdout AND stderr

Arguments: string
Fails:     never
Returns:   nothing

### help: List all known commands

Arguments: none
Fails:     never
Returns:   list of known commands, one per line

Status:    GTP version 2 standard command.

### known_command: Tell whether a command is known.

Arguments: command name
Fails:     never
Returns:   "true" if command exists, "false" if not

Status:    GTP version 2 standard command.

### report_uncertainty: Turn uncertainty reports from owl_attack and owl_defend on or off.

Arguments: "on" or "off"
Fails:     invalid argument
Returns:   nothing

### get_random_seed: Get the random seed

Arguments: none
Fails:     never
Returns:   random seed

### set_random_seed: Set the random seed

Arguments: integer
Fails:     invalid data
Returns:   nothing

### advance_random_seed: Advance the random seed by a number of games.

Arguments: integer
Fails:     invalid data
Returns:   New random seed.

### is_surrounded: Determine if a dragon is surrounded

Arguments: vertex (dragon)
Fails:     invalid vertex, empty vertex
Returns:   1 if surrounded, 2 if weakly surrounded, 0 if not

### does_surround: Determine if a move surrounds a dragon

Arguments: vertex (move), vertex (dragon)
Fails:     invalid vertex, empty (dragon, nonempty (move)
Returns:   1 if (move) surrounds (dragon)

### surround_map: Report the surround map for dragon at a vertex

Arguments: vertex (dragon), vertex (mapped location)
Fails:     invalid vertex, empty dragon
Returns:   value of surround map at (mapped location), or -1 if
           dragon not surrounded.

### set_search_diamond: limit search, and establish a search diamond

Arguments: pos
Fails:     invalid value
Returns:   nothing

### reset_search_mask: unmark the entire board for limited search

Arguments: none
Fails:     never
Returns:   nothing

### limit_search: sets the global variable limit_search

Arguments: value
Fails:     invalid arguments
Returns:   nothing

### set_search_limit: mark a vertex for limited search

Arguments: position
Fails:     invalid arguments
Returns:   nothing

### draw_search_area: Draw search area. Writes to stderr.

Arguments: none
Fails:     never
Returns:   nothing


## Obsolete or other Commands

### black: Play a black stone at the given vertex.

Arguments: vertex
Fails:     invalid vertex, illegal move
Returns:   nothing

Status:    Obsolete GTP version 1 command.

### playwhite: Play a white stone at the given vertex.

Arguments: vertex
Fails:     invalid vertex, illegal move
Returns:   nothing

Status:    Obsolete GTP version 1 command.

### genmove_black: Generate and play the supposedly best black move.

Arguments: none
Fails:     never
Returns:   a move coordinate or "PASS"

Status:    Obsolete GTP version 1 command.

### genmove_white: Generate and play the supposedly best white move.

Arguments: none
Fails:     never
Returns:   a move coordinate or "PASS"

Status:    Obsolete GTP version 1 command.

### reset_life_node_counter: Reset the count of life nodes.

Arguments: none
Fails:     never
Returns:   nothing

Note: This function is obsolete and only remains for backwards
compatibility.

### get_life_node_counter: Retrieve the count of life nodes.

Arguments: none
Fails:     never
Returns:   number of life nodes

Note: This function is obsolete and only remains for backwards
compatibility.

### kgs-genmove_cleanup: Generate and play the supposedly best move for either color, not passing until all dead opponent stones have been removed.

Arguments: color to move
Fails:     invalid color
Returns:   a move coordinate (or "PASS")

Status:    KGS specific command.

A similar command, but possibly somewhat different, will likely be added
to GTP version 3 at a later time.

