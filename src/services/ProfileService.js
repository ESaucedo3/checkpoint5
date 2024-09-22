import { AppState } from "@/AppState.js";
import { api } from "./AxiosService.js";
import { Account } from "@/models/Account.js";

class ProfileService {
  clearUsers() {
    AppState.users = [];
  }
  async searchUsers(userQuery) {
    const reponse = await api.get(`api/profiles?query=${userQuery}`);
    const users = reponse.data.map((user) => new Account(user));
    AppState.users = users;
  }
  async getProfileById(profileId) {
    // Note clears potential ghost data
    AppState.activeProfile = null;
    const response = await api.get(`api/profiles/${profileId}`);
    const acquiredProfile = new Account(response.data);
    AppState.activeProfile = acquiredProfile;
  }
}

export const profileService = new ProfileService();
