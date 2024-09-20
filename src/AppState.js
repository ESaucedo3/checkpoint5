import { reactive } from "vue";
import { Post } from "./models/Post.js";
import { Ad } from "./models/Ad.js";
import { Account } from "./models/Account.js";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /**@type {Post[]} */
  posts: [],
  totalPages: 0,
  currentPage: 0,
  // NOTE For the following below not entirely sure what their purpose is yet
  newer: null,
  older: null,

  /**@type {Ad[]} */
  ads: [],

  /**@type {Account} */
  activeProfile: null,
});
