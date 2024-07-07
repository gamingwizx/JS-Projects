// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"minesweeper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NUMBER_OF_MINES = exports.BOARD_SIZE = void 0;
exports.checkLost = checkLost;
exports.checkWin = checkWin;
exports.createBoard = createBoard;
exports.generateMinePosition = generateMinePosition;
exports.markTile = markTile;
exports.revealMines = revealMines;
exports.revealTiles = revealTiles;
var TILE_STATUSES = {
  HIDDEN: "hidden",
  NUMBER: "number",
  MINE: "mine",
  MARKED: "marked"
};
var BOARD_SIZE = exports.BOARD_SIZE = 10;
var NUMBER_OF_MINES = exports.NUMBER_OF_MINES = 10;
var title = document.querySelector(".subtext");
function createBoard() {
  /* 
  1) generate the div, the x and y position based on the board_size
  2) generate mine position from it, and append the mine position in the board_size
  */

  var minePositions = generateMinePosition();
  var boardList = [];
  for (var x = 0; x < BOARD_SIZE; x++) {
    var row = [];
    for (var y = 0; y < BOARD_SIZE; y++) {
      var minePosition = minePositions.some(checkPosition.bind(null, {
        x: x,
        y: y
      }));
      var tile = document.createElement("div");
      tile.dataset.status = TILE_STATUSES.HIDDEN;
      var tileElement = {
        element: tile,
        x: x,
        y: y,
        minePosition: minePosition
      };
      row.push(tileElement);
    }
    boardList.push(row);
  }
  return boardList;
}
function markTile(tile) {
  if (tile.dataset.status !== TILE_STATUSES.MARKED) {
    tile.dataset.status = TILE_STATUSES.MARKED;
  } else {
    tile.dataset.status = TILE_STATUSES.HIDDEN;
  }
}
function revealTiles(board, tile) {
  /* 
    1) check surrounding tiles
    2) if there are mines, then set number
    3) if no, recurse through the function again
  */

  if (tile.element.dataset.status !== TILE_STATUSES.HIDDEN) return;
  if (tile.minePosition) {
    tile.element.dataset.status = TILE_STATUSES.MINE;
    return;
  }
  var adjacentTiles = getAdjacentTiles(board, tile);
  var numberOfMines = adjacentTiles.filter(function (element) {
    return element.minePosition;
  }).length;
  tile.element.dataset.status = TILE_STATUSES.NUMBER;
  if (numberOfMines > 0) {
    tile.element.innerHTML = numberOfMines;
  } else {
    //where can i get the tile?
    //how to loop through the function
    adjacentTiles.forEach(revealTiles.bind(null, board));
  }
}
function checkWin(board) {
  return board.every(function (row) {
    return row.every(function (tile) {
      return tile.element.dataset.status === TILE_STATUSES.NUMBER || tile.minePosition && (tile.element.dataset.status === TILE_STATUSES.HIDDEN || tile.element.dataset.status === TILE_STATUSES.MARKED);
    });
  });
}
function checkLost(board) {
  return board.some(function (row) {
    return row.some(function (tile) {
      return tile.element.dataset.status === TILE_STATUSES.MINE;
    });
  });
}
function revealMines(board) {
  board.forEach(function (row) {
    row.forEach(function (element) {
      if (element.minePosition) {
        element.element.dataset.status = TILE_STATUSES.MINE;
      }
    });
  });
}
function getAdjacentTiles(board, tile) {
  var adjacentTiles = [];
  for (var offsetX = -1; offsetX <= 1; offsetX++) {
    for (var offsetY = -1; offsetY <= 1; offsetY++) {
      var _board;
      //How to get the position using x and y, and push the position into the adjacentTiles

      var positionExist = (_board = board[tile.x + offsetX]) === null || _board === void 0 ? void 0 : _board[tile.y + offsetY];
      if (positionExist) adjacentTiles.push(positionExist);
    }
  }
  return adjacentTiles;
}
function generateMinePosition() {
  var minePositionList = [];
  var i = 0;
  while (minePositionList.length < NUMBER_OF_MINES) {
    var minePosition = {
      x: randomNumber(BOARD_SIZE),
      y: randomNumber(BOARD_SIZE)
    };
    var checkPositionExist = minePositionList.some(checkPosition.bind(null, minePosition));
    if (!checkPositionExist) minePositionList.push(minePosition);
  }
  return minePositionList;
}
function checkPosition(existingPosition, newPosition) {
  return existingPosition.x === newPosition.x && existingPosition.y === newPosition.y;
}
function randomNumber(number) {
  return Math.floor(Math.random() * number);
}
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _minesweeper = require("./minesweeper.js");
/* 
the flow technically
-- load up the mines by randomizing the position of mines on the board
1) find out the number of mines
2) find out the size of the board, the dimensions
3) randomize the position of mines in the board

1) load the blocks into the minesweeper

-- when click, it will reveal the state of the mine, mine, safe, number of nearby mines
1) each block has an eventlistener linked to it
2) when clicked, get the position of the block, using the position, check with the position of the mine
    1) if it matches, then return a game over = true, and check if game over with a function.
        1) if gameover, show all tiles, (including the mines and the blocks without mines)
    2) if it doesn't match, check for nearby mines, within the the 1 block area
        1) add up all the mines within the area, and display it onto the block
        2) find out nearby linking blocks that are not mines, then open them up as well

-- click all the safed blocks are cleared, display a message called you win
3) if there are no more unopened non-mine blocks, display, you win the game.
*/

var TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked"
};
var board = document.querySelector(".board");
var mineCount = document.querySelector("[data-mine-count]");
var title = document.querySelector(".subtext");

//2) find out the size of the board, the dimensions

var boardElements = (0, _minesweeper.createBoard)();
mineCount.innerHTML = _minesweeper.NUMBER_OF_MINES;
boardElements.forEach(function (row) {
  row.forEach(function (element) {
    board.appendChild(element.element);
    element.element.addEventListener("click", function (e) {
      (0, _minesweeper.revealTiles)(boardElements, element);
      checkWinLose();
    });
    element.element.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      (0, _minesweeper.markTile)(element.element);
    });
  });
});
board.style.setProperty("--size", _minesweeper.BOARD_SIZE);
function checkWinLose() {
  var win = (0, _minesweeper.checkWin)(boardElements);
  var lose = (0, _minesweeper.checkLost)(boardElements);
  if (win || lose) {
    //addeventlistener to prevent clicking
    boardElements.forEach(function (row) {
      row.forEach(function (element) {
        element.element.addEventListener("click", stopProp, {
          capture: true
        });
        element.element.addEventListener("contextmenu", stopProp, {
          capture: true
        });
      });
    });
  }
  if (win) {
    title.innerHTML = "You win!";
  }
  if (lose) {
    title.innerHTML = "You lose!";
    (0, _minesweeper.revealMines)(boardElements);
  }
}
function stopProp(e) {
  e.stopImmediatePropagation();
}

/* 
1) get the board
2) loop through the board
3) append the elements into the board
4) set the size of the board
*/

//3) randomize the position of mines in the board
// const MINES_POSITION = []
// for (let i = 0; i < NUMBER_OF_MINES; i++) {
//   const x = Math.floor(Math.random() * 10 + 1)
//   const y = Math.floor(Math.random() * 10 + 1)
//   const positionExist = MINES_POSITION.find(
//     (element) => JSON.stringify(element) === JSON.stringify([x, y])
//   )

//   if (!positionExist) {
//     MINES_POSITION[i] = [x, y]
//   }
// }
// const BOARD_SIZE = 10
// const boardElement = document.querySelector(".board")

// const boardElements = []

// for (let x = 0; x < BOARD_SIZE; x++) {
//   const row = []
//   for (let y = 0; y < BOARD_SIZE; y++) {
//     const element = document.createElement("div")
//     element.dataset.status = "hidden"
//     const obj = {
//       element,
//       x,
//       y
//     }
//     row.push(obj)
//   }
//   boardElements.push(row)
// }

// boardElements.forEach((element) => {
//   element.forEach((tile) => {
//     boardElement.append(tile.element)
//   })
// })

// boardElement.style.setProperty("--size", BOARD_SIZE)

//1) load the blocks into the minesweeper
// const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)

// // Game logic

// export function createBoard(boardSize, numberOfMines) {
//   const board = []
//   const minePositions = getMinePositions(boardSize, numberOfMines)
//   for (let x = 0; x < boardSize; x++) {
//     const row = []
//     for (let y = 0; y < boardSize; y++) {
//       const element = document.createElement("div")
//       element.dataset.status = TILE_STATUSES.HIDDEN
//       const tile = {
//         element,
//         x,
//         y,
//         mine: minePositions.some(positionMatch.bind(null, { x, y })),
//         get status() {
//           return this.element.dataset.status
//         },
//         set status(value) {
//           this.element.dataset.status = value
//         }
//       }
//       row.push(tile)
//     }
//     board.push(row)
//   }
//   return board
// }

// function getMinePositions(boardSize, numberOfMines) {
//   const positions = []

//   while (positions.length < numberOfMines) {
//     const position = {
//       x: randomNumber(boardSize),
//       y: randomNumber(boardSize)
//     }

//     if (!positions.some(positionMatch.bind(null, position))) {
//       positions.push(position)
//     }
//   }

//   return positions
// }

// function positionMatch(a, b) {
//   return a.x === b.x && a.y === b.y
// }

// function randomNumber(size) {
//   return Math.floor(Math.random() * size)
// }

// function nearbyTiles(board, { x, y }) {
//   const tiles = []

//   for (let xOffset = -1; xOffset <= 1; xOffset++) {
//     for (let yOffset = -1; yOffset <= 1; yOffset++) {
//       const tile = board[x + xOffset]?.[y + yOffset]
//       if (tile) tiles.push(tile)
//     }
//   }

//   return tiles
// }

// board.forEach((row) => {
//   row.forEach((tile) => {
//     console.log(tile.element)
//     boardElement.append(tile.element)
//   })
// })
// boardElement.style.setProperty("--size", BOARD_SIZE)
// minesLeftText.textContent = NUMBER_OF_MINES
},{"./minesweeper.js":"minesweeper.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57852" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map