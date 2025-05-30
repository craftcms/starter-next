const DEFAULT_OPTIONS = {
  private: false,
  preview: false,
  token: null,
  cache: 'force-cache',
  next: { revalidate: 3600 }
}

export async function fetchGraphQL(query, variables = {}, options = DEFAULT_OPTIONS) {
  try {
    const apiBaseUrl = process.env.CRAFT_URL?.replace(/\/$/, '')
    if (!apiBaseUrl) throw new Error('CRAFT_URL environment variable is not set')

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    if (options.private || options.preview) {
      const token = options.token || process.env.GRAPHQL_TOKEN
      if (!token) throw new Error('A GraphQL token is required for private/preview queries')
      headers['Authorization'] = `Bearer ${token}`
      if (options.preview && options.token) headers['X-Craft-Token'] = options.token
    }

    const response = await fetch(`${apiBaseUrl}/api`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      credentials: 'include',
      cache: options.cache,
      next: options.next
    })

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const result = await response.json()
    if (result.errors) {
      console.error('GraphQL Errors:', result.errors)
      return null
    }

    return result.data
  } catch (error) {
    console.error('GraphQL Fetch Error:', {
      message: error.message,
      query,
      variables
    })
    
    if (process.env.NODE_ENV === 'development') throw error
    return null
  }
}
