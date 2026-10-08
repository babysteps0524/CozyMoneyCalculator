import { bindNumberControls } from './number-input';

export interface LiveCalculationOptions {
  change?: boolean;
}

export interface CalculatorInputOptions extends LiveCalculationOptions {
  numberControls?: boolean;
}

const liveCalculationBindings = new WeakMap<
  ParentNode,
  { cleanup: () => void }
>();

export function bindCalculatorInputs(
  root: ParentNode,
  calculate: () => void,
  options: CalculatorInputOptions = {},
): () => void {
  let observer: MutationObserver | undefined;

  if (options.numberControls !== false) {
    bindNumberControls(root);

    if (root instanceof Element) {
      observer = new MutationObserver(() => bindNumberControls(root));
      observer.observe(root, { childList: true, subtree: true });
    }
  }

  const cleanup = bindLiveCalculation(root, calculate, options);

  if (!observer) return cleanup;

  return () => {
    observer?.disconnect();
    cleanup();
  };
}

export function bindLiveCalculation(
  root: ParentNode,
  calculate: () => void,
  options: LiveCalculationOptions = {},
): () => void {
  const existing = liveCalculationBindings.get(root);
  if (existing) {
    return existing.cleanup;
  }

  const onInput = () => calculate();
  const onChange = () => calculate();

  root.addEventListener('input', onInput);
  if (options.change) {
    root.addEventListener('change', onChange);
  }

  let active = true;
  const cleanup = () => {
    if (!active) return;

    active = false;
    root.removeEventListener('input', onInput);
    if (options.change) {
      root.removeEventListener('change', onChange);
    }

    liveCalculationBindings.delete(root);
  };

  liveCalculationBindings.set(root, { cleanup });
  return cleanup;
}
