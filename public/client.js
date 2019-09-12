zxiName.value = localStorage.getItem('name') || '';;

let zxSocket;

const zxHide = (zxClass) => {
    for (const zxElement of document.querySelectorAll('.' + zxClass)) {
        zxElement.dataset.display = zxElement.dataset.display || (zxElement.style.display == 'none' ? '' : zxElement.style.display);
        zxElement.style.display = 'none';
    }
};

const zxShow = (zxClass) => {
    for (const zxElement of document.querySelectorAll('.' + zxClass)) {
        zxElement.style.display = zxElement.dataset.display || '';
    }
};

const zxSetState = (zxState, zxData) => {
    zxLog('Set state', zxState, zxData);
    zxHide('zxIntroScreen');
    zxHide('zxLobby');
    zxHide('zxDrawing');
    zxHide('zxGuessing');
    zxHide('zxWaiting');
    zxHide('zxWaitingOnNextRound');
    zxHide('zxCountDown');
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
        zxClearSvg();
        zxUpdatePlayerList(zxData.zxGame);
        zxSetState('zxDrawing', zxData);
    },

    zxDrawStart(zxPlayer, zxData) {
        zxUpdatePlayerList(zxData.zxGame);
        zxSetState('zxWaitingOnNextRound', {});
    },

    zxGameConnected(zxPlayer, zxData) {
        zxSetState('zxWaitingOnNextRound', {});
    },

    zxDrawing(zxPlayer, zxData) {
        zxSetState('zxGuessing', zxData);
    },

    zxWaitingForRoundEnd(zxPlayer, zxData) {
        zxClearSvg();
        zxSetState('zxWaiting', zxData);
    },

    zxNextPoint(zxPlayer, zxData) {
        let zxPathElement = zxiSvg.querySelectorAll('path')[zxData.zxCurrentPath];
        if (!zxPathElement) {
            zxPathElement = zxCreateSvgPath(zxData.zxNextPoint);
        } else {
            zxAppendSvgPath(zxPathElement, zxData.zxNextPoint);
        }
    },

    zxUpdatePlayers(zxPlayer, zxData) {
        zxUpdatePlayerList(zxData.zxGame);
    },

    zxRecieveText(zxPlayer, zxData) {
        if (zxData.zxLines.length > 0) {
            zxiChatLog.innerText = zxData.zxLines.join('\n');
            zxiChatLog.style.display = '';
        }
    },

    zxCountDown(zxPlayer, zxData) {
        zxShow('zxCountDown');
        zxiCountDown.innerText = zxData.zxCountDown.toFixed(1);
    },
};

const zxBindSocket = () => {
    zxSocket.on('connect', async () => {
        zxLog('Socket connected');
        await zxEmitAwait(zxSocket, 'zxConnect', {
            zxName: zxiName.value,
        });
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
        zxDiv.innerText = `${zxPlayer.zxName} - ${zxPlayer.zxScore}pts`;
        zxiPlayerList.append(zxDiv);
    }
};