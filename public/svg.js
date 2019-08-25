// Global state
const state = {
    dom: {
        svg: document.getElementById("zxiSvg"),
        svgPt: null,
        path: null,
    },
    mouse: {
        down: false,
        up: false,
    },
    paths: {
        list: [],
        current: []
    },
};

// SVG drawing stuff
const createSvgPath = (p) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "zxStroke");
    path.setAttribute("d", `M ${p.x} ${p.y}`);
    state.dom.svg.appendChild(path);
    
    return path;
};

// SVG events stuff
const getSvgPoint = e => {
    if (!state.dom.svgPt) {
        state.dom.svgPt = state.dom.svg.createSVGPoint();
    }
    state.dom.svgPt.x = e.clientX;
    state.dom.svgPt.y = e.clientY;

    const p = state.dom.svgPt.matrixTransform(
        state.dom.svg.getScreenCTM().inverse()
    );
    state.paths.current.push(p);
    
    return p;
};

const onStartStroke = e => {
    if (state.mouse.down) {
        return;
    }
    
    state.mouse.down = true;
    state.mouse.up = false;
    
    // Init SVG path
    state.dom.path = createSvgPath(getSvgPoint(e));
};

const onEndStroke = e => {
    if (state.mouse.up) {
        return;
    }
    
    // Store current iteration of strokes
    // and reset current drawing state
    state.mouse.down = false;
    state.mouse.up = true;
    state.paths.list.push(state.paths.current);
    state.paths.current = [];
    state.dom.path = null;
};

const onStroke = e => {
    if (!state.mouse.down) {
        return;
    }
    
    // Update SVG path
    const p = getSvgPoint(e);
    const d = state.dom.path.getAttribute('d') + ` L ${p.x} ${p.y}`;
    state.dom.path.setAttribute('d', d);
};

// Events hooks
[
    [onStartStroke, "mousedown", "touchstart"],
    [onEndStroke, "mouseup", "mouseout", "touchend"],
    [onStroke, "mousemove", "touchmove"],
].map(([handler, ...events]) => {
    events.map((eName) => {
        state.dom.svg.addEventListener(eName, handler)
    });
});
