module.exports = (value, selectors) => {
  const labels = $$("label");

  if (value && typeof value === "string") {
    return labels
      .map((label) => label.getText().split("\n")[0])
      .filter((label) => label === value);
  }

  if (selectors) {
    return labels.filter((label) => label.getText() !== "");
  }

  return labels
    .map((label) => label.getText().split("\n")[0])
    .filter((label) => label !== "");
};
