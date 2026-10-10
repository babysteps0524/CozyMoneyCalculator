export interface CalculatorExample {
  title: string;
  inputs: string;
  result: string;
}

export interface CalculatorFaq {
  question: string;
  answer: string;
}

export interface RelatedCalculator {
  title: string;
  href: string;
  description: string;
}

export interface CalculatorSource {
  title: string;
  href: string;
}

export interface CalculatorSourceReview {
  effectivePeriod: string;
  checkedAt: string;
}

export interface CalculatorDetailsContent {
  intro?: string;
  steps?: string[];
  formula?: string;
  examples?: CalculatorExample[];
  cautions?: string[];
  faqs?: CalculatorFaq[];
  basis?: string;
  sources?: CalculatorSource[];
  sourceReview?: CalculatorSourceReview;
  relatedCalculators?: RelatedCalculator[];
}

export interface CalculatorGuidance extends CalculatorDetailsContent {
  intro: string;
  steps: string[];
  formula: string;
  basis: string;
  cautions: string[];
}
