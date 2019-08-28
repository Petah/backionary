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
    let zxSvgPoint = zxiSvg.createSVGPoint();
    zxSvgPoint.x = e.clientX;
    zxSvgPoint.y = e.clientY;

    zxSvgPoint = zxSvgPoint.matrixTransform(zxiSvg.getScreenCTM().inverse());
    zxSvgPoint = {
        x: zxSvgPoint.x,
        y: zxSvgPoint.y,
    };
    zxCurrentPath.push(zxSvgPoint);
    return zxSvgPoint;
};

zxBind = (zxElement, zxEvents, zxCallback) => {
    for (const zxEvent of zxEvents) {
        zxElement.addEventListener(zxEvent, zxCallback);
    }
};

zxBind(zxiSvg, ['mousedown', 'touchstart'], (e) => {
    if (zxPathElement) {
        return;
    }

    // Init SVG path
    zxPathElement = zxCreateSvgPath(getSvgPoint(e));
});

zxBind(document, ['mouseup', 'touchend'], (e) => {
    if (!zxPathElement) {
        return;
    }

    // Store current iteration of strokes
    zxPaths.push(zxCurrentPath);
    zxCurrentPath = [];
    zxPathElement = null;
});

zxBind(document, ['mousemove', 'touchmove'], (e) => {
    if (!zxPathElement) {
        return;
    }

    zxAppendSvgPath(zxPathElement, getSvgPoint(e));
});
