export const generateUserAgent = (): string => {
  const osList = [
    'Windows NT 10.0; Win64; x64'
    //'X11; Ubuntu; Linux x86_64',
  ]

  const browserList = [
    'Chrome/91.0.4472.124',
    'Firefox/89.0'
    //'Safari/537.36',
    //'Edge/91.0.864.59',
    //'Opera/76.0.4017.177'
  ]
  const randomOS = osList[Math.floor(Math.random() * osList.length)]
  const randomBrowser = browserList[Math.floor(Math.random() * browserList.length)]
  return `Mozilla/5.0 (${randomOS}) AppleWebKit/537.36 (KHTML, like Gecko) ${randomBrowser} Safari/537.36`
}
