
export const getDataAll = async(api: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}${api}/`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const postData = async (api: string, args: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}${api}`, {
      method: 'POST',
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

export const patchData = async (api: string, id: number, args: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}${api}/${id}`, {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}${api}/${id}`, {
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