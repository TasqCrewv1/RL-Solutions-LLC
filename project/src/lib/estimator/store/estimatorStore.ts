import { create } from 'zustand';
import type { Answers, AnswerValue, EstimateResult, ProjectSummary, ProcessedFile } from '../types';
import { questionEngine } from '../services/QuestionEngine';
import { calculateEstimate } from '../services/PricingService';
import { generateSummary } from '../services/SummaryEngine';
import { processFiles, removeFile } from '../services/FileUploadService';
import { submitEstimate } from '../services/api';

export type Phase = 'builder' | 'summary' | 'submitted';

interface EstimatorState {
  phase: Phase;
  currentStep: number;
  totalSteps: number;
  answers: Answers;
  files: ProcessedFile[];
  estimate: EstimateResult | null;
  summary: ProjectSummary | null;
  submitting: boolean;
  submitted: boolean;
  error: string | null;
  sendCopyToCustomer: boolean;

  goNext: () => void;
  goBack: () => void;
  setAnswer: (id: string, value: AnswerValue) => void;
  addFiles: (files: File[]) => Promise<void>;
  removeFile: (id: string) => void;
  toggleSendCopy: (on: boolean) => void;
  submit: () => Promise<void>;
  reset: () => void;
  recompute: () => void;
}

const emptyAnswers: Answers = {};

export const useEstimatorStore = create<EstimatorState>((set, get) => ({
  phase: 'builder',
  currentStep: 0,
  totalSteps: questionEngine.getTotalSteps(emptyAnswers),
  answers: {},
  files: [],
  estimate: null,
  summary: null,
  submitting: false,
  submitted: false,
  error: null,
  sendCopyToCustomer: false,

  recompute: () => {
    const { answers } = get();
    const totalSteps = questionEngine.getTotalSteps(answers);
    const estimate = calculateEstimate(answers);
    const summary = generateSummary(answers);
    set({ totalSteps, estimate, summary });
  },

  setAnswer: (id, value) => {
    const answers = { ...get().answers, [id]: value };
    set({ answers, error: null });
    get().recompute();
    // If projectType just changed, visible question count may change — clamp step.
    const total = questionEngine.getTotalSteps(answers);
    if (get().currentStep > total - 1) set({ currentStep: Math.max(0, total - 1) });
  },

  goNext: () => {
    const { answers, currentStep, phase } = get();
    if (phase !== 'builder') return;
    const question = questionEngine.getCurrentQuestion(answers, currentStep);
    if (question) {
      const err = questionEngine.validateAnswer(question, answers[question.id] ?? null);
      if (err) { set({ error: err }); return; }
    }
    const total = questionEngine.getTotalSteps(answers);
    const nextStep = currentStep + 1;
    if (nextStep >= total) {
      set({ phase: 'summary', error: null });
      get().recompute();
      return;
    }
    set({ currentStep: nextStep, error: null });
  },

  goBack: () => {
    const { currentStep, phase } = get();
    if (phase === 'summary') { set({ phase: 'builder', error: null }); return; }
    if (currentStep === 0) return;
    set({ currentStep: currentStep - 1, error: null });
  },

  addFiles: async (incoming) => {
    try {
      const processed = await processFiles(incoming);
      set({ files: [...get().files, ...processed], error: null });
    } catch (e) {
      set({ error: e instanceof Error ? e.message : 'File upload failed' });
    }
  },

  removeFile: (id) => set({ files: removeFile(get().files, id) }),

  toggleSendCopy: (on) => set({ sendCopyToCustomer: on }),

  submit: async () => {
    const { answers, estimate, summary, files, sendCopyToCustomer } = get();
    set({ submitting: true, error: null });
    const projectType = (answers.projectType as string) ?? 'unknown';
    const projectTitle =
      questionEngine.getProjectTypes().find((t) => t.id === projectType)?.label ?? projectType;
    const result = await submitEstimate({
      calculatorType: projectType,
      projectTitle,
      answers,
      estimate,
      summary,
      files,
      customerName: (answers.contactName as string) ?? '',
      customerEmail: (answers.contactEmail as string) ?? '',
      sendCopyToCustomer,
    });
    // Success screen only after a confirmed insert (submitEstimate returns success: false on error).
    if (result.success) {
      set({ submitting: false, submitted: true, phase: 'submitted' });
    } else {
      set({ submitting: false, error: result.error ?? 'Submission failed' });
    }
  },

  reset: () =>
    set({
      phase: 'builder',
      currentStep: 0,
      totalSteps: questionEngine.getTotalSteps(emptyAnswers),
      answers: {},
      files: [],
      estimate: null,
      summary: null,
      submitting: false,
      submitted: false,
      error: null,
      sendCopyToCustomer: false,
    }),
}));
