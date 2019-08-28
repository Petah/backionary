const zxPendingResponses = {};

const zxUid = () => Math.random().toString().replace(/^[0.]+/g, '');

const zxLog = (...zxArgs) => console.log(...zxArgs);
const zxLogError = (...zxArgs) => console.error(...zxArgs);

const zxEmit = (zxSocket, zxHandler, zxData = {}) => {
    zxEmitAwait(zxSocket, zxHandler, zxData).then((zxResponse) => {
        zxLog('Emit return', zxHandler, zxResponse);
    }).catch((zxError) => {
        if (zxError && zxError.message !== 'Response time out') {
            zxLogError('Emit return error', zxHandler, zxError);
        } else {
            zxLogError('Response time out', zxHandler);
        }
    });
};

const zxEmitAwait = async (zxSocket, zxHandler, zxData = {}) => {
    const zxId = zxUid();
    zxLog('Send message', zxHandler, zxData, zxId);
    const zxPromise = new Promise((zxResolve, zxReject) => {
        // @todo check this doesn't leak memory
        zxPendingResponses[zxId] = zxResolve;
        setTimeout(() => {
            zxReject(new Error('Response time out'));
        }, 1000);
    }).finally(() => {
        delete zxPendingResponses[zxId];
    });
    zxSocket.emit('zxMessage', [zxHandler, zxData, zxId]);
    return zxPromise;
};

const zxEmitResponse = (zxSocket, zxHandler, zxId, zxResponse = {}) => {
    zxResponse = zxSerialize(zxResponse);
    zxLog('Send response', zxHandler, zxId, zxResponse);
    zxSocket.emit('zxResponse', [zxHandler, zxId, zxResponse]);
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

const zxHandleMessage = (zxSocket, zxPlayer = null) => {
    return (zxMessage) => {
        zxLog('Received message', zxMessage);
        if (!zxMessage || zxMessage.length !== 3) {
            zxLogError('Invalid message structure', zxMessage, zxMessage.length);
            return;
        }
        let [zxHandler, zxData, zxId] = zxMessage;
        if (!zxId || !zxData) {
            zxLogError('Invalid message data', zxHandler, zxData, zxId, zxHandlers[zxHandler]);
            return;
        }
        if (!zxHandlers[zxHandler]) {
            zxLogError('Invalid message handler', zxHandler, zxData, zxId, zxHandlers[zxHandler]);
            return;
        }
        const zxResponse = zxHandlers[zxHandler](zxPlayer, zxData);
        zxEmitResponse(zxSocket, zxHandler, zxId, zxResponse);
    };
};