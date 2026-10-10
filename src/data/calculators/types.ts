import type { CalculatorDetailsContent } from '../../lib/calculators/guidance';

export type CalculatorDirectoryGroupId =
  'finance' | 'payroll' | 'daily' | 'tax' | 'property';
export type CalculatorHomeGroupId =
  'finance' | 'payroll' | 'taxProperty' | 'daily';

export interface CalculatorDefinition {
  slug: string;
  title: string;
  description: string;
  category: string;
  directoryGroup: CalculatorDirectoryGroupId;
  directoryOrder: number;
  homeGroup?: CalculatorHomeGroupId;
  homeOrder?: number;
  guidance?: CalculatorDetailsContent;
}
