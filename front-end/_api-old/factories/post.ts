import type { IPost } from "@/types"
// import * as faker from "faker"
import { Factory } from "miragejs"

export const postFactory = Factory.extend<IPost>({
  id(i) {
    return i
  },
  title() {
    return 'title post' // faker.name.title()
  },
  description() {
    return 'desc post' // faker.name.body()
  },
})