export const urlValidate = (url: string) => {
  if (!url) {
    return 'URLを入力してください';
  }

  let finalUrl
  try {
    finalUrl = new URL(url)
  } catch (error) {
    finalUrl = new URL('https://' + url)
  }

  if (finalUrl.pathname) {
    return finalUrl.origin + finalUrl.pathname
  }

  return finalUrl.origin
}

export const inputValidate = (value: string) => {
  if(!value) {
    return 'サイト名を入力してください'
  }

  return ''
}

export const checkboxValidate = (value: string) => {
  if(!value) {
    return 'チェックボックスは少なくとも1つを選択してください'
  }

  return ''
}

export const textareaValidate = (value: string[]) => {
  if (!value || value.length === 0) {
    return 'サイト名とURLを入力してください'
  }

  for (const forcedLine of value) {
    const [name, url] = forcedLine.split(/\s+/)
    if (!name || !url) {
      return 'サイト名とURLはスペースで区切って入力してください'
    }
  }

  return ''
}