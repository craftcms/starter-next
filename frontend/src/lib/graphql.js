export async function fetchGraphQL(query, variables = {}, options = {}) {
  const apiUrl = process.env.NEXT_PUBLIC_CRAFT_API_URL
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  // Add auth header if private flag is true
  if (options.private) {
    const token = process.env.NEXT_PUBLIC_CRAFT_API_TOKEN
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables
    }),
    credentials: 'include',
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
  }

  const result = await response.json()

  if (result.errors) {
    throw new Error(result.errors[0].message)
  }

  if (!result.data) {
    throw new Error('No data returned from GraphQL')
  }

  return result.data
}