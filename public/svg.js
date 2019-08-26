zxSvgPoint = null;
zxPathElement = null;
zxPaths = [];
zxCurrentPath = [];

// SVG drawing stuff
zxCreateSvgPath = (zxPoint) => {
    const zxPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    zxPath.setAttribute('class', 'zxStroke');
    zxPath.setAttribute('d', `M ${zxPoint.x} ${zxPoint.y}`);
    zxiSvg.appendChild(zxPath);
    return zxPath;
};

zxAppendSvgPath = (zxPath, zxPoint) => {
    zxPath.setAttribute('d', zxPath.getAttribute('d') + ` L ${zxPoint.x} ${zxPoint.y}`);
};

// SVG events stuff
getSvgPoint = (e) => {
    if (!zxSvgPoint) {
        zxSvgPoint = zxiSvg.createSVGPoint();
    }
    zxSvgPoint.x = e.clientX;
    zxSvgPoint.y = e.clientY;

    const zxPoint = zxSvgPoint.matrixTransform(zxiSvg.getScreenCTM().inverse());
    zxCurrentPath.push(zxPoint);
    return zxPoint;
};

zxBind = (zxEvents, zxCallback) => {
    for (const zxEvent of zxEvents) {
        zxiSvg.addEventListener(zxEvent, zxCallback);
    }
};

zxBind(['mousedown', 'touchstart'], (e) => {
    if (zxPathElement) {
        return;
    }

    // Init SVG path
    zxPathElement = zxCreateSvgPath(getSvgPoint(e));
});

zxBind(['mouseup', 'touchend'], (e) => {
    if (!zxPathElement) {
        return;
    }

    // Store current iteration of strokes
    zxPaths.push(zxCurrentPath);
    zxCurrentPath = [];
    zxPathElement = null;
});

zxBind(['mousemove', 'touchmove'], (e) => {
    if (!zxPathElement) {
        return;
    }

    zxAppendSvgPath(zxPathElement, getSvgPoint(e));
});
