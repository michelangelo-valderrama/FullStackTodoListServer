export class Task {
  id = crypto.randomUUID();
  content: string;
  done: boolean = false;
}

export type Id = `${string}-${string}-${string}-${string}-${string}`;
