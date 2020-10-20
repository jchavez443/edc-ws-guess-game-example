# Guessing Game w/ edc-ws
This is a simple example of using the EDC protocoll and the edc-ws npm package to build a simple guessing game with a server and client.

> Don't forget to run `npm install` & `npm run build`
## Starting the Game

First you must run the server:
```bash
npm run server
```
The server needs to run in the background


Then start up as many clients as you would like:
```bash
npm run client
```

### Playing the Game

The goal of the game is to guess what animal the `server` is thinking of from the word bank.

```bash
elephant
zebra
fish
fox
dog
cat
tiger
wombat
deer

What is your is your next guess:
```

If you guess wrong you will see this message and the guessed word will be removed from the word bank and added to a "guessed" list

```
Sorry Wrong. You have made 1 attempts.  You have guessed the following
```

If you guess right the game will end and show the following message:
```
Congrats you got it right in 1 attempts!!!
```