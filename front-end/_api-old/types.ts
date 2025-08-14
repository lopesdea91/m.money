import { Server as ServerMirage } from "miragejs";
import type Schema from "miragejs/orm/schema";

import type { Registry } from "miragejs/-types";
import type { LoginModel, PostModel } from "./models";

type AppRegistry = Registry<
  { post: typeof PostModel; },
  { login: typeof LoginModel; }
>;

export type Server = ServerMirage<AppRegistry>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppSchema = Schema<AppRegistry> & any