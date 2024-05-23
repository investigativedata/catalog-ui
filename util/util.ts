export const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

export function capitalizeFirstLetter(str) {
  if (!str) return;

  const castStr = str.toString()

  return castStr.charAt(0).toUpperCase() + castStr.slice(1);
}

export function applyActiveFilters(items, filters) {
  let filteredItems = items

  if (filters.contentType.length > 0) {
    filteredItems = filteredItems.filter(({ contentType }) => filters.contentType.includes(contentType))
  }
  if (filters.frequency.length > 0) {
    filteredItems = filteredItems.filter(({ frequency }) => filters.frequency.includes(frequency))
  }

  if (filters.tags.length > 0) {
    filteredItems = filteredItems.filter(({ tags }) => filters.tags.some(t => tags.includes(t)))
  }

  if (filters.countries.length > 0) {
    filteredItems = filteredItems.filter(({ countries }) => filters.countries.some(c => countries.find(({ code }) => code === c)))
  }

  return filteredItems
}