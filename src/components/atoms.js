// src/atoms.js
import { atom } from 'recoil';

export const selectedNamesState = atom({
  key: 'selectedNamesState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const pdfUrlsState = atom({
  key: 'pdfUrlsState',
  default: [],
});

export const currentPdfState = atom({
  key: 'currentPdfState',
  default: null,
});


export const isLoadingState = atom({
  key: 'isLoadingState', // unique ID (with respect to other atoms/selectors)
  default: false, // default loading state
});

export const resultsState = atom({
  key: 'resultsState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const fileNamesState = atom({
  key: 'fileNamesState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});




export const ocrAtom = atom({
  key: 'ocrState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const answersState = atom({
  key: 'answersState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const answerHeadingsState = atom({
  key: 'answerHeadingsState',
  default: [],
});

export const queriesState = atom({
  key: 'queriesState',
  default: [],
});

export const scoresState = atom({
  key: 'scoresState',
  default: [],
});