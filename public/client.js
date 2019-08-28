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
    zxHide('zxIntroScreen');
    zxHide('zxLobby');
    zxHide('zxInGame');
    zxHide('zxDrawing');
    zxHide('zxGuessing');
    zxShow(zxState);
    switch (zxState) {
        case 'zxGuessing':
            zxiSvg.innerHTML = '';
            zxiSvg.setAttribute('viewBox', zxData.zxPathBounds);
            break;
    }
};

const zxHandlers = {
    zxDrawerStart(zxPlayer, zxData) {
        zxSetState('zxDrawing');
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
        console.log(zxData.zxCurrentPath);
    },
};

const zxBindSocket = () => {
    zxSocket.on('connect', async () => {
        await zxEmitAwait(zxSocket, 'zxConnect', {
            zxName: zxiName.value,
        });
        zxSetState('zxiLobby');
        const games = await zxEmitAwait(zxSocket, 'zxListGames');
        // @todo show list of games in lobby
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
