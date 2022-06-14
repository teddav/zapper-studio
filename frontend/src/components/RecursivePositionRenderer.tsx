import * as React from 'react';

type GenericRenderer<T = unknown> = (t: T, index: number, arr: T[]) => React.ReactNode;
type RecursivePositionRendererProps<PositionShapes> = {
  positions: PositionShapes[];
  subPositionsLookup: (sub: PositionShapes) => PositionShapes[];
  typeLookup: (position: PositionShapes) => string;
  positionRenderer: Record<string, GenericRenderer<PositionShapes>>;
  subPositionWrapper?: (children: React.ReactNode, recursiveChildren: React.ReactNode) => React.ReactNode;
};
export function RecursivePositionRenderer<PositionShapes = unknown>({
  positions,
  positionRenderer,
  subPositionsLookup,
  typeLookup,
  subPositionWrapper,
}: RecursivePositionRendererProps<PositionShapes>) {
  return (
    <>
      {positions.map((p: PositionShapes, index, arr) => {
        const inferType = typeLookup(p);
        const renderFn = positionRenderer[inferType];

        const key = `${inferType}_${index}`;

        if (!renderFn) {
          return null;
        }

        const subPositions = subPositionsLookup(p);

        if (subPositions.length && subPositionWrapper) {
          return (
            <React.Fragment key={key}>
              {subPositionWrapper(
                renderFn(p, index, arr),
                <RecursivePositionRenderer
                  positions={subPositions}
                  positionRenderer={positionRenderer}
                  subPositionsLookup={subPositionsLookup}
                  typeLookup={typeLookup}
                />,
              )}
            </React.Fragment>
          );
        } else if (subPositions.length) {
          return (
            <React.Fragment key={key}>
              {renderFn(p, index, arr)}
              <RecursivePositionRenderer
                positions={subPositions}
                positionRenderer={positionRenderer}
                subPositionsLookup={subPositionsLookup}
                typeLookup={typeLookup}
              />
            </React.Fragment>
          );
        }

        return <React.Fragment key={key}>{renderFn(p, index, arr)}</React.Fragment>;
      })}
    </>
  );
}
