import type { CalculatorId } from './definitions';

type DirectoryGroupId = 'finance' | 'payroll' | 'daily' | 'tax' | 'property';
type HomeGroupId = 'finance' | 'payroll' | 'taxProperty' | 'daily';

interface CalculatorCatalogEntry {
  directoryGroup: DirectoryGroupId;
  directoryOrder: number;
  homeGroup?: HomeGroupId;
  homeOrder?: number;
}

const calculatorCatalog: Record<CalculatorId, CalculatorCatalogEntry> = {
  loan: {
    directoryGroup: 'finance',
    directoryOrder: 0,
    homeGroup: 'finance',
    homeOrder: 0,
  },
  savings: {
    directoryGroup: 'finance',
    directoryOrder: 1,
    homeGroup: 'finance',
    homeOrder: 1,
  },
  compound: {
    directoryGroup: 'finance',
    directoryOrder: 2,
    homeGroup: 'finance',
    homeOrder: 2,
  },
  dsr: {
    directoryGroup: 'finance',
    directoryOrder: 3,
    homeGroup: 'finance',
    homeOrder: 3,
  },
  dti: {
    directoryGroup: 'finance',
    directoryOrder: 4,
    homeGroup: 'finance',
    homeOrder: 4,
  },
  salary: {
    directoryGroup: 'payroll',
    directoryOrder: 0,
    homeGroup: 'payroll',
    homeOrder: 0,
  },
  'monthly-salary': {
    directoryGroup: 'payroll',
    directoryOrder: 1,
    homeGroup: 'payroll',
    homeOrder: 1,
  },
  'hourly-wage': {
    directoryGroup: 'payroll',
    directoryOrder: 2,
    homeGroup: 'payroll',
    homeOrder: 2,
  },
  severance: {
    directoryGroup: 'payroll',
    directoryOrder: 3,
    homeGroup: 'payroll',
    homeOrder: 3,
  },
  weekly: {
    directoryGroup: 'payroll',
    directoryOrder: 4,
    homeGroup: 'payroll',
    homeOrder: 4,
  },
  vacation: {
    directoryGroup: 'payroll',
    directoryOrder: 5,
    homeGroup: 'payroll',
    homeOrder: 5,
  },
  unemployment: { directoryGroup: 'payroll', directoryOrder: 6 },
  percentage: {
    directoryGroup: 'daily',
    directoryOrder: 0,
    homeGroup: 'daily',
    homeOrder: 0,
  },
  vat: {
    directoryGroup: 'tax',
    directoryOrder: 0,
    homeGroup: 'taxProperty',
    homeOrder: 0,
  },
  incomeTax: {
    directoryGroup: 'tax',
    directoryOrder: 1,
    homeGroup: 'taxProperty',
    homeOrder: 1,
  },
  acquisition: {
    directoryGroup: 'tax',
    directoryOrder: 2,
    homeGroup: 'taxProperty',
    homeOrder: 2,
  },
  property: {
    directoryGroup: 'tax',
    directoryOrder: 3,
    homeGroup: 'taxProperty',
    homeOrder: 3,
  },
  capitalGain: {
    directoryGroup: 'tax',
    directoryOrder: 4,
    homeGroup: 'taxProperty',
    homeOrder: 4,
  },
  carTax: {
    directoryGroup: 'tax',
    directoryOrder: 5,
    homeGroup: 'daily',
    homeOrder: 1,
  },
  rent: {
    directoryGroup: 'property',
    directoryOrder: 0,
    homeGroup: 'taxProperty',
    homeOrder: 5,
  },
  brokerage: {
    directoryGroup: 'property',
    directoryOrder: 1,
    homeGroup: 'daily',
    homeOrder: 2,
  },
  leaseLoan: { directoryGroup: 'property', directoryOrder: 2 },
  'legal-scrivener': { directoryGroup: 'property', directoryOrder: 3 },
};

const directoryGroups = {
  finance: {
    title: '금융',
    description: '대출·저축·부채 관리에 필요한 계산기',
  },
  payroll: {
    title: '급여·노동',
    description: '급여와 근로에 관련된 계산기',
  },
  daily: {
    title: '생활 계산',
    description: '일상에서 자주 사용하는 기본 계산',
  },
  tax: {
    title: '세금',
    description: '세금 계산 원리를 간단하게 확인하는 도구',
  },
  property: {
    title: '부동산',
    description: '임대차와 부동산 거래에 필요한 계산기',
  },
} satisfies Record<DirectoryGroupId, { title: string; description: string }>;

const homeGroups = {
  finance: {
    title: '금융 계산기',
    description: '대출·저축·부채 관리',
  },
  payroll: {
    title: '급여·노동 계산기',
    description: '급여와 근로에 필요한 계산',
  },
  taxProperty: {
    title: '세금·부동산 계산기',
    description: '세금과 주거비를 간편하게 계산',
  },
  daily: {
    title: '생활 계산기',
    description: '일상에서 자주 쓰는 기본 계산',
  },
} satisfies Record<HomeGroupId, { title: string; description: string }>;

const calculatorIds = Object.keys(calculatorCatalog) as CalculatorId[];

export const calculatorDirectoryGroups = (
  Object.keys(directoryGroups) as DirectoryGroupId[]
).map((groupId) => ({
  ...directoryGroups[groupId],
  calculatorIds: calculatorIds
    .filter((id) => calculatorCatalog[id].directoryGroup === groupId)
    .sort(
      (left, right) =>
        calculatorCatalog[left].directoryOrder -
        calculatorCatalog[right].directoryOrder,
    ),
}));

export const calculatorHomeGroups = (
  Object.keys(homeGroups) as HomeGroupId[]
).map((groupId) => ({
  ...homeGroups[groupId],
  calculatorIds: calculatorIds
    .filter((id) => calculatorCatalog[id].homeGroup === groupId)
    .sort(
      (left, right) =>
        (calculatorCatalog[left].homeOrder ?? 0) -
        (calculatorCatalog[right].homeOrder ?? 0),
    ),
}));
