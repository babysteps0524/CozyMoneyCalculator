import { calculatorDefinitions, type CalculatorId } from './definitions';
import type { CalculatorDefinition } from './types';
import type {
  CalculatorDirectoryGroupId,
  CalculatorHomeGroupId,
} from './types';

type DirectoryGroupId = CalculatorDirectoryGroupId;
type HomeGroupId = CalculatorHomeGroupId;

const calculatorCatalog: Record<CalculatorId, CalculatorDefinition> =
  calculatorDefinitions;

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
