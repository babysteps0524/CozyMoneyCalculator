import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';

const components: Array<{ file: string; rootAttribute: string }> = [
  {
    file: 'src/components/calculators/SeveranceCalculator.astro',
    rootAttribute: 'data-severance-calculator',
  },
  {
    file: 'src/components/calculators/AnnualLeaveAllowanceCalculator.astro',
    rootAttribute: 'data-annual-leave-calculator',
  },
  {
    file: 'src/components/calculators/BrokerageCalculator.astro',
    rootAttribute: 'data-brokerage',
  },
  {
    file: 'src/components/calculators/PropertyTaxCalculator.astro',
    rootAttribute: 'data-property-tax',
  },
];

describe('calculator component roots', () => {
  test.each(components)(
    '$file renders the root attribute its script queries',
    ({ file, rootAttribute }) => {
      const source = readFileSync(file, 'utf-8');
      const template = source.slice(0, source.indexOf('<script>'));
      const script = source.slice(source.indexOf('<script>'));

      expect(script).toContain(`[${rootAttribute}]`);
      expect(template).toContain(`<div ${rootAttribute}>`);
    },
  );
});
