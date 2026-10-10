import { tools } from '../../data/tools';

export type ToolKind = (typeof tools)[number]['kind'];

export function isToolKind(value: string | undefined): value is ToolKind {
  return value !== undefined && tools.some((tool) => tool.kind === value);
}
