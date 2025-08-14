export default async function sleep(time: number = 750) {
  return await new Promise((res) => setTimeout(res, time));
}
