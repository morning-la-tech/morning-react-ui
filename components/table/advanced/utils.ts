import { SortOrder } from '../enum';

// Utility function to get the next sort order
export function getNextOrders<T extends string>(
  prev: Record<T, SortOrder | null>,
  field: T,
): Record<T, SortOrder | null> {
  const nextDir =
    prev[field] === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;
  const newOrders: Record<T, SortOrder | null> = {} as Record<
    T,
    SortOrder | null
  >;
  for (const key in prev) {
    newOrders[key as T] = key === field ? nextDir : null;
  }
  return newOrders;
}
