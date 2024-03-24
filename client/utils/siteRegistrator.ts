import { addCronJob, postData } from '@/utils/fetchData'
import { urlValidate } from './validation'

const TOTAL_PROGRESS = 100

export const siteRegistrate = async(selectedDevice: string[], name: string, url: string, schedule: string, userId: number, progressCallback: (progeress: number) => void) => {
  let currentProgress = 0

  for (const device of selectedDevice) {
    const siteInfo = {
      name,
      url: urlValidate(url),
      schedule,
      device,
      user_id: userId
    }

    const historyAction = {
      action: '登録した.',
      user_id: siteInfo.user_id,
      site_name: siteInfo.name,
      site_url: siteInfo.url,
      device: siteInfo.device
    }

    currentProgress++

    await postData('user_history', historyAction)
    await postData('psi_site_list', siteInfo)
    await addCronJob('scheduler')
  }

  progressCallback(TOTAL_PROGRESS)
}