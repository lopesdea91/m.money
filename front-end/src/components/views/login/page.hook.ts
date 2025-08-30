import type { Features, Store } from '@/types'
import { useFormLoginHook } from './_components/FormLogin.hook'

export const useLoginPageHook = ($store: Store, $features: Features) => {
  const formLogin = useFormLoginHook($store, $features)

  return {
    formLogin: {
      ...formLogin
    },
  }
}
