interface ToolDefinitionContent {
  readonly title: string;
  readonly description: string;
  readonly pageDescription: string;
}

export const tools = [
  {
    kind: 'lotto',
    title: '로또 번호 생성기',
    description: '1~45 사이 6개 번호를 무작위로 생성',
    pageDescription:
      '무작위 번호를 편하게 생성하고 여러 게임을 한 번에 확인할 수 있습니다.',
  },
  {
    kind: 'random',
    title: '랜덤 숫자 생성기',
    description: '원하는 범위의 랜덤 숫자 생성',
    pageDescription: '최솟값과 최댓값을 지정해 랜덤 숫자를 생성합니다.',
  },
  {
    kind: 'picker',
    title: '랜덤 추첨기',
    description: '목록에서 무작위 항목 추첨',
    pageDescription:
      '이름, 항목, 선택지를 한 줄씩 입력하면 무작위로 하나를 선택합니다.',
  },
  {
    kind: 'password',
    title: '비밀번호 생성기',
    description: '조건에 맞는 무작위 비밀번호 생성',
    pageDescription:
      '대문자, 소문자, 숫자, 기호를 조합해 무작위 문자열을 생성합니다.',
  },
  {
    kind: 'date',
    title: '날짜 계산기',
    description: '두 날짜 사이의 기간 계산',
    pageDescription:
      '시작일과 종료일을 입력해 날짜 차이와 포함 일수를 확인합니다.',
  },
  {
    kind: 'dday',
    title: 'D-Day 계산기',
    description: '목표 날짜까지 남은 기간 계산',
    pageDescription:
      '시험, 여행, 기념일 등 특정 날짜까지의 D-Day를 확인합니다.',
  },
  {
    kind: 'age',
    title: '나이 계산기',
    description: '생년월일 기준 만 나이 계산',
    pageDescription:
      '생년월일을 입력하면 기준일의 만 나이와 경과 기간을 확인합니다.',
  },
  {
    kind: 'unit',
    title: '단위 변환기',
    description: '길이·무게·온도·넓이·데이터 변환',
    pageDescription: '자주 사용하는 생활 단위를 빠르게 서로 변환합니다.',
  },
  {
    kind: 'percent',
    title: '퍼센트 계산기',
    description: '비율·증감률·할인율·증가율 계산',
    pageDescription:
      '일상에서 자주 사용하는 퍼센트 계산을 한 화면에서 처리합니다.',
  },
] as const satisfies readonly (ToolDefinitionContent & {
  readonly kind: string;
})[];

export type ToolDefinition = (typeof tools)[number];
export type ToolKind = (typeof tools)[number]['kind'];
