export const replaceUnderscoreWithSpace = (str: string): string => {
  if (!str) return ""
  return str.replace(/_/g, ' ')
}
