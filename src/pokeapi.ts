import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache: Cache = new Cache(1000000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area?offset=0&limit=20`;

    const cachedData = this.cache.get<ShallowLocations>(url);

    if (cachedData) {
        return cachedData.val as ShallowLocations;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status} ${response.statusText}`);
    }

    const data: unknown = await response.json();
    if (!isShallowLocations(data)) {
      throw new Error("Invalid locations response format from PokeAPI");
    }

    this.cache.add(url, data);

    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `https://pokeapi.co/api/v2/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);
    if (cached) {
      return cached.val as Location;
    }

    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const location: Location = await resp.json();
      this.cache.add(url, location);
      return location;
    } catch (e) {
      throw new Error(
        `Error fetching location '${locationName}': ${(e as Error).message}`,
      );
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};

function isShallowLocations(value: unknown): value is ShallowLocations {
  if (!value || typeof value !== "object") {
    return false;
  }

  const data = value as {
    count?: unknown;
    next?: unknown;
    previous?: unknown;
    results?: unknown;
  };

  if (typeof data.count !== "number") {
    return false;
  }

  const nextIsValid = typeof data.next === "string" || data.next === null;
  const previousIsValid = typeof data.previous === "string" || data.previous === null;
  if (!nextIsValid || !previousIsValid) {
    return false;
  }

  if (!Array.isArray(data.results)) {
    return false;
  }

  return data.results.every((location) => {
    if (!location || typeof location !== "object") {
      return false;
    }

    const parsed = location as { name?: unknown; url?: unknown };
    return typeof parsed.name === "string" && typeof parsed.url === "string";
  });
}