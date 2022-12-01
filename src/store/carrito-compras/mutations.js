export function addItem (state, item) {
  state.items.push(item);
  calcularTotal(state);
}

export function setItems (state, items) {
  state.items = items;
  calcularTotal(state);
}

export function deleteItem (state, itemCarritoCompraID) {
  state.items = state.items.filter(item => item.itemCarritoCompraID !== itemCarritoCompraID);
  calcularTotal(state);
}

export function agregarPieza (state, itemCarritoCompraID) {
  state.items.find(item => item.itemCarritoCompraID == itemCarritoCompraID).cantidad++;
  calcularTotal(state);
}

export function quitarPieza (state, itemCarritoCompraID) {
  state.items.find(item => item.itemCarritoCompraID == itemCarritoCompraID).cantidad--;
  calcularTotal(state);
}

function calcularTotal (state) {
  state.total = state.items.flatMap(m => m.precio * m.cantidad).reduce((a, b) => a + b, 0);
}


