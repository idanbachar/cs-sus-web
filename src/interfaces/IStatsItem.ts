export interface IStatsItem {
  info: {
    title: string;
    value: number;
  }[];
  isSus?: boolean;
  cssStyles?: React.CSSProperties;
  textAfterValue?: string;
}
