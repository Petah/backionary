zxeConnect = () => {
    if (!zxiName.value) {
        alert('Please enter your name.');
        return;
    }
    localStorage.setItem('name', zxiName.value);
    zxSocket = io({
        upgrade: false,
        transports: [
            'websocket',
        ],
    });
    zxBindSocket();
};

zxeCreateGame = async () => {
    const zxGame = await zxEmitAwait(zxSocket, 'zxCreateGame');
    zxUpdatePlayerList(zxGame);
    zxSetState('zxGuessing', {});
};

zxeSendInput = async (zxEvent) => {
    // Enter
    if (zxEvent.keyCode == 13) {
        const zxText = zxiChatInput.value;
        zxiChatInput.value = '';
        await zxEmitAwait(zxSocket, 'zxSubmitText', {
            zxText: zxText,
        });
    }
};

zxeDoneDrawing = async () => {
    await zxEmitAwait(zxSocket, 'zxDoneDrawing', zxPaths);
    zxPaths = [];
};
