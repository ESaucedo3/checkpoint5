import { Post } from "@/models/Post.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";

class PostService {
  async getPosts() {
    const response = await api.get("api/posts");
    console.log(response.data);
    const acquiredPosts = response.data.posts.map((post) => new Post(post));
    AppState.posts = acquiredPosts;
    AppState.currentPage = response.data.page;
    AppState.totalPages = response.data.totalPages;
  }

  async getPostsByCreatorId(creatorId) {
    AppState.posts = [];
    const response = await api.get(`api/posts?creatorId=${creatorId}`);
    const acquiredPosts = response.data.posts.map((post) => new Post(post));
    AppState.posts = acquiredPosts;
    AppState.currentPage = response.data.page;
    AppState.totalPages = response.data.totalPages;
  }
  async changePage(pageNumber) {
    const response = await api.get(`api/posts?page=${pageNumber}`);
    const newPosts = response.data.posts.map((post) => new Post(post));
    AppState.posts = newPosts;
    AppState.currentPage = response.data.page;
    AppState.totalPages = response.data.totalPages;
  }
}

export const postService = new PostService();
