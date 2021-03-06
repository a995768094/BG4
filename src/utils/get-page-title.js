import defaultSettings from '@/settings'

const title = defaultSettings.title || '生活助手预约平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
