const DEFAULT_OPTIONS = {
  private: false,
  preview: false,
  token: null
}

export async function fetchGraphQL(query, variables = {}, options = DEFAULT_OPTIONS) {
  try {
    const apiBaseUrl = process.env.CRAFT_URL
    const apiBasePath = 'api';

    if (!apiUrl) {
      throw new Error('CRAFT_URL has not been set for this environment')
    }

    const apiUrl = `${apiBaseUrl}/${apiBasePath}`;

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
