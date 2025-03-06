const mapUniNameToLogo = (name: string): string => {
  const logoMapping: { [key: string]: string } = {
    KMUTT: '/images/KMUTT_logo.png',
    KMITL: '/images/KMITL_logo.png',
    KMUTNB: '/images/KMUTNB_logo.png',
    KMUTNB_PR: '/images/KMUTNB_PR_logo.png'
  }

  return logoMapping[name] || ""
}

export default mapUniNameToLogo
