const filterOptions = [
  {
    label: 'Type of data',
    field: 'contentType',
    type: "datatype",
    options: ['documents', 'structured', 'mixed']
  },
  {
    label: 'Frequency',
    field: 'frequency',
    options: ['daily', 'weekly', 'monthly','yearly', 'unknown']
  },
  {
    label: 'Tags',
    field: 'tags',
    type: 'tag',
    // options: [
    //   { value: 'corruption', label: 'Corruption' },
    //   { value: 'finance', label: 'Finance' },
    //   { value: 'lobbyism', label: 'Lobbyism' },
    //   { value: 'sanctions', label: 'Sanctions' },
    //   { value: 'another_tag', label: 'Another tag' },
    // ]
  },
  {
    label: 'Country / Region',
    field: 'countries',
    type: "country",
    // values: [
    //   { value: 'eu', label: 'European Union' },
    //   { value: "de", label: "Germany" },
    //   { value: "it", label: "Italy" },
    //   { value: "fr", label: "France" },
    //   { value: "es", label: "Spain" },
    //   { value: "pl", label: "Poland" },
    //   { value: "ro", label: "Romania" },
    //   { value: "cz", label: "Czechia" },
    //   { value: "at", label: "Austria" },
    //   { value: "hu", label: "Hungary" },
    //   { value: "se", label: "Sweden" },
    //   { value: "pt", label: "Portugal" },
    //   { value: "nl", label: "Netherlands" },
    //   { value: "be", label: "Belgium" },
    //   { value: "bg", label: "Bulgaria" },
    //   { value: "dk", label: "Denmark" },
    //   { value: "sk", label: "Slovakia" },
    //   { value: "hr", label: "Croatia" },
    //   { value: "fi", label: "Finland" },
    //   { value: "ie", label: "Ireland" },
    //   { value: "lv", label: "Latvia" },
    //   { value: "ee", label: "Estonia" },
    //   { value: "lt", label: "Lithuania" },
    //   { value: "si", label: "Slovenia" },
    //   { value: "cy", label: "Cyprus" },
    //   { value: "gr", label: "Greece" },
    //   { value: "lu", label: "Luxembourg" },
    //   { value: "mt", label: "Malta" }
    // ]
  }
]

export default filterOptions;