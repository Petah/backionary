// @todo disconnect idle players
const zxWordList = {
    zxEasy: ['cat', 'dog', 'tree', 'bat', 'hat', 'frog', 'bark'],
    zxMedium: ['dragon', 'danger', 'flappy', 'rhino'],
    zxHard: ['hippopotamus', 'dinosaurs', 'extraordinary', 'fabulous'],
}

class ZxGame {
    constructor() {
        this.zxData = {
            zxId: zxUid(),
            zxName: null,
            zxPlayers: [],
            zxTexts: [],
            zxCurrentDrawData: null,
            zxCurrentPlayer: null,
            zxSkillLevel: 'zxEasy',
            zxState: 'zxIdle',
        };

        this.zxCurrentWord = null;
        this.zxCurrentPlayerIndex = 10000;
        this.zxPaths = null;
        this.zxUpdateTimer = setInterval(this.zxUpdateLoop.bind(this), 100);

        this.zxCurrentPath = null;
        this.zxCurrentPathPoint = null;
    }

    zxBroadcast(zxHandler, zxData, zxExcludePlayer) {
        for (const zxPlayer of this.zxData.zxPlayers) {
            if (zxPlayer === zxExcludePlayer) {
                continue;
            }
            zxEmit(zxPlayer.zxSocket, zxHandler, zxData);
        }
    }

    zxUpdateLoop() {
        switch (this.zxData.zxState) {
            case 'zxIdle':
                // Get next player
                this.zxCurrentPlayerIndex++;
                if (this.zxCurrentPlayerIndex >= this.zxData.zxPlayers.length) {
                    this.zxCurrentPlayerIndex = 0;
                }
                this.zxData.zxCurrentPlayer = this.zxData.zxPlayers[this.zxCurrentPlayerIndex];

                // Get word for player to draw
                this.zxCurrentWord = zxWordList[this.zxData.zxSkillLevel][Math.floor(Math.random() * zxWordList[this.zxData.zxSkillLevel].length)];
                // @todo make sure word hasn't been used recently

                zxEmit(this.zxData.zxCurrentPlayer.zxSocket, 'zxDrawerStart', {
                    zxGame: this,
                    zxWord: this.zxCurrentWord,
                });

                this.zxBroadcast('zxDrawStart', {
                    zxGame: this,
                    zxPlayer: this.zxData.zxCurrentPlayer,
                }, this.zxData.zxCurrentPlayer);

                this.zxData.zxRound = 1;
                this.zxData.zxState = 'zxWaitingOnDrawer';
                break;

            case 'zxWaitingOnDrawer':
                // @todo Set time limit for player drawing incase idle
                break;

            case 'zxReady':
                this.zxCurrentPath = this.zxPaths.length - 1;
                this.zxCurrentPathPoint = this.zxPaths[this.zxCurrentPath].length - 1;
                this.zxData.zxState = 'zxDrawing';

                this.zxBroadcast('zxDrawing', {
                    zxPathBounds: zxGetPathBounds(this.zxPaths),
                });
                break;

            case 'zxDrawing':
                this.zxCurrentPathPoint--;
                if (this.zxCurrentPathPoint < 0) {
                    this.zxCurrentPath--;
                    if (this.zxCurrentPath < 0) {
                        // @todo path drawing done
                        break;
                    }
                    this.zxCurrentPathPoint = this.zxPaths[this.zxCurrentPath].length - 1;
                }
                const zxNextPoint = this.zxPaths[this.zxCurrentPath][this.zxCurrentPathPoint];
                this.zxBroadcast('zxNextPoint', {
                    zxCurrentPath: this.zxPaths.length - this.zxCurrentPath,
                    zxNextPoint: zxNextPoint,
                });
                break;
        }
    }
}

class ZxPlayer {
    constructor(zxSocket) {
        zxLog('Creating player', zxSocket.id);
        this.zxData = {
            zxId: zxUid(),
            zxName: null,
            zxScore: 0,
            // zxDrawnWords: [],
        };
        this.zxSocket = zxSocket;
        this.zxGame = null;
    }
}

