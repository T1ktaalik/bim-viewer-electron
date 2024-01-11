/**
 * @private
 */
import {math} from "../../../math/math.js";

const canvasPos = math.vec2();

const getCanvasPosFromEvent = function (event, canvasPos) {
    if (!event) {
        event = window.event;
        canvasPos[0] = event.x;
        canvasPos[1] = event.y;
    } else {
        let element = event.target;
        let totalOffsetLeft = 0;
        let totalOffsetTop = 0;
        while (element.offsetParent) {
            totalOffsetLeft += element.offsetLeft;
            totalOffsetTop += element.offsetTop;
            element = element.offsetParent;
        }
        canvasPos[0] = event.pageX - totalOffsetLeft;
        canvasPos[1] = event.pageY - totalOffsetTop;
    }
    return canvasPos;
};

/**
 * @private
 */
class MousePanRotateDollyHandler {

    constructor(scene, controllers, configs, states, updates) {

        this._scene = scene;

        const pickController = controllers.pickController;
        const pivotController = controllers.pivotController;

        let lastX;
        let lastY;
        let lastXDown = 0;
        let lastYDown = 0;
        let xRotateDelta = 0;
        let yRotateDelta = 0;
        let xPanDelta = 0;
        let yPanDelta = 0;
        this._down = false;

        let mouseDownLeft;
        let mouseDownMiddle;
        let mouseDownRight;

        let mouseDownPicked = false;
        const pickedWorldPos = math.vec3();

        const canvas = this._scene.canvas.canvas;

        const keyDown = [];

        document.addEventListener("keydown", this._documentKeyDownHandler = (e) => {
            if (!(configs.active && configs.pointerEnabled) || (!scene.input.keyboardEnabled)) {
                return;
            }
            if (!states.mouseover) {
                return;
            }
            const keyCode = e.keyCode;
            keyDown[keyCode] = true;
        });

        document.addEventListener("keyup", this._documentKeyUpHandler = (e) => {
            if (!(configs.active && configs.pointerEnabled) || (!scene.input.keyboardEnabled)) {
                return;
            }
            if (!states.mouseover) {
                return;
            }
            const keyCode = e.keyCode;
            keyDown[keyCode] = false;
        });

        canvas.addEventListener("mousedown", this._mouseDownHandler = (e) => {

            if (!(configs.active && configs.pointerEnabled)) {
                return;
            }

            this._down = true;

            switch (e.which) {

                case 1: // Left button

                    if (keyDown[scene.input.KEY_SHIFT] || configs.planView) {

                        canvas.style.cursor = "move";

                        xRotateDelta = 0;
                        yRotateDelta = 0;
                        xPanDelta = 0;
                        yPanDelta = 0;

                        lastX = states.mouseCanvasPos[0];
                        lastY = states.mouseCanvasPos[1];
                        lastXDown = states.mouseCanvasPos[0];
                        lastYDown = states.mouseCanvasPos[1];

                        pickController.pickCursorPos = states.mouseCanvasPos;
                        pickController.schedulePickSurface = true;
                        pickController.update();

                        if (pickController.picked && pickController.pickedSurface && pickController.pickResult) {
                            mouseDownPicked = true;
                            pickedWorldPos.set(pickController.pickResult.worldPos);
                        } else {
                            mouseDownPicked = false;
                        }

                    } else {

                        mouseDownLeft = true;
                        canvas.style.cursor = "move";

                        xRotateDelta = 0;
                        yRotateDelta = 0;
                        xPanDelta = 0;
                        yPanDelta = 0;

                        lastX = states.mouseCanvasPos[0];
                        lastY = states.mouseCanvasPos[1];
                        lastXDown = states.mouseCanvasPos[0];
                        lastYDown = states.mouseCanvasPos[1];
                    }

                    break;

                case 2: // Middle/both buttons

                    mouseDownMiddle = true;

                    if (!configs.panRightClick) {

                        canvas.style.cursor = "move";

                        xRotateDelta = 0;
                        yRotateDelta = 0;
                        xPanDelta = 0;
                        yPanDelta = 0;

                        lastX = states.mouseCanvasPos[0];
                        lastY = states.mouseCanvasPos[1];
                        lastXDown = states.mouseCanvasPos[0];
                        lastYDown = states.mouseCanvasPos[1];
                    }

                    break;

                case 3: // Right button

                    mouseDownRight = true;

                    if (configs.panRightClick) {

                        canvas.style.cursor = "move";

                        xRotateDelta = 0;
                        yRotateDelta = 0;
                        xPanDelta = 0;
                        yPanDelta = 0;

                        lastX = states.mouseCanvasPos[0];
                        lastY = states.mouseCanvasPos[1];
                        lastXDown = states.mouseCanvasPos[0];
                        lastYDown = states.mouseCanvasPos[1];

                        pickController.pickCursorPos = states.mouseCanvasPos;
                        pickController.schedulePickSurface = true;
                        pickController.update();

                        if (pickController.picked && pickController.pickedSurface && pickController.pickResult) {
                            mouseDownPicked = true;
                            pickedWorldPos.set(pickController.pickResult.worldPos);
                        } else {
                            mouseDownPicked = false;
                        }
                    }

                    break;

                default:
                    break;
            }
        });

        canvas.addEventListener("mousemove", this._mouseMoveHandler = (e) => {

            if (!(configs.active && configs.pointerEnabled)) {
                return;
            }

            if (!states.mouseover) {
                return;
            }

            updates.inputFromMouse = true;

            if (!this._down) {
                return;
            }

            // Scaling drag-rotate to canvas boundary

            const canvasBoundary = scene.canvas.boundary;
            const canvasWidth = canvasBoundary[2] - canvasBoundary[0];
            const canvasHeight = canvasBoundary[3] - canvasBoundary[1];
            const x = states.mouseCanvasPos[0];
            const y = states.mouseCanvasPos[1];

            const panning = keyDown[scene.input.KEY_SHIFT] || configs.planView || (!configs.panRightClick && mouseDownMiddle) || (configs.panRightClick && mouseDownRight);

            if (panning) {

                xPanDelta = (x - lastX);
                yPanDelta = (y - lastY);

                const camera = scene.camera;

                if (camera.projection === "perspective") {

                    const eyeLookDist = mouseDownPicked ? Math.abs(math.lenVec3(math.subVec3(pickedWorldPos, scene.camera.eye, []))) : scene.camera.eyeLookDist;
                    const targetDistance = eyeLookDist * Math.tan((camera.perspective.fov / 2) * Math.PI / 180.0);

                    updates.panDeltaX += ((configs.mousePanRate * 30.0 * xPanDelta) * targetDistance / canvasHeight);
                    updates.panDeltaY += ((configs.mousePanRate * 30.0 * yPanDelta) * targetDistance / canvasHeight);

                } else {

                    updates.panDeltaX += configs.mousePanRate * 10 * camera.ortho.scale * (xPanDelta / canvasHeight);
                    updates.panDeltaY += configs.mousePanRate * 10 * camera.ortho.scale * (yPanDelta / canvasHeight);
                }

            } else {

                if (!configs.planView) {

                    const sweep = configs.firstPerson ? 180 : 180;
                    updates.rotateDeltaY -= ((x - lastX) / canvasWidth) * sweep * configs.mouseRotationRate;
                    updates.rotateDeltaX += ((y - lastY) / canvasHeight) * sweep * configs.mouseRotationRate;
                }
            }

            lastX = x;
            lastY = y;
        });

        canvas.addEventListener("mouseup", this._mouseUpHandler = (e) => {
            if (!(configs.active && configs.pointerEnabled)) {
                return;
            }
            switch (e.which) {
                case 1: // Left button
                    mouseDownLeft = false;
                    break;
                case 2: // Middle/both buttons
                    mouseDownMiddle = false;
                    break;
                case 3: // Right button
                    mouseDownRight = false;
                    getCanvasPosFromEvent(e, canvasPos);
                    const x = canvasPos[0];
                    const y = canvasPos[1];
                    if (Math.abs(x - lastXDown) < 3 && Math.abs(y - lastYDown) < 3) {
                        controllers.cameraControl.fire("rightClick", { // For context menus
                            canvasPos: canvasPos,
                            event: e
                        }, true);
                    }
                    break;
                default:
                    break;
            }
            canvas.style.removeProperty("cursor");
            xRotateDelta = 0;
            yRotateDelta = 0;
            xPanDelta = 0;
            yPanDelta = 0;

            this._down = false;
        });

        canvas.addEventListener("mouseenter", this._mouseEnterHandler = () => {
            if (!(configs.active && configs.pointerEnabled)) {
                return;
            }
            xRotateDelta = 0;
            yRotateDelta = 0;
            xPanDelta = 0;
            yPanDelta = 0;

            this._down = false;
        });

        canvas.addEventListener("mouseleave", this._mouseLeaveHandler = () => {

            if (!(configs.active && configs.pointerEnabled)) {
                return;
            }

            xRotateDelta = 0;
            yRotateDelta = 0;
            xPanDelta = 0;
            yPanDelta = 0;

            updates.panDeltaX = 0;
            updates.panDeltaY = 0;
            updates.rotateDeltaX = 0;
            updates.rotateDeltaY = 0;

            this._down = false;
        });

        let lastWheelTime = null;

        canvas.addEventListener("wheel", this._mouseWheelHandler = (e) => {
            if (!(configs.active && configs.pointerEnabled)) {
                return;
            }
            const delta = Math.max(-1, Math.min(1, -e.deltaY * 40));
            if (delta === 0) {
                return;
            }
            const timeNow = performance.now();
            let timeDiff = (lastWheelTime !== null) ? (timeNow - lastWheelTime) : 60;
            if (timeDiff > 60) {
                timeDiff = 60;
            } else if (timeDiff < 1) {
                timeDiff = 1;
            }
            timeDiff = ((60 - timeDiff) * 0.4) + 1;
            lastWheelTime = timeNow;
            const d = delta / Math.abs(delta);
            updates.dollyDelta = -d * timeDiff;
            e.preventDefault();
        });
    }

    reset() {
        this._down = false;
    }

    destroy() {

        const canvas = this._scene.canvas.canvas;

        document.removeEventListener("keydown", this._documentKeyDownHandler);
        document.removeEventListener("keyup", this._documentKeyUpHandler);
        canvas.removeEventListener("mousedown", this._mouseDownHandler);
        canvas.removeEventListener("mousemove", this._mouseMoveHandler);
        canvas.removeEventListener("mouseup", this._mouseUpHandler);
        canvas.removeEventListener("mouseenter", this._mouseEnterHandler);
        canvas.removeEventListener("mouseleave", this._mouseLeaveHandler);
        canvas.removeEventListener("wheel", this._mouseWheelHandler);
    }
}

export {MousePanRotateDollyHandler};