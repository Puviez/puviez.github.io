# Droppy Balls 
### Contents
* [About](https://github.com/Puviez/puviez.github.io#About)
* [Technologies](https://github.com/Puviez/puviez.github.io#Technologies)
* [Development](https://github.com/Puviez/puviez.github.io#Development)
* [Potential Additions](https://github.com/Puviez/puviez.github.io#Potential-Additions)
* [Link to Site](https://github.com/Puviez/puviez.github.io#Link-to-Site)
### About
![Game Screenshot](https://github.com/Puviez/puviez.github.io/blob/master/Game%20Screenshot.png)
Droppy Balls is a browser based game built with Javascript. The player aims to avoid balls that bounce randomly within the game screen, earning points for each second that they stay alive. The game ends when the player has been hit by a ball. The player can select from 4 difficulty options, with each providing an increasing number of balls on screen and a higher points earn rate. 

No installation or download required.
### Technologies
Javascript ES6
HTML 
CSS
### Development
The game was built graphics first, with game logic and webpage functionality coming later. 
Canvas was used to handle all the graphics for the game as it negated the need to create multiple divs for each ball and the player's icon. The game essentially runs on multiple setInterval functions being run to allow for fluid movement of the images rendered within the canvas. With each refresh, the game is also able to check if the player has been hit by a ball, and if so, initiate the endgame sequence. 
A save feature was added in late on so as to allow the top scores to be displayed for users to record their achievements
### Potential Additions
There is scope for a multiplayer option, with the other player controlling a second icon with the a/d keys. This would not require too large a shift in terms of the current code as the creation of the player icon was kept within the drawPlayer function.
### Link to Site
