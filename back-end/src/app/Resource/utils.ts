export default function validateResourceBody(expectedTypes: Record<string, string>, body: Record<string, unknown>) {

  const receivedKeys = Object.keys(body);

  // 1. Verifica se todas as chaves esperadas estão presentes
  const missingKeys = Object.keys(expectedTypes).filter(key => !receivedKeys.includes(key));
  if (missingKeys.length > 0) {
    throw new Error(`As seguintes chaves estão faltando no corpo da requisição: ${missingKeys.join(', ')}.`);
  }

  // 2. Verifica se existem chaves extras no corpo da requisição
  const extraKeys = receivedKeys.filter(key => !Object.keys(expectedTypes).includes(key));
  if (extraKeys.length > 0) {
    throw new Error(`O corpo da requisição contém chaves não esperadas: ${extraKeys.join(', ')}.`);
  }

  // 3. Verifica o tipo de cada valor
  for (const key in expectedTypes) {
    const expectedType = expectedTypes[key];
    const receivedValue = body[key];
    let receivedType;

    // Obtém o tipo do valor recebido
    if (Array.isArray(receivedValue)) {
      receivedType = "array";
    } else {
      receivedType = typeof receivedValue;
    }

    if (receivedType !== expectedType) {
      throw new Error(`A chave '${key}' esperava o tipo '${expectedType}', mas recebeu o tipo '${receivedType}'.`);
    }
  }
}
