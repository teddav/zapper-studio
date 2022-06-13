function Debug({ data }: { data: unknown }) {
  return (
    <details open>
      <summary>Debug data</summary>
      <pre>{JSON.stringify(data, null, 4)}</pre>;
    </details>
  );
}

export { Debug };
