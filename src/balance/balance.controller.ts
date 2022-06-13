import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Inject, Param, Query, Render } from '@nestjs/common';

import { BalanceService } from './balance.service';
import { GetBalancesParams } from './dto/get-balances-params.dto';
import { GetBalancesQuery } from './dto/get-balances-query.dto';

@Controller()
export class BalanceController {
  constructor(@Inject(BalanceService) private readonly balanceService: BalanceService) {}

  @ApiOperation({
    summary: 'Balances',
    description: 'Gets the balances for a set of addresses for a single network.',
  })
  @ApiTags('Balances')
  @Get(`/apps/:appId/balances`)
  getAppBalances(@Param() params: GetBalancesParams, @Query() query: GetBalancesQuery) {
    return this.balanceService.getBalances({ ...params, ...query });
  }

  @Get(`/apps/:appId/balances.html`)
  @Render('balance-preact')
  async renderAppBalances(@Param('appId') appId: string, @Query() query: GetBalancesQuery) {
    const data = await this.balanceService.getBalances({ ...query, appId });

    const resp = Object.entries(data).map(([address, balance]) => {
      return {
        address,
        products: balance.products,
        meta: balance.meta,
      };
    });

    return { data: resp };
  }
}
