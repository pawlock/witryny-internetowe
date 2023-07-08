interface RequestMethods {
  get(url: string, params?: object): Promise<any>;
}

class Request implements RequestMethods {
  private _options = {
    baseURL: "http://localhost:2137",
  };

  async get<T extends object = any>(url: string, params = {}): Promise<T> {
    const { data, error } = await useFetch<T>(url, {
      params,
      method: "GET",
      server: false,
      initialCache: false,
      ...this._options,
    });

    if (!data)
      throw new Error(`Can not load ${url}`);

    return (data.value as any);
  }
}

export default new Request();
