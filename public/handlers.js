zxeConnect = () => {
    zxSocket = io({
        upgrade: false,
        transports: [
            'websocket',
        ],
    });
    zxBindSocket();
};

zxeCreateGame = async () => {
    const zxCreated = await zxEmit('zxCreateGame');
    zxiLobby.style.display = 'none';
    zxiInGame.style.display = 'flex';
    const zxWord = await zxEmit('zxFetchWord');
    zxiWord.innerText = zxWord;
};

zxeSendInput = async (zxEvent) => {
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

zxeDoneDrawing = async () => {
    zxGetPathBounds(zxPaths);
    zxPlayBack(zxPaths);
};

zxGetPathBounds = async (zxPaths) => {
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
    zxiSvg.setAttribute('viewBox', `${zxMinX - 5} ${zxMinY - 5} ${zxMaxX - zxMinX + 10} ${zxMaxY - zxMinY + 10}`);
};

zxPlayBack = async (zxPaths) => {
    zxiSvg.innerHTML = '';
    return new Promise((zxResolve) => {
        let i = zxPaths.length - 1
        let p = zxPaths[i].length - 1;
        let zxPathElement = zxCreateSvgPath(zxPaths[i][p]);
        const zxTimer = setInterval(() => {
            p--;
            if (p < 0) {
                i--;
                if (i < 0) {
                    clearInterval(zxTimer);
                    zxResolve();
                    return;
                }
                p = zxPaths[i].length - 1;
                zxPathElement = zxCreateSvgPath(zxPaths[i][p]);
            }
            zxAppendSvgPath(zxPathElement, zxPaths[i][p]);
        }, 30);
    });
};
