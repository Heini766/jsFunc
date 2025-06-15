// This script usses external functions (func). 

const mouseMoveHandler = (event) => {

  const display = null; // Parameter 1 - The container in which the node exist
  const displayAspect = null; // Parameter 2 - The aspect ratio of the container.

  let cursorRelativePosition = func.getRelativePosition(event, display);
  let cursorRelPos = {x: cursorRelativePosition.x * displayAspect.x, y: cursorRelativePosition.y * displayAspect.y};
  
  const shapeSelected = event.currentTarget;
  const currentPos = func.extNumbers(shapeSelected.getAttribute('transform')); // *Note - Important that the node already has a value for the transform attribute.
  const shapePos = {x: currentPos[0], y: currentPos[1]};
  const offset = func.getPositionOffset(shapePos, cursorRelPos);

  let newPosition;

  const mouseMoveHandler = (event) => {

    cursorRelativePosition = func.getRelativePosition(event, display);
    cursorRelPos = {x: cursorRelativePosition.x * displayAspect.x, y: cursorRelativePosition.y * displayAspect.y};
    newPosition = {
      x: func.clamp(cursorRelPos.x + offset.x, displayAspect.x * .01, displayAspect.x),
      y: func.clamp(cursorRelPos.y + offset.y, displayAspect.y * .01, displayAspect.y)
    };
    shapeSelected.setAttribute('transform', `translate(${newPosition.x} ${newPosition.y})`);
    shapeSelected.childNodes.forEach(element => {
      element.style.fill = `${props.cssCustomProps.accentColor}`;
      element.style.r = `${props.stStrokeWidth * 2}`;
    });
    
  };

  const mouseUpHandler = () => {
    
    window.removeEventListener('mousemove', mouseMoveHandler);
    window.removeEventListener('mouseup', mouseUpHandler);
    
  };

  window.addEventListener('mouseup', mouseUpHandler);
  window.addEventListener('mousemove', mouseMoveHandler);
  
};
