const formatEntries = (entries = []) => {
  if (Array.isArray(entries)) {
    return entries.map((entry: any) => ({
      ...entry.attributes,
      key: entry.id,
    }));
  } else if (typeof entries === 'object' && typeof entries !== null) {
    return (entries as any).attributes;
  }
};

export default formatEntries;
