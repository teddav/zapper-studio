import * as React from 'react';

import { getAppImg } from '../lib/get-images';

export function ImgApp(
  props: Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'src'> & {
    appId: string;
  },
) {
  const { appId, ...rest } = props;
  return <img src={getAppImg(props.appId)} {...rest} />;
}
