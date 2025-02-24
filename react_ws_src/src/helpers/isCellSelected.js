const isCellSelected = function (c, cell_vals) {
  if (cell_vals === undefined || cell_vals[c] === undefined) {
    return "Not selected";
  }

  switch (cell_vals[c]) {
    case "x":
      return "X";
    case "o":
      return "O";
    default:
      return "Not selected";
  }
};

export default isCellSelected;
