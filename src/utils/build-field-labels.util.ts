export const buildFieldLabels = <T extends string[]>(label: string, fields: T): string[] =>
  fields.reduce((accumulator: string[], field: string) => [...accumulator, `${label}.${field}`], []);
