import * as React from 'react';
import { useQuery } from 'react-query';

import { fetchBalance } from './lib/fetcher';
import type { AppToken, BaseToken } from './lib/fetcher';
import { format } from './lib/format';

import { Debug } from './components/Debug';
import { RecursivePositionRenderer } from './components/RecursivePositionRenderer';
import { Toggle } from './components/Toggle';
import { ImgApp } from './components/ImgApp';
import { If } from './components/If';
import { Stack } from './components/Stack';
import { Inline } from './components/Inline';
import { ImgToken } from './components/ImgToken';

function BalanceCard(props: { children: React.ReactNode }) {
  return <div className="ba br3 pa2">{props.children}</div>;
}

function App() {
  const { isLoading, error, data } = useQuery('repoData', async () => {
    const data = await fetchBalance('curve', 'avalanche', ['0xe321bd63cde8ea046b382f82964575f2a5586474']);

    return data;
  });

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (error || !data) {
    return <div>oops</div>;
  }

  return (
    <div>
      {Object.entries(data).map(([address, contents]) => {
        return (
          <div key={address}>
            <div>{address}</div>
            {contents.products.map(product => {
              return (
                <div key={product.label}>
                  <div>{product.label}</div>
                  <Stack gap="md">
                    {product.assets.map((asset, index) => {
                      if (asset.type === 'app-token') {
                        return (
                          <Toggle key={asset.symbol}>
                            {({ isToggled, toggle }) => {
                              return (
                                <BalanceCard>
                                  <div className="flex justify-between items-center">
                                    <Inline gap="lg">
                                      <ImgApp appId={asset.appId} style={{ width: '24px', height: '24px' }} />
                                      <div>
                                        <div className="b f5">{asset.displayProps.label}</div>
                                        <div className="f6">
                                          {format.displayItem(asset.displayProps.secondaryLabel)}
                                        </div>
                                      </div>
                                    </Inline>
                                    <Inline gap="md">
                                      <div>
                                        <div className="b f5">{format.dollar(asset.balanceUSD)}</div>
                                        <div className="f6">{format.number(asset.balance)}</div>
                                      </div>
                                      <button
                                        onClick={() => {
                                          toggle();
                                        }}
                                      >
                                        {isToggled ? 'collapse' : 'expand'}
                                      </button>
                                    </Inline>
                                  </div>
                                  <If condition={isToggled}>
                                    <RecursivePositionRenderer<AppToken | BaseToken>
                                      positions={asset.tokens}
                                      subPositionsLookup={t => {
                                        if (t.type === 'app-token') {
                                          return t.tokens;
                                        }

                                        return [];
                                      }}
                                      typeLookup={t => t.type}
                                      subPositionWrapper={(child, recursiveChild) => {
                                        return (
                                          <div>
                                            {child}
                                            <div className="pa1">{recursiveChild}</div>
                                          </div>
                                        );
                                      }}
                                      positionRenderer={{
                                        'app-token': t => {
                                          if (t.type !== 'app-token') {
                                            return null;
                                          }

                                          return (
                                            <Inline gap="sm">
                                              {t.displayProps.images.map(image => (
                                                <img src={image} style={{ width: '24px', height: '24px' }} />
                                              ))}
                                              <div>
                                                <div>{t.displayProps.label}</div>
                                                <div>{format.displayItem(t.displayProps.secondaryLabel)}</div>
                                              </div>
                                            </Inline>
                                          );
                                        },
                                        'base-token': t => {
                                          if (t.type !== 'base-token') {
                                            return null;
                                          }
                                          return (
                                            <Inline gap="sm">
                                              <ImgToken
                                                address={t.address}
                                                network={t.network}
                                                style={{ width: '24px', height: '24px' }}
                                              />
                                              <div>
                                                <div>{t.symbol}</div>
                                                <div>{format.dollar(t.price)}</div>
                                              </div>
                                            </Inline>
                                          );
                                        },
                                      }}
                                    />
                                  </If>
                                </BalanceCard>
                              );
                            }}
                          </Toggle>
                        );
                      }

                      if (asset.type === 'contract-position') {
                        return (
                          <Toggle key={index}>
                            {({ isToggled, toggle }) => {
                              return (
                                <BalanceCard>
                                  <div className="flex justify-between items-center">
                                    <Inline gap="lg">
                                      <ImgApp appId={asset.appId} style={{ width: '24px', height: '24px' }} />
                                      <div className="b f5">
                                        {asset.displayProps.label}
                                        <div className="f6">
                                          {format.displayItem(asset.displayProps.secondaryLabel)}
                                        </div>
                                      </div>
                                    </Inline>
                                    <Inline gap="md">
                                      <div>
                                        <div className="b f5">{format.dollar(asset.balanceUSD)}</div>
                                      </div>
                                      <button
                                        onClick={() => {
                                          toggle();
                                        }}
                                      >
                                        {isToggled ? 'collapse' : 'expand'}
                                      </button>
                                    </Inline>
                                  </div>
                                  <If condition={isToggled}>stuff</If>
                                </BalanceCard>
                              );
                            }}
                          </Toggle>
                        );
                      }

                      return <div key={index}>unknown asset type</div>;
                    })}
                  </Stack>
                </div>
              );
            })}
          </div>
        );
      })}
      <Debug data={data} />
    </div>
  );
}

export default App;
