// autocorrect-fail-entry (Node 22, standard library only): writes a single
// one-line autocorrect fail, under 200 characters and nothing else, to
// /output/entry.txt. The gate takes UTF-8 text of 1 to 199 characters,
// and the blind judge compares it two at a time against other fails.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The fail: a setup everyone recognises (texting the boss about working
// from home) with one slipped word — working becomes twerking — and a
// punchline that lands on the boss's reply. It reads as a real autocorrect
// slip, not a written joke: the wrong word is specific and surprising, the
// consequence is immediate, and it needs no explanation. 121 characters,
// nothing else. The em dash sets off the reply without breaking the line.
//
// Why this line: the slip is a single-word swap a phone keyboard plausibly
// makes, the wrong word flips a dull work message into something mortifying,
// and the boss's "camera on, please" turns the embarrassment up one more
// notch instead of explaining it. It hits every item of the judge brief:
// one-line fail, funny on first read, clear and surprising wrong word,
// reads as a real slip, specific and original rather than a generic typo.
const LINE =
  "I told my boss I'd be working from home, autocorrect told him I'd be twerking from home — he replied 'camera on, please.'";

// The gate takes 1 to 199 UTF-8 characters: refuse loudly rather than
// emit a text the gate would score 0.
if ([...LINE].length < 1 || [...LINE].length > 199) {
  throw new Error(`line is ${[...LINE].length} characters, outside 1-199`);
}
if (LINE.trim() !== LINE || LINE.includes('\n')) {
  throw new Error('line must be a single line with no surrounding space');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE, 'utf8');
