import type { InterpretationTradition } from '@stassist/shared';

/** Одна строка будущего `interpretation_chunks` (см. packages/db/src/schema/interpretation-chunks.ts). */
export interface ChunkDraft {
  key: string;
  tradition: InterpretationTradition;
  text: string;
  quality: 'draft';
  version: 1;
}

export interface CompatPairDraft {
  /** Русские транслитерированные слаги (см. compat_pages.sign_a/sign_b, packages/shared zodiac.ts). */
  signA: string;
  signB: string;
  bodyMd: string;
}

export interface CorpusResult {
  chunks: ChunkDraft[];
  compatPairs: CompatPairDraft[];
}
