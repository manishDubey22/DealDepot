import { useEffect, useState } from "react"
import NetInfo from "@react-native-community/netinfo"

export const useNoInternetConnection = () => {
  const [connected, setConnected] = useState()
  const [visible, setVisible] = useState<any>("flex")
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected as any)
    })
    return () => {
      unsubscribe()
    }
  }, [])
  useEffect(() => {
    if (connected) {
      const timer = setTimeout(() => {
        setVisible("none")
      }, 6000)
      return () => {
        clearTimeout(timer)
      }
    } else {
      setVisible("flex")
    }
  }, [connected])

  return { connected, visible }
}
