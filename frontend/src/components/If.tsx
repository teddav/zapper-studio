import * as React from 'react';

export function If(props: { condition: any; children: React.ReactNode }) {
  if (!props.condition) {
    return null;
  }

  return <>{props.children}</>;
}
