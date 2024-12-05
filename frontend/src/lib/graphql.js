export async function fetchGraphQL(query, variables = {}) {
  const res = await fetch(process.env.CRAFT_URL + '/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const json = await res.json()

  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'GraphQL Error')
  }

  return json.data
}
