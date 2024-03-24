export const getDataAll = async(api: string, user_id: number) => {
  console.log(`${process.env.NEXT_PUBLIC_NEST_URL}${api}`)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}${api}/`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    // return data
    const filteredData = data.filter((item: any) => item.user_id === user_id)
    return filteredData
  } catch (error) {
    console.log(error)
  }
}

export const getData = async(api: string, id: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}${api}/${id}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const postData = async (api: string, args: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}${api}`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...args})
    })

    if (!response.ok) {
      // レスポンスがエラーを示す場合は例外を投げる
      throw new Error(`APIリクエストが失敗しました。ステータスコード: ${response.status}`)
    }

    console.log(args)
    return response
  } catch (error) {
    // 例外が発生した場合はエラーを投げる
    throw new Error('APIリクエストでエラーが発生しました.')
  }
}


export const patchData = async (api: string, id: number, args: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}${api}/${id}`, {
      method: 'PATCH',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...args})
    })
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const deleteData = async (api: string, id: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}${api}/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const addCronJob = async (api: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}${api}`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    return response
  } catch(error) {
    throw new Error('APIリクエストでエラーが発生しました.')
  }
}