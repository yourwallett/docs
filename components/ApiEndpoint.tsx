interface ApiEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  description: string
}

export default function ApiEndpoint({ method, path, description }: ApiEndpointProps) {
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800'
      case 'POST':
        return 'bg-blue-100 text-blue-800'
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800'
      case 'DELETE':
        return 'bg-red-100 text-red-800'
      case 'PATCH':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <span className={`px-2 py-1 rounded text-xs font-semibold ${getMethodColor(method)}`}>
        {method}
      </span>
      <code className="flex-1 text-sm font-mono text-gray-900">{path}</code>
      <span className="text-sm text-gray-600">{description}</span>
    </div>
  )
}
