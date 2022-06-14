import * as React from 'react';

import { createVariantMap } from '../lib/createVariantMap';

type GapVariants = 'sm' | 'md' | 'lg';

const gapVariants = createVariantMap<GapVariants, string>(
  [
    ['sm', '4px'],
    ['md', '8px'],
    ['lg', '12px'],
  ],
  '0px',
);
export function Stack(props: { gap: GapVariants; children: React.ReactNode }) {
  const gap = gapVariants(props.gap);

  return (
    <div className="flex flex-column" style={{ gap }}>
      {props.children}
    </div>
  );
}
