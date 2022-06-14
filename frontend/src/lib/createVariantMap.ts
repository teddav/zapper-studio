export function createVariantMap<K = unknown, V = unknown>(tuples: [key: K, value: V][], defaultValue: string) {
  const variantMap = new Map<K, V>();
  for (const tuple of tuples) {
    const [key, value] = tuple;
    variantMap.set(key, value);
  }

  return (key: string) => variantMap.get(key as any) || defaultValue;
}
