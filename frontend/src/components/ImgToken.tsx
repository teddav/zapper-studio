import * as React from 'react';

import { getTokenImg } from '../lib/get-images';

export function ImgToken(
  props: Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'src'> & {
    address: string;
    network: string;
  },
) {
  const { address, network, ...rest } = props;
  return <img src={getTokenImg(address, network)} {...rest} />;
}
