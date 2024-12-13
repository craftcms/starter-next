const DEFAULT_OPTIONS = {
  private: false,
  preview: false,
  token: null
}

export async function fetchGraphQL(query, variables = {}, options = DEFAULT_OPTIONS) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_CRAFT_API_URL
    
    if (!apiUrl) {
      throw new Error('NEXT_PUBLIC_CRAFT_API_URL is not configured')
    }

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    // Handle authentication
    if (options.private || options.preview) {
      const token = options.token || process.env.NEXT_PUBLIC_CRAFT_API_TOKEN
      if (!token) {
        throw new Error('API token required for private/preview queries')
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

    const result = await response.json()

    // Handle GraphQL errors
    if (result.errors) {
      console.error('GraphQL Errors:', result.errors)
      const errorMessage = result.errors
        .map(error => error.message)
        .join(', ')
      throw new Error(`GraphQL Error: ${errorMessage}`)
    }

    // Validate response data
    if (!result.data) {
      throw new Error('No data returned from GraphQL')
    }

    return result.data
  } catch (error) {
    console.error('GraphQL Fetch Error:', {
      message: error.message,
      query,
      variables
    })
    throw error
  }
}