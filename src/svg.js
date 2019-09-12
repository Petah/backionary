zxPathElement = null;
zxPaths = [];
zxCurrentPath = [];

// SVG drawing stuff
zxCreateSvgPath = (zxPoint) => {
    const zxPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    zxPath.setAttribute('class', 'zxStroke');
    zxPath.setAttribute('d', `M ${zxPoint[0]} ${zxPoint[1]}`);
    zxiSvg.appendChild(zxPath);
    return zxPath;
};

zxClearSvg = () => {
    for (const zxPath of zxiSvg.querySelectorAll('path')) {
        zxPath.parentNode.removeChild(zxPath);
    }
};

zxAppendSvgPath = (zxPath, zxPoint) => {
    zxPath.setAttribute('d', zxPath.getAttribute('d') + ` L ${zxPoint[0]} ${zxPoint[1]}`);
};

// SVG events stuff
getSvgPoint = (e) => {
    let zxSvgPoint = zxiSvg.createSVGPoint();
    zxSvgPoint.x = e.clientX;
    zxSvgPoint.y = e.clientY;

    zxSvgPoint = zxSvgPoint.matrixTransform(zxiSvg.getScreenCTM().inverse());
    zxSvgPoint = [
        Math.round(zxSvgPoint.x),
        Math.round(zxSvgPoint.y),
    ];
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
