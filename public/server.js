class ZxGame {
	constructor() {
		this.zxId = Math.random().toString().replace(/^[0.]+/g, '');
		this.zxName = null;
		this.zxPlayers = [];
		this.zxTexts = [];
	}
}

class ZxPlayer {
	constructor(zxSocketId) {
		this.zxSocketId = zxSocketId;
		this.zxName = null;
		this.zxGame = null;
	}
}

let zxSockets = {};
let zxPlayers = [];
let zxGames = {};

let zxHandlers = {
	zxConnect(zxPlayer, zxData) {
		zxPlayer.name = zxData.zxName;
		return {
			zxConnected: true,
		};
	},

	zxCreateGame(zxPlayer, zxData) {
		const zxGame = new ZxGame();
		zxGame.zxPlayers.push(zxPlayer);
		zxGames[zxGame.zxId] = zxGame;
		zxPlayer.zxGameId = zxGame.zxId;
		return zxGame;
	},

	zxListGames(zxPlayer, zxData) {
		return zxGames;
	},

	zxSubmitText(zxPlayer, zxData) {
		zxGames[zxPlayer.zxGameId].zxTexts.push([zxPlayer.name, zxData.zxText]);
		return zxGames[zxPlayer.zxGameId].zxTexts;
	},
};

module.exports = {
	io: (zxSocket) => {
		zxSockets[zxSocket.id] = zxSocket;
		const zxPlayer = new ZxPlayer(zxSocket.id);
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
			console.log('Response', zxResponse);
			zxSocket.emit('zxResponse', [zxId, zxFunction, zxResponse]);
		});

		console.log('Connected: ' + zxSocket.id);
	},

	stat: (req, res) => {
		storage.get('games', 0).then(games => {
			res.send(`<h1>Games played: ${games}</h1>`);
		});
	}
};
