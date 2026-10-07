export interface LiveCalculationOptions {
  change?: boolean;
}

export function bindLiveCalculation(
  root: ParentNode,
  calculate: () => void,
  options: LiveCalculationOptions = {},
): () => void {
  const onInput = () => calculate();
  const onChange = () => calculate();

  root.addEventListener('input', onInput);
  if (options.change !== false) {
    root.addEventListener('change', onChange);
  }

  return () => {
    root.removeEventListener('input', onInput);
    root.removeEventListener('change', onChange);
  };
}
