export const getDateFromTimeStamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000).toLocaleDateString();
  const time = new Date(timestamp * 1000).toLocaleTimeString();

  const prettifyTime = (): string => {
    const splitted = time.split(':');
    return `${splitted[0]}:${splitted[1]}`;
  }
  return `${date} ${prettifyTime()}`;
}