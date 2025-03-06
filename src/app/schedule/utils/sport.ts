export enum SportEnum {
  athletics = 'athletics',
  football = 'football',
  pingpong = 'pingpong',
  badminton = 'badminton',
  basketball = 'basketball',
  tradition = 'tradition'
}

export const sportMap: Record<SportEnum, string> = {
  [SportEnum.athletics]: 'กรีฑา',
  [SportEnum.badminton]: 'แบดมินตัน',
  [SportEnum.pingpong]: 'ปิงปอง',
  [SportEnum.basketball]: 'บาสเกตบอล',
  [SportEnum.tradition]: 'กีฬาพื้นบ้าน',
  [SportEnum.football]: 'ฟุตบอล'
}
