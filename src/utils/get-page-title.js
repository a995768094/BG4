import defaultSettings from '@/settings'

const title = defaultSettings.title || '��������ԤԼƽ̨'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
