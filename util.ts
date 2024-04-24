import type { IDataset, } from "@investigativedata/ftmq";

export const filterOptions = {
  'coverage.frequency': [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'unknown', label: 'Unknown' },
  ]
}

export function getFilterValueCount(items: IDataset[], field: string, value: string): any {
  // console.log(items, field, value);

  return 5;
}