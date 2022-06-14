import * as React from 'react';

export function Toggle(props: {
  children: (childProps: {
    isToggled: boolean;
    toggleOn: () => void;
    toggleOff: () => void;
    toggle: () => void;
  }) => React.ReactNode;
  initialState?: boolean;
}) {
  const [isToggled, setToggled] = React.useState(props.initialState || false);
  return (
    <>
      {props.children({
        isToggled,
        toggleOn: () => setToggled(true),
        toggleOff: () => setToggled(false),
        toggle: () => setToggled(prevState => !prevState),
      })}
    </>
  );
}
