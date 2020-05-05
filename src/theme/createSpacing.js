export default function createSpacing(spacingInput = 8) {
  const spacing = (times = 1) => {
    return Math.ceil(spacingInput * times);
  };

  return spacing;
}
