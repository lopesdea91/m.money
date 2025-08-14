import { addToast } from "@/@features/services/toast/service";
import type { AxiosError } from "axios";

function handleErros(error: unknown) {
  const { code, status, message, response } = error as AxiosError<{ message: string }>
  const { data } = response ?? {}

  console.log('... handleErros', error);

  // if (code === 'ERR_BAD_REQUEST' && status !== 401) { // api fora
  //   addToast({ type: 'error', message: 'Erro ao se comunicar com API' })
  //   throw Error('ERR_BAD_REQUEST')
  // }

  if (code === 'ERR_NETWORK') { // sem rede
    const message = 'Parece que você esta sem internet no momento, tente novamente mais tarde!'
    addToast({ message, type: 'error', })
    throw Error(message)
  }

  // if (status === 401) {// não autenticado 
  //   const message = 'Sessão encerrada!'
  //   throw Error(message)
  // }


  // throw Error(message, { cause: { data } })

  return {
    requestCode: code,
    requestStatus: status,
    requestMessage: message,
    response,
    responseMessage: data?.message ?? ''
  }
}

export default handleErros