import { AdventEvent } from "advent-event";

await Bun.build({
  entrypoints: ['./index.tsx'],
  outdir: './build',
});