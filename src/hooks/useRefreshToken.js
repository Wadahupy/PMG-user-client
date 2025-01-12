
import { authApi } from "../config/axios"

const useRefreshToken = () => {

  const refresh = async() => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      console.log(refreshToken)

      const response = await authApi.post('/refreshtoken', {refreshToken})

      localStorage.setItem('accessToken', response.data)

      return response.data

    } catch (error) {
      throw error
    }
  }

  return refresh
}

export default useRefreshToken
