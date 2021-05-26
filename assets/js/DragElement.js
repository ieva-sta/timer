export default class DragElement {
  constructor({element, cookieTitle = 'element_position'}) {
    this.element = element;
    this.cookieTitle = cookieTitle;
    this.init();
  }

  init = () => {
    this.disableDefaultDragEvent();
    this.getElementPositionFromCookies();

    this.setElementPosition();
    this.element.style.display = 'flex';

    this.element.addEventListener('mousedown', (event) => {
      this.calculatePointerDistance(event);

      this.moveElementOnDrag();
      this.placeElementOnDragEnd();
    });
  }

  moveElementOnDrag = () => {
    document.addEventListener('mousemove', this.onMouseMove);
  }

  /**
   * Drop the element, remove unneeded handlers
   * and set a cookie value with current element coordinates
   */
  placeElementOnDragEnd = () => {
    this.element.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.cookie = `${this.cookieTitle}=${this.elementPositionLeft},${this.elementPositionTop}`;
    });
  }

  /**
   * With default dragstart event enabled the element
   * will "stick" to the cursor, therefore it needs to be disabled
   */
  disableDefaultDragEvent = () => {
    this.element.ondragstart = () => {
      return false;
    };
  }

  /**
   * Calculate the distance from the pointer to the left-upper corner
   */
  calculatePointerDistance = (event) => {
    this.shiftX = event.clientX - this.element.getBoundingClientRect().left;
    this.shiftY = event.clientY - this.element.getBoundingClientRect().top;
  }

  /**
   * Move the element at (pageX, pageY) coordinates
   * taking initial shifts into account
   *
   * @param event
   */
  onMouseMove = (event) => {
    this.elementPositionLeft = event.pageX - this.shiftX;
    this.elementPositionTop = event.pageY - this.shiftY;

    this.setElementPosition();
  }

  setElementPosition = () => {
    this.element.style.left = this.elementPositionLeft + 'px';
    this.element.style.top = this.elementPositionTop + 'px';
  }

  /**
   * Get saved element coordinates
   * and position element accordingly
   */
  getElementPositionFromCookies = () => {
    if (document.cookie) {
      let cookies = document.cookie.split('; ');

      cookies.forEach((cookie) => {
        if (cookie.includes(this.cookieTitle)) {
          let coordinates = cookie.split("=").pop();
          coordinates = coordinates.split(',');

          this.elementPositionLeft = coordinates[0];
          this.elementPositionTop = coordinates[1];

          this.setElementPosition();
        }
      });
    }
  }
}
