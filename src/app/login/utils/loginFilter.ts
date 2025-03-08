function checkSQLInjectionPattern(username: string, password: string): boolean {
  const sqlInjectionPattern = /['"%;\-]/g 
  return !sqlInjectionPattern.test(username) && !sqlInjectionPattern.test(password)
}

export function loginFilter(username: string, password: string) {
  return checkSQLInjectionPattern(username, password)
}