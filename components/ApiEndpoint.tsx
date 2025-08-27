interface ApiEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  description: string
}

export default function ApiEndpoint({ method, path, description }: ApiEndpointProps) {
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
      case 'POST':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
      case 'PUT':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
      case 'DELETE':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
      case 'PATCH':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <span className={`px-2 py-1 rounded text-xs font-semibold ${getMethodColor(method)}`}>
        {method}
      </span>
      <code className="flex-1 text-sm font-mono text-gray-900 dark:text-gray-100 break-all">{path}</code>
      <span className="text-sm text-gray-600 dark:text-gray-400">{description}</span>
    </div>
  )
}
