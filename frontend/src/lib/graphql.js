export async function fetchGraphQL(query, variables = {}, options = {}) {
  const apiUrl = process.env.NEXT_PUBLIC_CRAFT_API_URL
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  if (options.private) {
    const token = process.env.NEXT_PUBLIC_CRAFT_API_TOKEN
    if (!token) {
      throw new Error('No API token found for private query')
    }
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const json = await response.json()

  if (json.errors) {
    throw new Error(json.errors[0].message)
  }

  if (!json.data) {
    throw new Error('No data returned from GraphQL')
  }

  return json.data
}
