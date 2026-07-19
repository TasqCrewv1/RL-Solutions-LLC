import type { Answers, Question, QuestionDatabase } from '../types';
import { questionDatabase } from '../config/questions';

export class QuestionEngine {
  constructor(private db: QuestionDatabase = questionDatabase) {}

  getProjectTypes() {
    return this.db.projectTypes;
  }

  getVisibleQuestions(answers: Answers): Question[] {
    const projectType = answers.projectType;
    return this.db.questions.filter((q) => {
      if (q.id === 'projectType') return true;
      if (projectType === undefined) return false;
      if (q.condition && !q.condition(answers)) return false;
      return true;
    });
  }

  getCurrentQuestion(answers: Answers, currentStep: number): Question | null {
    const visible = this.getVisibleQuestions(answers);
    return visible[currentStep] ?? null;
  }

  getTotalSteps(answers: Answers): number {
    return this.getVisibleQuestions(answers).length;
  }

  isLastStep(answers: Answers, currentStep: number): boolean {
    return currentStep >= this.getTotalSteps(answers) - 1;
  }

  isStepApplicable(question: Question, answers: Answers): boolean {
    if (question.id === 'projectType') return true;
    if (answers.projectType === undefined) return false;
    if (question.condition && !question.condition(answers)) return false;
    return true;
  }

  validateAnswer(question: Question, value: unknown): string | null {
    const v = question.validation;
    if (!v) return null;
    if (v.required) {
      if (value === null || value === undefined || value === '') return 'This field is required.';
      if (Array.isArray(value) && value.length === 0) return 'Please select at least one option.';
      if (typeof value === 'object' && !Array.isArray(value)) {
        const d = value as { lengthFt?: number; lengthIn?: number; widthFt?: number; widthIn?: number };
        if ((d.lengthFt ?? 0) === 0 && (d.lengthIn ?? 0) === 0) return 'Please enter the length.';
        if ((d.widthFt ?? 0) === 0 && (d.widthIn ?? 0) === 0) return 'Please enter the width.';
      }
    }
    if (typeof value === 'number') {
      if (v.min !== undefined && value < v.min) return `Must be at least ${v.min}.`;
      if (v.max !== undefined && value > v.max) return `Must be at most ${v.max}.`;
    }
    if (typeof value === 'string' && v.maxLength !== undefined && value.length > v.maxLength) {
      return `Must be ${v.maxLength} characters or fewer.`;
    }
    return null;
  }
}

export const questionEngine = new QuestionEngine();
