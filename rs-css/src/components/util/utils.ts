function getRandomStr(length: number): string {
  const chrs: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result: string = '';
  for (let i = 0; i < length; i += 1) {
    const pos = Math.floor(Math.random() * chrs.length);
    result += chrs[pos];
  }
  return result;
}

export default getRandomStr;
