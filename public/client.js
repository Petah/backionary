zxiName.value = localStorage.getItem('name') || '';;

let zxSocket;

const zxHide = (zxClass) => {
    for (const zxElement of document.querySelectorAll('.' + zxClass)) {
        zxElement.style.display = 'none';
    }
};

const zxShow = (zxClass) => {
    for (const zxElement of document.querySelectorAll('.' + zxClass)) {
        zxElement.style.display = '';
    }
};

const zxSetState = (zxState, zxData) => {
    zxLog('Set state', zxState, zxData);
    zxHide('zxIntroScreen');
    zxHide('zxLobby');
    zxHide('zxDrawing');
    zxHide('zxGuessing');
    zxHide('zxWaitingOnNextRound');
    zxShow(zxState);
    switch (zxState) {
        case 'zxDrawing':
            zxiWord.innerText = zxData.zxWord;
            zxiSvg.removeAttribute('viewBox');
            break;
        case 'zxGuessing':
            if (zxData.zxPathBounds) {
                zxiSvg.innerHTML = '';
                zxiSvg.setAttribute('viewBox', zxData.zxPathBounds);
            }
            break;
    }
};

const zxHandlers = {
    zxDrawerStart(zxPlayer, zxData) {
        zxUpdatePlayerList(zxData.zxGame);
        zxSetState('zxDrawing', zxData);
    },

    zxDrawStart(zxPlayer, zxData) {
        zxUpdatePlayerList(zxData.zxGame);
        zxSetState('zxWaitingOnNextRound', {});
    },

    zxDrawing(zxPlayer, zxData) {
        zxSetState('zxGuessing', zxData);
    },

    zxNextPoint(zxPlayer, zxData) {
        let zxPathElement = zxiSvg.querySelectorAll('path')[zxData.zxCurrentPath];
        if (!zxPathElement) {
            zxPathElement = zxCreateSvgPath(zxData.zxNextPoint);
        } else {
            zxAppendSvgPath(zxPathElement, zxData.zxNextPoint);
        }
    },

    zxPlayerJoined(zxPlayer, zxData) {
        zxUpdatePlayerList(zxData.zxGame);
    },
};

const zxBindSocket = () => {
    zxSocket.on('connect', async () => {
        zxLog('Socket connected');
        await zxEmitAwait(zxSocket, 'zxConnect', {
            zxName: zxiName.value,
        });
        zxSetState('zxLobby');
        const zxGames = await zxEmitAwait(zxSocket, 'zxListGames');
        zxiGameList.innerHTML = '';
        for (const zxGame of zxGames) {
            const zxDiv = document.createElement('div');
            // @todo fix pluralization
            zxDiv.innerText = `${zxGame.zxPlayers[0].zxName}'s game (${zxGame.zxPlayers.length} players)`;
            const zxButton = document.createElement('button');
            zxButton.innerText = 'Join game';
            zxButton.addEventListener('click', async () => {
                const zxReturnedGame = await zxEmitAwait(zxSocket, 'zxJoinGame', {
                    zxGameId: zxGame.zxId,
                });
                zxUpdatePlayerList(zxReturnedGame);
                zxSetState('zxWaitingOnNextRound', {});
            });
            zxDiv.append(zxButton);
            zxiGameList.append(zxDiv);
        }
    });

    zxSocket.on('disconnect', () => {
        setTimeout(() => location.reload(), 1000);
    });

    zxSocket.on('error', () => {
        setTimeout(() => location.reload(), 1000);
    });

    zxSocket.on('zxMessage', zxHandleMessage(zxSocket));

    zxSocket.on('zxResponse', (zxResponse) => {
        zxLog('Received response', zxResponse);
        if (!zxResponse || zxResponse.length !== 3) {
            console.error('Invalid response structure', zxResponse, zxResponse.length);
            return;
        }
        const [zxHandler, zxId, zxData] = zxResponse;
        if (!zxId || !zxHandler || !zxPendingResponses[zxId]) {
            console.error('Invalid response data', zxId, zxData);
            return;
        }
        zxPendingResponses[zxId](zxData);
    });
};

const zxUpdatePlayerList = (zxGame) => {
    zxiPlayerList.innerHTML = '';
    for (const zxPlayer of zxGame.zxPlayers) {
        const zxDiv = document.createElement('div');
        zxDiv.innerText = `${zxPlayer.zxName} ${zxPlayer.zxScore}pts`;
        zxiPlayerList.append(zxDiv);
    }
};