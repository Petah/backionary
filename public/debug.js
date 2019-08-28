zxLogs = [];
zxLog = (...zxArgs) => {
    console.log(...zxArgs);
    zxLogs.push(zxArgs);
    // zxiLog.innerHTML = '';
    // for (const zxLogLine of zxLogs) {
    //     zxiLog.innerHTML += zxLogLine.map(zxLogItem => {
    //         if (typeof zxLogItem == 'string') {
    //             return zxLogItem;
    //         }
    //         return JSON.stringify(zxLogItem, null, 4);
    //     }).join(' ') + '\n';
    // }
};

zxiName.value = 'PetahNZ';
zxeConnect();
setTimeout(() => {
    zxeCreateGame();
}, 100);
