export async function fetchGraphQL(query, variables = {}, preview = null) {
  const craftUrl = process.env.CRAFT_URL
  
  if (!craftUrl) {
    throw new Error('CRAFT_URL is not defined in environment variables')
  }

  // Construct the GraphQL endpoint
  const endpoint = `${craftUrl}/api`

  // Modify endpoint if in preview mode
  const url = preview 
    ? `${endpoint}?x-craft-live-preview=${preview}`
    : endpoint

  const headers = {
    'Content-Type': 'application/json',
  }

  // Add preview token if in preview mode
  if (preview) {
    headers['x-craft-token'] = preview
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // Optional: Add cache revalidation
    })

    const json = await res.json()

    // GraphQL can return errors with a 200 status
    if (json.errors) {
      console.error('GraphQL Errors:', json.errors)
      throw new Error(json.errors[0].message)
    }

    if (!res.ok) {
      console.error('Network Error:', res.status, res.statusText)
      throw new Error(`Network error: ${res.status} ${res.statusText}`)
    }

    return json.data
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
