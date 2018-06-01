function parseIntToZero(input) {
  const parsed = parseInt(input, 10);
  if (isNaN(parsed)) {
      return 0;
  }
  return parsed;
}

export function getQueryParams(query) {
  // TODO: Handle negative numbers
  let { first = 50, offset = 0 } = query;
  first = parseIntToZero(first);
  offset = parseIntToZero(offset);
	return { first, offset };
}
