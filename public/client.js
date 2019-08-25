let zxSocket;

let zxPendingResponses = {};

let zxEmit = async (zxMessage, zxData = {}) => {
    const zxId = Math.random().toString().replace(/^[0.]+/g, '');
    zxLog('Send', zxMessage, zxData, zxId);
    const zxPromise = new Promise(zxResolve => {
        zxPendingResponses[zxId] = zxResolve;
    });
    zxSocket.emit('zxMessage', [zxMessage, zxId, zxData]);
    return zxPromise;
};

let zxBindSocket = () => {

    zxSocket.on('start', () => {
        enableButtons();
        zxLog('Round ' + (points.win + points.lose + points.draw + 1));
    });

    zxSocket.on('end', () => {
        zxLog('Waiting for opponent...');
    });

    zxSocket.on('connect', async () => {
        zxLog('Connected');
        const zxConnected = await zxEmit('zxConnect', {
            zxName: zxiName.value,
        });
        zxiIntroScreen.style.display = 'none';
        zxiLobby.style.display = 'flex';
        const games = await zxEmit('zxListGames');
        console.log(games);
    });

    zxSocket.on('disconnect', () => {
        zxLog('Connection lost!');
    });

    zxSocket.on('error', () => {
        zxLog('Connection error!');
    });

    zxSocket.on('zxResponse', (zxResponse) => {
        zxLog('Response', zxResponse);
        if (!zxResponse || zxResponse.length !== 3) {
            console.error('Invalid response structure', zxResponse, zxResponse.length);
            return;
        }
        const [zxId, zxFunction, zxData] = zxResponse;
        if (!zxId || !zxFunction || !zxData || !zxPendingResponses[zxId]) {
            console.error('Invalid response data', zxId, zxData);
            return;
        }
        zxPendingResponses[zxId](zxData);
    });
};

window.zxeConnect = () => {
    zxSocket = io({
        upgrade: false,
        transports: [
            'websocket',
        ],
    });
    zxBindSocket();
};

window.zxeCreateGame = async () => {
    const zxCreated = zxEmit('zxCreateGame');
    zxiLobby.style.display = 'none';
    zxiInGame.style.display = 'flex';
    console.log(zxCreated);
};

window.zxeSendInput = async (zxEvent) => {
    // Enter
    if (zxEvent.keyCode == 13) {
        const zxText = zxiChatInput.value;
        zxiChatInput.value = '';
        const zxResponse = await zxEmit('zxSubmitText', {
            zxText: zxText,
        });
        zxiChatLog.innerHTML = '';
        for (const zxLine of zxResponse) {
            zxiChatLog.innerHTML += zxLine + '\n';
        }
    }
};