const zxSockets = {};
const zxPlayers = [];
const zxGames = [];

const zxHandlers = {
    zxConnect(zxPlayer, zxData) {
        zxPlayer.zxData.zxName = zxData.zxName;
        return {
            zxConnected: true,
        };
    },

    zxCreateGame(zxPlayer, zxData) {
        const zxGame = new ZxGame();
        zxGame.zxData.zxPlayers.push(zxPlayer);
        zxGames.push(zxGame);
        zxPlayer.zxGame = zxGame;
        return zxGame;
    },

    zxJoinGame(zxPlayer, zxData) {
        const zxGame = zxGames.find(zxGame => zxGame.zxData.zxId === zxData.zxGameId);
        if (!zxGame) {
            return;
        }
        zxGame.zxData.zxPlayers.push(zxPlayer);
        zxGame.zxBroadcast('zxPlayerJoined', {
            zxGame: zxGame,
            zxPlayer: zxPlayer,
        }, zxPlayer);
        zxPlayer.zxGame = zxGame;
        return zxGame;
    },

    zxListGames(zxPlayer, zxData) {
        return zxGames;
    },

    zxSubmitText(zxPlayer, zxData) {
        const zxText = zxData.zxText.trim().toLowerCase();
        if (zxText) {
            zxPlayer.zxGame.zxData.zxTexts.push(`${zxPlayer.zxData.zxName}: ${zxText}`);
        }
        if (zxText == zxPlayer.zxGame.zxCurrentWord) {
            zxPlayer.zxGame.zxData.zxTexts.push(`You guessed correctly, the word is ${zxPlayer.zxGame.zxCurrentWord}!`);
            // @todo make the score variable based on time
            zxPlayer.zxData.zxScore += 100;
            zxPlayer.zxGame.zxData.zxState = 'zxIdle';
        }
        return zxPlayer.zxGame.zxData.zxTexts.slice(-5).reverse();
    },

    zxFetchWord(zxPlayer, zxData) {
        // @todo difficulty
        return zxWordList.zxEasy[Math.floor(Math.random() * zxWordList.zxEasy.length)];
    },

    zxDoneDrawing(zxPlayer, zxPaths) {
        if (zxPlayer.zxGame.zxData.zxState === 'zxWaitingOnDrawer' && zxPlayer === zxPlayer.zxGame.zxData.zxCurrentPlayer) {
            zxPlayer.zxGame.zxPaths = zxPaths;
            zxPlayer.zxGame.zxData.zxState = 'zxReady';
        }
    },
};

const zxGetPathBounds = (zxPaths) => {
    let zxMinX = 10000;
    let zxMinY = 10000;
    let zxMaxX = 0;
    let zxMaxY = 0;
    for (const zxPath of zxPaths) {
        for (const zxPoint of zxPath) {
            if (zxPoint.x < zxMinX) {
                zxMinX = zxPoint.x;
            }
            if (zxPoint.y < zxMinY) {
                zxMinY = zxPoint.y;
            }
            if (zxPoint.x > zxMaxX) {
                zxMaxX = zxPoint.x;
            }
            if (zxPoint.y > zxMaxY) {
                zxMaxY = zxPoint.y;
            }
        }
    }
    return `${zxMinX - 5} ${zxMinY - 5} ${zxMaxX - zxMinX + 10} ${zxMaxY - zxMinY + 10}`;
};

module.exports = {
    io: (zxSocket) => {
        // @todo make sure socket references is deleted on connection lost
        zxSockets[zxSocket.id] = zxSocket;
        const zxPlayer = new ZxPlayer(zxSocket);
        zxPlayers.push(zxPlayer);

        zxSocket.on('disconnect', () => {
            console.log('Disconnected: ' + zxSocket.id);
            // @todo remove players from active games, player list, etc
            // @todo remove socket from list
        });

        zxSocket.on('zxMessage', zxHandleMessage(zxSocket, zxPlayer));
    },

    stat: (req, res) => {
        storage.get('games', 0).then(games => {
            res.send(`<h1>Games played: ${games}</h1>`);
        });
    }
};
