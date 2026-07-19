export type InputType =
  | 'text'
  | 'number'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'file'
  | 'boolean'
  | 'date'
  | 'dimensions'
  | 'textarea';

export interface DimensionsValue {
  lengthFt: number;
  lengthIn: number;
  widthFt: number;
  widthIn: number;
}

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  accept?: string[];
  maxSizeMb?: number;
}

export interface Question {
  id: string;
  step: number;
  title: string;
  description?: string;
  inputType: InputType;
  placeholder?: string;
  unit?: string;
  options?: QuestionOption[];
  validation?: ValidationRule;
  bucket?: string;
  dependsOn?: string;
  condition?: (answers: Answers) => boolean;
}

export interface ProjectType {
  id: string;
  label: string;
  description: string;
  icon: string;
  calculatorId: string;
}

export interface QuestionDatabase {
  projectTypes: ProjectType[];
  questions: Question[];
}

export type AnswerValue = string | number | boolean | string[] | ProcessedFile[] | DimensionsValue;
export type Answers = Record<string, AnswerValue>;

export interface ProcessedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  previewUrl?: string;
  base64?: string;
  isImage: boolean;
}

export interface EstimateResult {
  costRange: { low: number; high: number; mid: number };
  breakdown: { labor: number; materials: number; other: number };
  labor: { low: number; high: number };
  materials: { low: number; high: number };
  other: { low: number; high: number };
  timeline: { lowWeeks: number; highWeeks: number; lowDays: number; highDays: number };
  complexity: { level: 'simple' | 'moderate' | 'complex' | 'very-complex'; score: number };
  confidence: { level: 'low' | 'medium' | 'high'; rangePercent: number; description: string };
  unknowns: string[];
  assumptions: string[];
  calculationBasis: string;
}

export interface ProjectSummary {
  summary: string;
  nextSteps: string[];
  concerns: string[];
  missingInfo: string[];
}

export interface SubmissionPayload {
  calculatorType: string;
  projectTitle: string;
  answers: Answers;
  estimate: EstimateResult | null;
  summary: ProjectSummary | null;
  files: ProcessedFile[];
  customerName: string;
  customerEmail: string;
  sendCopyToCustomer: boolean;
}

export interface SubmissionResult {
  success: boolean;
  error?: string;
}
