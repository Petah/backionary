// @todo disconnect idle players
const zxWordList = {
    zxEasy: ['cat', 'dog', 'tree', 'bat', 'hat', 'frog', 'bark'],
    zxMedium: ['dragon', 'danger', 'flappy', 'rhino'],
    zxHard: ['hippopotamus', 'dinosaurs', 'extraordinary', 'fabulous'],
}

class ZxGame {
    constructor() {
        this.zxData = {
            zxId: Math.random().toString().replace(/^[0.]+/g, ''),
            zxName: null,
            zxPlayers: [],
            zxCurrentPlayer: 10000,
            zxTexts: [],
            zxCurrentPlayer: null,
            zxCurrentWord: null,
            zxCurrentDrawData: null,
            zxSkillLevel: 'zxMedium',
        };

        this.zxUpdateTimer = setInterval(this.zxUpdateLoop.bind(this), 1000);
    }

    zxUpdateLoop() {
        if (!this.zxData.zxRound) {
            // Get next player
            this.zxData.zxCurrentPlayer++;
            if (this.zxData.zxCurrentPlayer >= this.zxData.zxPlayers.length) {
                this.zxData.zxCurrentPlayer = 0;
            }
            let zxNextPlayer = this.zxData.zxPlayers[this.zxData.zxCurrentPlayer];

            // Get word for player to draw
            let zxWord = zxWordList[this.zxData.zxSkillLevel][Math.floor(Math.random() * zxWordList[this.zxData.zxSkillLevel].length)];
            // @todo make sure word hasn't been used recently

            // @todo Set time limit for player drawing incase idle
            zxEmit(zxNextPlayer.zxSocket, 'zxDrawerStart', {
                zxWord,
            });
            for (const zxPlayer of this.zxData.zxPlayers) {
                if (zxPlayer == zxNextPlayer) {
                    continue;
                }
                zxEmit(zxPlayer.zxSocket, 'zxDrawStart', {
                    zxPlayer: zxPlayer,
                });
            }

            this.zxData.zxRound = 1;
        }
        // console.log(this);
    }
}

class ZxPlayer {
    constructor(zxSocket) {
        this.zxData = {
            zxName: null,
            zxScore: null,
            // zxDrawnWords: [],
        };
        this.zxSocket = zxSocket;
        this.zxGame = null;
    }
}

const zxSockets = {};
const zxPlayers = [];
const zxGames = {};

const zxHandlers = {
    zxConnect(zxPlayer, zxData) {
        zxPlayer.zxName = zxData.zxName;
        return {
            zxConnected: true,
        };
    },

    zxCreateGame(zxPlayer, zxData) {
        const zxGame = new ZxGame();
        zxGame.zxData.zxPlayers.push(zxPlayer);
        zxGames[zxGame.zxData.zxId] = zxGame;
        zxPlayer.zxGame = zxGame;
        return zxGame;
    },

    zxListGames(zxPlayer, zxData) {
        return zxGames;
    },

    zxSubmitText(zxPlayer, zxData) {
        if (zxData.zxText.trim()) {
            zxPlayer.zxGame.zxTexts.push(`${zxPlayer.zxName}: ${zxData.zxText}`);
        }
        return zxPlayer.zxGame.zxTexts.slice(-5);
    },

    zxFetchWord(zxPlayer, zxData) {
        // @todo difficulty
        return zxWordList.zxEasy[Math.floor(Math.random() * zxWordList.zxEasy.length)];
    },
};

const zxSerialize = (zxObject) => {
    if (Array.isArray(zxObject)) {
        // console.log('zxObject1', zxObject);
        const zxResult = [];
        for (const zxChild of zxObject) {
            zxResult.push(zxSerialize(zxChild));
        }
        return zxResult;
    }
    if (zxObject && typeof zxObject === 'object') {
        // console.log('zxObject2', typeof zxObject, zxObject);
        const zxResult = {};
        const zxObjectData = zxObject.zxData || zxObject;
        for (const zxKey in zxObjectData) {
            zxResult[zxKey] = zxSerialize(zxObjectData[zxKey]);
        }
        return zxResult;
    }
    // console.log('zxObject3', typeof zxObject, zxObject);
    return zxObject;
};

const zxEmit = (zxSocket, zxMessage, zxData) => {
    console.log('Emit', zxMessage, zxData);
    zxSocket.emit(zxMessage, zxSerialize(zxData));
};

module.exports = {
    io: (zxSocket) => {
        zxSockets[zxSocket.id] = zxSocket;
        const zxPlayer = new ZxPlayer(zxSocket);
        zxPlayers.push(zxPlayer);

        zxSocket.on('disconnect', () => {
            console.log('Disconnected: ' + zxSocket.id);
            // @todo remove players from active games, player list, etc
            // @todo remove socket from list
        });

        zxSocket.on('zxMessage', (zxMessage) => {
            // @todo send error response back to client
            console.error('Message', zxMessage);
            if (!zxMessage || zxMessage.length !== 3) {
                console.error('Invalid message structure', zxMessage, zxMessage.length);
                return;
            }
            let [zxFunction, zxId, zxData] = zxMessage;
            if (!zxHandlers[zxFunction] || !zxId || !zxData) {
                console.error('Invalid message data', zxFunction, zxId, zxData, zxHandlers[zxFunction]);
                return;
            }
            const zxResponse = zxHandlers[zxFunction](zxPlayer, zxData);
            console.log('Response', zxFunction, zxId, zxData, zxSerialize(zxResponse));
            zxEmit(zxSocket, 'zxResponse', [zxId, zxFunction, zxResponse]);
        });

        console.log('Connected: ' + zxSocket.id);
    },

    stat: (req, res) => {
        storage.get('games', 0).then(games => {
            res.send(`<h1>Games played: ${games}</h1>`);
        });
    }
};
