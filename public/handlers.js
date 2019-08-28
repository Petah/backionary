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
    const zxCreated = await zxEmitAwait(zxSocket, 'zxCreateGame');
    zxSetState('zxInGame');
};

zxeSendInput = async (zxEvent) => {
    // Enter
    if (zxEvent.keyCode == 13) {
        const zxText = zxiChatInput.value;
        zxiChatInput.value = '';
        const zxResponse = await zxEmitAwait(zxSocket, 'zxSubmitText', {
            zxText: zxText,
        });
        zxiChatLog.innerHTML = '';
        for (const zxLine of zxResponse) {
            zxiChatLog.innerText += zxLine + '\n';
        }
    }
};

zxeDoneDrawing = async () => {
    await zxEmitAwait(zxSocket, 'zxDoneDrawing', zxPaths);
    // zxGetPathBounds(zxPaths);
    // zxPlayBack(zxPaths);
};

// const zxPlayBack = async (zxPaths) => {
//     zxiSvg.innerHTML = '';
//     return new Promise((zxResolve) => {
//         let i = zxPaths.length - 1
//         let p = zxPaths[i].length - 1;
//         let zxPathElement = zxCreateSvgPath(zxPaths[i][p]);
//         const zxTimer = setInterval(() => {
//             p--;
//             if (p < 0) {
//                 i--;
//                 if (i < 0) {
//                     clearInterval(zxTimer);
//                     zxResolve();
//                     return;
//                 }
//                 p = zxPaths[i].length - 1;
//                 zxPathElement = zxCreateSvgPath(zxPaths[i][p]);
//             }
//             zxAppendSvgPath(zxPathElement, zxPaths[i][p]);
//         }, 30);
//     });
// };
