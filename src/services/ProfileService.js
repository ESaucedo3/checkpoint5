import { AppState } from "@/AppState.js";
import { api } from "./AxiosService.js";
import { Account } from "@/models/Account.js";

class ProfileService {
  async getProfileById(profileId) {
    // Note clears potential ghost data
    AppState.activeProfile = null;
    const response = await api.get(`api/profiles/${profileId}`);
    console.log(response.data);
    const acquiredProfile = new Account(response.data);
    AppState.activeProfile = acquiredProfile;
  }
}

export const profileService = new ProfileService();
