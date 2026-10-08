export function resetCalculatorFields(fields: ParentNode): void {
  fields.querySelectorAll<HTMLInputElement>('input').forEach((input) => {
    const defaultValue = input.dataset.defaultValue;
    if (defaultValue !== undefined) {
      input.value = defaultValue;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

  fields.querySelectorAll<HTMLSelectElement>('select').forEach((select) => {
    select.selectedIndex = 0;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  });
}
