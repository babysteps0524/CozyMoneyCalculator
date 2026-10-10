export type {
  CalculatorDetailsContent,
  CalculatorGuidance,
} from './guidance/types';
import {
  calculatorGuidance as finance,
  supplementalCalculatorDetails as financeDetails,
} from './guidance/finance';
import {
  calculatorGuidance as employment,
  supplementalCalculatorDetails as employmentDetails,
} from './guidance/employment';
import {
  calculatorGuidance as tax,
  supplementalCalculatorDetails as taxDetails,
} from './guidance/tax';
import {
  calculatorGuidance as realEstate,
  supplementalCalculatorDetails as realEstateDetails,
} from './guidance/realEstate';
import {
  calculatorGuidance as general,
  supplementalCalculatorDetails as generalDetails,
} from './guidance/general';

export const calculatorGuidance = {
  ...finance,
  ...employment,
  ...tax,
  ...realEstate,
  ...general,
};
export const supplementalCalculatorDetails = {
  ...financeDetails,
  ...employmentDetails,
  ...taxDetails,
  ...realEstateDetails,
  ...generalDetails,
};
