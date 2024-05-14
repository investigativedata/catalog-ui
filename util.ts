import type { IDataset, } from "@investigativedata/ftmq";

export const filterOptions = [
  {
    label: 'Type of data',
    field: 'type',
    type: "datatype",
    values: [
      { value: 'documents', label: 'Documents' },
      { value: 'structured', label: 'Structured' },
      { value: 'mixed', label: 'Mixed' }
    ]
  },
  {
    label: 'Frequency',
    field: 'coverage.frequency',
    values: [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
      { value: 'yearly', label: 'Yearly' },
      { value: 'unknown', label: 'Unknown' },
    ]
  },
  {
    label: 'Tags',
    field: 'tags',
    type: 'tag',
    values: [
      { value: 'corruption', label: 'Corruption' },
      { value: 'finance', label: 'Finance' },
      { value: 'lobbyism', label: 'Lobbyism' },
      { value: 'sanctions', label: 'Sanctions' },
      { value: 'another_tag', label: 'Another tag' },
    ]
  },
  {
    label: 'Country / Region',
    field: 'country',
    type: "country",
    values: [
      { value: 'eu', label: 'European Union' },
      { value: "de", label: "Germany" },
      { value: "it", label: "Italy" },
      { value: "fr", label: "France" },
      { value: "es", label: "Spain" },
      { value: "pl", label: "Poland" },
      { value: "ro", label: "Romania" },
      { value: "cz", label: "Czechia" },
      { value: "at", label: "Austria" },
      { value: "hu", label: "Hungary" },
      { value: "se", label: "Sweden" },
      { value: "pt", label: "Portugal" },
      { value: "nl", label: "Netherlands" },
      { value: "be", label: "Belgium" },
      { value: "bg", label: "Bulgaria" },
      { value: "dk", label: "Denmark" },
      { value: "sk", label: "Slovakia" },
      { value: "hr", label: "Croatia" },
      { value: "fi", label: "Finland" },
      { value: "ie", label: "Ireland" },
      { value: "lv", label: "Latvia" },
      { value: "ee", label: "Estonia" },
      { value: "lt", label: "Lithuania" },
      { value: "si", label: "Slovenia" },
      { value: "cy", label: "Cyprus" },
      { value: "gr", label: "Greece" },
      { value: "lu", label: "Luxembourg" },
      { value: "mt", label: "Malta" }
    ]
  }
]

export function getFilterValueCount(items: IDataset[], field: string, value: string): any {
  // console.log(items, field, value);

  return 5;
}