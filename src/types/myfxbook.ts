export interface MyfxbookLoginResponse {
  error: boolean;
  message: string;
  session?: string;
}

export interface MyfxbookAccount {
  id: string;
  name: string;
  description: string;
  gain: number;
  absoluteGain: number;
  daily: number;
  monthly: number;
  withdrawals: number;
  deposits: number;
  interest: number;
  profit: number;
  balance: number;
  drawdown: number;
  equity: number;
  equityPercent: number;
}

export interface MyfxbookAccountsResponse {
  error: boolean;
  message: string;
  accounts?: MyfxbookAccount[];
}

export interface MyfxbookTradeData {
  gain: number;
  drawdown: number;
  trades: number;
  pips: number;
  winningTrades: number;
  losingTrades: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
  winRate: number;
  sharpeRatio: number;
}

export interface MyfxbookDataResponse {
  error: boolean;
  message: string;
  data?: MyfxbookTradeData;
}
