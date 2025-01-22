const DEFAULT_OPTIONS = {
  private: false,
  preview: false,
  token: null
}

export async function fetchGraphQL(query, variables = {}, options = {}) {
  try {
    const apiBaseUrl = process.env.CRAFT_URL?.replace(/\/$/, '')
    const apiBasePath = '/api'

    if (!apiBaseUrl) {
      throw new Error('CRAFT_URL environment variable is not set')
    }

    const apiUrl = `${apiBaseUrl}${apiBasePath}`

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    // Handle authentication
    if (options.private || options.preview) {
      const token = options.token || process.env.GRAPHQL_TOKEN
      if (!token) {
        throw new Error('A GraphQL token is required for private/preview queries')
      }
      headers['Authorization'] = `Bearer ${token}`
    }

    // Add preview token if available
    if (options.preview && options.token) {
      headers['X-Craft-Token'] = options.token
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

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
    
    if (process.env.NODE_ENV === 'development') {
      throw error
    }
    
    return null
  }
}
