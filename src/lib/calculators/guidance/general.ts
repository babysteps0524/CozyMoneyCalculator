import type { CalculatorDetailsContent, CalculatorGuidance } from './types';

export const calculatorGuidance = {
  percentage: {
    intro:
      '퍼센트 계산은 기준값의 일정 비율을 구하거나, 일부가 전체에서 차지하는 비율, 두 값의 증감률, 퍼센트에 해당하는 원래 값 등을 구할 때 사용합니다. 이 계산기는 실생활에서 자주 쓰는 6가지 유형을 한곳에서 계산합니다.',
    steps: [
      '계산 유형을 먼저 선택합니다.',
      '화면에 표시된 입력값의 의미와 순서를 확인한 뒤 숫자를 입력합니다.',
      '계산 결과와 함께 실제 계산에 사용된 공식을 확인합니다.',
    ],
    formula:
      '대표 공식: Y의 X% = Y × X ÷ 100, X가 Y의 몇 % = X ÷ Y × 100, 증감률 = (새 값 - 이전 값) ÷ 이전 값 × 100.',
    basis:
      '백분율은 어떤 비율을 100을 기준으로 나타내는 일반적인 수학적 표현입니다. 따라서 이 계산기의 퍼센트 산식은 특정 세법이나 금융상품 약관이 아닌 일반적인 백분율 정의와 산술식을 기준으로 합니다.',
    cautions: [
      '증감률의 기준값은 이전 값이며, 이전 값이 0이면 증감률을 계산할 수 없습니다.',
      '퍼센트(%)와 퍼센트포인트(%p)는 다릅니다. 10%에서 12%는 2%p 증가이지만 상대적인 증감률은 20%입니다.',
      '금액 계산에서 원 단위 반올림·절사나 세금·수수료 규칙이 적용되면 실제 거래 결과와 차이가 날 수 있습니다.',
    ],
    examples: [
      {
        title: '200,000원의 15%',
        inputs: '기준값 200,000원과 비율 15%를 입력합니다.',
        result: '계산 결과는 30,000원입니다.',
      },
    ],
    faqs: [
      {
        question: '퍼센트와 퍼센트포인트는 무엇이 다른가요?',
        answer:
          '퍼센트포인트는 두 비율의 차이를 나타냅니다. 10%에서 12%로 바뀌면 차이는 2%p이고, 기존 비율 대비 증가율은 20%입니다.',
      },
      {
        question: '기준값이 0일 때 증감률을 구할 수 있나요?',
        answer:
          '이전 값이 0이면 나눗셈을 할 수 없어 일반적인 증감률을 계산할 수 없습니다.',
      },
    ],
    relatedCalculators: [
      {
        title: '부가가치세 계산기',
        href: '/calculators/vat/',
        description: '공급가액과 부가세 포함 금액을 계산합니다.',
      },
      {
        title: '복리 계산기',
        href: '/calculators/compound/',
        description: '금리와 기간에 따른 복리 변화를 확인합니다.',
      },
    ],
  },
} satisfies Record<string, CalculatorGuidance>;

export const supplementalCalculatorDetails = {
  percentage: {
    cautions: [
      '비율 변화의 차이(%p)와 상대적인 증감률(%)은 서로 다른 값입니다.',
      '이 계산기는 입력한 숫자를 산술적으로 계산하며 세금·수수료·거래별 반올림 기준은 별도로 적용해야 합니다.',
    ],
  },
} satisfies Record<string, CalculatorDetailsContent>;
