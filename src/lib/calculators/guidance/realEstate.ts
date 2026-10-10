import type { CalculatorDetailsContent, CalculatorGuidance } from './types';

export const calculatorGuidance = {
  rent: {
    intro: '보증금과 월세를 같은 연간 기준으로 환산해 주거비를 비교합니다.',
    steps: [
      '보증금에 전월세 전환율을 적용합니다.',
      '월세에 12개월을 곱합니다.',
      '두 환산액을 합산합니다.',
    ],
    formula: '보증금 환산액 = 보증금 × 전환율. 연간 월세 = 월세 × 12.',
    basis:
      '주택임대차보호법상 전월세전환율 관련 규정을 참고하되 실제 계약조건을 우선 확인합니다.',
    cautions: [
      '법정 전환율 상한과 임대인이 제시하는 전환율은 구분해야 합니다.',
      '계약 변경 가능 여부를 판단하는 계산기는 아닙니다.',
    ],
    examples: [
      {
        title: '보증금 1억 원, 월세 50만 원',
        inputs: '비교에 사용할 연 전환율을 5%로 입력합니다.',
        result: '보증금의 연 환산액은 500만 원이고, 연 월세는 600만 원입니다.',
      },
    ],
    faqs: [
      {
        question: '전월세 전환율을 입력하면 법정 한도가 적용되나요?',
        answer:
          '입력한 전환율로 비용을 비교합니다. 법정 상한 적용 여부와 실제 계약 조건은 별도로 확인해야 합니다.',
      },
      {
        question: '보증금과 월세 중 어느 쪽이 유리한가요?',
        answer:
          '이 계산기는 입력한 환산율을 기준으로 부담액을 비교합니다. 대출이자, 관리비, 계약 기간과 보증금 회수 위험도 함께 고려하세요.',
      },
    ],
    sources: [
      {
        title: '주택임대차보호법 시행령 제9조(월차임 전환 시 산정률)',
        href: 'https://law.go.kr/lsLinkCommonInfo.do?lspttninfSeq=130111',
      },
    ],
    sourceReview: {
      effectivePeriod: '2026-07-01 시행 주택임대차보호법 시행령',
      checkedAt: '2026-10-11',
    },
    relatedCalculators: [
      {
        title: '전세대출 이자 계산기',
        href: '/calculators/leaseLoan/',
        description: '보증금 기준 예상 대출금과 단순 이자를 계산합니다.',
      },
      {
        title: '중개보수 계산기',
        href: '/calculators/brokerage/',
        description: '주택 임대차 거래의 중개보수를 확인합니다.',
      },
    ],
  },
} satisfies Record<string, CalculatorGuidance>;

export const supplementalCalculatorDetails = {
  brokerage: {
    examples: [
      {
        title: '주택 매매 3억 원, 부가가치세 10%',
        inputs: '주택 매매 기본 요율 0.4%와 부가가치세 10%를 적용합니다.',
        result:
          '중개보수 1,200,000원과 부가가치세 120,000원을 합해 1,320,000원입니다.',
      },
    ],
    faqs: [
      {
        question: '계산된 중개보수가 확정 수수료인가요?',
        answer:
          '법정 상한을 기준으로 한 예상액입니다. 실제 수수료는 상한 범위에서 협의하거나 거래 종류에 맞는 별도 기준이 적용될 수 있습니다.',
      },
      {
        question: '부가가치세도 포함되어 있나요?',
        answer:
          '부가가치세 포함 여부는 계산 결과의 항목과 설정을 확인하세요. 중개업자의 과세 유형과 거래 조건에 따라 달라질 수 있습니다.',
      },
    ],
    cautions: [
      '적용 요율과 한도는 주택 여부, 거래 종류, 거래금액과 지역 기준에 따라 달라질 수 있습니다.',
      '계산 결과는 협의된 최종 보수나 세금계산서 금액을 보장하지 않습니다.',
    ],
    sources: [
      {
        title: '공인중개사법 시행규칙 제20조(중개보수 및 실비의 한도 등)',
        href: 'https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0020&lsiSeq=263573&urlMode=lsScJoRltInfoR',
      },
      {
        title: '공인중개사법 시행규칙 개정문(2026년 8월 28일 시행)',
        href: 'https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1013419503',
      },
    ],
    sourceReview: {
      effectivePeriod: '2026-08-28 시행 공인중개사법 시행규칙',
      checkedAt: '2026-10-11',
    },
    relatedCalculators: [
      {
        title: '전월세 계산기',
        href: '/calculators/rent/',
        description: '보증금과 월세를 연간 기준으로 비교합니다.',
      },
      {
        title: '취득세 계산기',
        href: '/calculators/acquisition/',
        description: '부동산 취득 시 세금 항목을 추정합니다.',
      },
    ],
  },
  'legal-scrivener': {
    examples: [
      {
        title: '소유권 이전 등기 과세표준 4억 원',
        inputs: '계산기에 등록된 기본 보수표를 적용하는 예시입니다.',
        result:
          '현재 계산 로직의 기본 보수는 520,000원이며, 부가가치세와 선택한 실비는 별도로 합산됩니다.',
      },
    ],
    faqs: [
      {
        question: '계산된 금액이 법무사 견적과 같은가요?',
        answer:
          '참고용 예상액입니다. 실제 보수와 실비는 등기 업무의 범위, 사건 난이도, 의뢰 조건과 발생 비용에 따라 달라질 수 있습니다.',
      },
      {
        question: '취득세도 합계에 포함되나요?',
        answer:
          '이 계산기는 등기 관련 보수와 선택한 부대 비용을 추정합니다. 취득세는 취득세 계산기에서 별도로 확인하세요.',
      },
    ],
    cautions: [
      '실제 보수와 공과금은 적용 시점의 요율·수수료표와 사건별 업무 범위를 확인해야 합니다.',
      '세금이나 금융기관 비용처럼 계산기에 포함되지 않은 비용이 있을 수 있습니다.',
    ],
    basis:
      '기본 보수와 공과금은 계산기에 반영된 요율 및 입력한 등기 종류·과세표준을 기준으로 추정합니다. 실제 위임 계약과 최신 기준을 우선 확인하세요.',
    relatedCalculators: [
      {
        title: '취득세 계산기',
        href: '/calculators/acquisition/',
        description: '부동산 취득 조건에 따른 취득세를 추정합니다.',
      },
      {
        title: '중개보수 계산기',
        href: '/calculators/brokerage/',
        description: '부동산 거래 유형별 중개보수를 계산합니다.',
      },
    ],
  },
} satisfies Record<string, CalculatorDetailsContent>;
