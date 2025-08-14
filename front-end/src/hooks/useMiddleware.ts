import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { authCookie } from "@/@features/memory/cookie/cookie";
import { getAuthUserService } from "@/@features/services/auth/service";
import { useStore } from "@/hooks/useStore";
import sleep from "@/utils/sleep";

export default function useMiddleware() {
  const isMounted = useRef(false);

  const navigate = useNavigate()
  const location = useLocation()

  const store = useStore()
  const [isPending, setPending] = useState(true);

  async function show() {
    await sleep(100)
    setPending(false)
  }
  async function redirectLogin() {
    navigate('/')
  }
  async function redirectHome() {
    navigate('/dashboard')
    await show()
  }

  async function handler() {
    const { token } = authCookie.get()
    const hasToken = !!token

    const path = location.pathname
    const isPathPublic = ['/'].includes(path)

    const { isLogged } = store.l

    // sem token && rotas internas > login
    if (!hasToken && !isPathPublic) {
      console.log(' ... LOG', 'sem token && rotas internas > login')
      authCookie.destroy()
      return redirectLogin()
    }
    // sem token && rotas publicas
    if (!hasToken && isPathPublic) {
      console.log(' ... LOG', 'sem token && rotas publicas')
      authCookie.destroy()
      await show()
    }
    // tem token && não logado && rota publica > dashboard
    if (hasToken && !isLogged && isPathPublic) {
      console.log(' ... LOG', 'tem token && não logado && rota publica > dashboard')
      await getAuthUserService()
        .then(() => {
          redirectHome()
        })
        .catch((error: Error) => {
          console.log(error.message);
          authCookie.destroy()
          redirectLogin()
        })
    }
    // tem token && não logado && rota interna
    if (hasToken && !isLogged && !isPathPublic) {
      console.log(' ... LOG', 'tem token && não logado && rota interna')
      await getAuthUserService()
        .then(() => {
          show()
        })
        .catch((error: Error) => {
          console.log(error.message);
          authCookie.destroy()
          redirectLogin()
        })
    }
    // tem token && logado && rotas publicas > dashboard
    if (hasToken && isLogged && isPathPublic) {
      console.log(' ... LOG', 'tem token && logado && rotas publicas > dashboard')
      redirectHome()
    }
    // tem token && logado && rota interna
    if (hasToken && isLogged && !isPathPublic) {
      console.log(' ... LOG', 'tem token && logado && rota interna')
      await show()
    }

  }

  useEffect(() => {
    if (isMounted.current) return

    isMounted.current = true

    handler()
  }, [])

  return { isPending }
}
