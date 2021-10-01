import { useCallback, useState } from "react"
import { getCookie } from "./cookies"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)

        try {
            const response = await fetch(
                'http://46.253.143.22' + url,
                {
                    method,
                    body,
                    headers: {
                        'Authorization': `Bearer ${getCookie('authToken')}`,
                        ...headers
                    }
                }
            )

            const data = await response.json()

            if (!response.ok) {
                let message = 'При отправке запроса, что-то пошло не так'

                if (!data.success) {
                    message = data.error
                }

                return {
                    error: message
                }
            }

            setLoading(false)

            return data
        } catch (err) {
            setLoading(false)
            throw err
        }
    }, [])

    return {loading, request}
}