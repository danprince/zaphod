---
layout: default.html
title: Tutorial
---

# Tutorial
Designing predictable data flows is an important part of building good applications and a popular way to do this is with immutable data. We'll walk through the process of building a simple game, introducing techniques and technologies as we go.

## Mutable
We'll start out by representing our game with an object that contains each of our players.

```js
var game = {
  players: [
    { name: 'arthur', score: 0 },
    { name: 'ford', score: 0 },
    { name: 'trisha', score: 0 }
  ]
};
```

Next we'll write a function that adds a point to a player, given the player's name.

```js
function addPoint(game, playerName) {
  var player = game.players.find(
    player => player.name === playerName
  );

  player.score++;
}
```

Finally, we want to make sure that we re-draw the scene after we update the game state, so we'll make sure this happens in our `addPoint` function.

```js
function addPoint(game, playerName) {
  var player = game.players.find(
    player => player.name === playerName
  );

  player.score++;
  draw(game);
}
```

We can carry on building the game, but each time we add a function like `addPoint` we'll need to remember to call `draw(game)` and unless we're very careful, we'll end up in a long, twisted mess of mutable spaghetti code.

## Immutable
Let's come back to the project with a fresh approach. We'll treat our game state as immutable and only allow changes to happen through a transactional function.

```js
let game = {
  players: [
    { name: 'arthur', score: 0 },
    { name: 'ford', score: 0 },
    { name: 'trisha', score: 0 }
  ]
};

function updateGame(func) {
  game = func(game);
  draw(game);
}
```

Now instead of mutating the object directly to add points, we'll make sure our changes go through the `updateGame` interface.

This means that rather than mutating the `game` object, the function we pass to `updateGame` must return a new object instead.

```js
function addPoint(playerName) {
  var playerIndex = game.players.findIndex(
    player => player.name === playerName
  );

  updateGame(game => {
    return Object.assign({}, game, {
      players: Object.assign([], game.players, {
        [playerIndex]: Object.assign({}, game.players[playerIndex], {
          score: game.players[playerIndex].score + 1
        })
      })
    });
  });
}
```

Uh-oh, this `Object.assign` stuff really got out of hand fast! The popular advice is to use the object spread operator (`...`) when this happens. Let's rewrite.

```js
function addPoint(playerName) {
  var playerIndex = game.players.findIndex(
    player => player.name === playerName
  );

  updateGame(game => {
    return {
      ...game,
      players: Object.assign([], game.players, {
        [playerIndex]: {
          ...game.players[playerIndex],
          score: game.players[playerIndex].score + 1
        }
      })
    }
  });
}
```

That's not much better. Also, we weren't able to use `...` with our array either so we've ended up with a mix of conventions.

Time to try something else!

## ImmutableJS
That wasn't fun at all, but we've heard that ImmutableJS is great for this kind of problem. Let's remodel our data as immutable objects instead.

```js
import { Map, List } from 'immutable';

let game = Map({
  players: List([
    Map({ name: 'arthur', score: 0 }),
    Map({ name: 'ford', score: 0 }),
    Map({ name: 'trisha', score: 0 })
  ])
});

function updateGame(func) {
  game = func(game);
  draw(game);
}
```

Off to a good start. Now let's rewrite our logic.

```js
function addPoint(playerName) {
  const [playerIndex, player] = game.get('players').findEntry(
    player => player.name === playerName
  );

  updateGame(game => {
    return game.updateIn(
      ['players', playerIndex, 'score'],
      n => n + 1
    );
  });
}
```

Much cleaner. Everything seems great until we run the code and the draw function throws an error. It expects a regular JavaScript object as an argument. We'll need to convert our ImmutableJS collection into a native object before calling draw.

```js
function updateGame(func) {
  game = func(game);
  draw(game.toJS());
}
```

Everything seems great, but the further we get into our project the more we start to mix immutable objects and native ones. There's no clear way to know whether a given variable will be an immutable map or a native object.

```js
// do we need this:
players.get(0)
// or this:
players[0]
```

Eventually we decide that we need to be able to save the state between games. For this to work, we'll need to convert our immutable objects to JSON, then parse them when we restore the game.

```js
import { fromJS } from 'immutable';

function save(game) {
  const json = JSON.stringify(game.toJS());
  localStorage.setItem('game', json);
}

function load() {
  const json = localStorage.getItem('game');
  return fromJS(JSON.parse(json));
}
```

Unless we want to write our own [revivers](https://facebook.github.io/immutable-js/docs/#/fromJS), we'll need to use collections that can be parsed _and_ serialized, this leaves us with Maps and Lists. No Records, Sets or Stacks.

## Zaphod
With Zaphod, we can use the same object literals that we used before our adventure into ImmutableJS.

```js
let game = {
  players: [
    { name: 'arthur', score: 0 },
    { name: 'ford', score: 0 },
    { name: 'trisha', score: 0 }
  ]
};

function updateGame(func) {
  game = func(game);
  draw(game);
}
```

This also means that we don't need to use any `toJS` escape hatches before passing out game state to the draw function.

We can also get rid of the conversion steps in our save and load functions.

```js
function save(game) {
  const json = JSON.stringify(game);
  localStorage.setItem('game', json);
}

function load() {
  const json = localStorage.getItem('game');
  return JSON.parse(json);
}
```

Let's see how we can rewrite the logic for `addPoint`.

```js
import { updateIn } from 'zaphod';

function addPoint(playerName) {
  const playerIndex = game.players.findIndex(
    player => player.name === playerName
  );

  updateGame(game => {
    return game::updateIn(
      ['players', playerIndex, 'score'],
      n => n + 1
    );
  });
}
```

The `addPoint` function is very similar to the previous version. In fact, there's just one difference. We've used `::` instead of `.` to access the `updateIn` function.

Zaphod functions should be called on regular JavaScript objects, which they all treat as immutable. The function bind operator allows us to keep our data in a logical and readable position.

