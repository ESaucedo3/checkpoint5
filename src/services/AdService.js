import { Ad } from "@/models/Ad.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";

class AdService {
  async getAds() {
    const response = await api.get("api/ads");
    const acquiredAds = response.data.map((ad) => new Ad(ad));
    AppState.ads = acquiredAds;
  }
}

export const adService = new AdService();
