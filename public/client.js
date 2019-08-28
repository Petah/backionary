let zxSocket;

const zxPendingResponses = {};

const zxEmit = async (zxMessage, zxData = {}) => {
    const zxId = Math.random().toString().replace(/^[0.]+/g, '');
    zxLog('Send', zxMessage, zxData, zxId);
    const zxPromise = new Promise(zxResolve => {
        zxPendingResponses[zxId] = zxResolve;
    });
    zxSocket.emit('zxMessage', [zxMessage, zxId, zxData]);
    return zxPromise;
};

const zxSetState = (zxState, zxData) => {
    zxiIntroScreen.style.display = 'none';
    zxiLobby.style.display = 'none';
    zxiInGame.style.display = 'none';
    switch (zxState) {
        case 'zxiIntroScreen':
            zxiIntroScreen.style.display = 'flex';
            break;
        case 'zxiLobby':
            zxiLobby.style.display = 'flex';
            break;
        case 'zxiInGame':
            zxiInGame.style.display = 'flex';
            break;
        case 'zxDrawing':
            zxiInGame.style.display = 'flex';
            break;
    }
};

const zxBindSocket = () => {
    zxSocket.on('connect', async () => {
        zxLog('Connected');
        const zxConnected = await zxEmit('zxConnect', {
            zxName: zxiName.value,
        });
        zxSetState('zxiLobby');
        const games = await zxEmit('zxListGames');
        console.log(games);
    });

    zxSocket.on('disconnect', () => {
        setTimeout(() => location.reload(), 1000);
    });

    zxSocket.on('error', () => {
        setTimeout(() => location.reload(), 1000);
    });

    zxSocket.on('zxDrawerStart', (zxDrawerStart) => {
        console.log('zxDrawerStart', zxDrawerStart);
        zxSetState('zxDrawing', zxDrawerStart);
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
