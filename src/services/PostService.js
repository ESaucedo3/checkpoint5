import { Post } from "@/models/Post.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";
import { logger } from "@/utils/Logger.js";

class PostService {
  // Left Off here! actually easy since updatedPostData is already an object so EZ
  async updatePost(postId, updatedPostData) {
    const response = await api.put(`api/posts/${postId}`, updatedPostData);
    logger.log("post updated", response.data);
    const postIndex = AppState.posts.findIndex((post) => post.id === postId);
    const updatedPost = new Post(response.data);
    AppState.posts.splice(postIndex, 1, updatedPost);
  }
  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}`);
    logger.log("post deleted", response.data);
    const postIndex = AppState.posts.findIndex((post) => post.id === postId);
    AppState.posts.splice(postIndex, 1);
  }
  async createPost(postData) {
    const response = await api.post("api/posts", postData);
    logger.log("created post", response.data);
    const newPost = new Post(response.data);
    AppState.posts.unshift(newPost);
  }
  async heartPost(postId) {
    const response = await api.post(`api/posts/${postId}/like`);
    const posts = AppState.posts;
    const postIndex = posts.findIndex((post) => post.id === postId);
    const actualPost = new Post(response.data);
    posts.splice(postIndex, 1, actualPost);
  }
  async getPosts() {
    const response = await api.get("api/posts");
    const acquiredPosts = response.data.posts.map((post) => new Post(post));
    AppState.posts = acquiredPosts;
    AppState.currentPage = response.data.page;
    AppState.totalPages = response.data.totalPages;
    logger.log(AppState.posts);
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
