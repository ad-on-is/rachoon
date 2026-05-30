import camelcaseKeys from "camelcase-keys";

type FetchMethod = "get" | "post" | "put" | "delete" | "patch" | "head" | "options";
export default class HttpClient {
  public static get = async (url: string, notify: boolean | { title: string; text: string; type?: string } = false) =>
    await this.doFetch(url, { method: "get" }, notify);
  public static del = async (url: string, notify: boolean | { title: string; text: string; type?: string } = false) =>
    await this.doFetch(url, { method: "delete" }, notify);
  public static post = async (url: string, data: any, notify: boolean | { title: string; text: string; type?: string } = false) =>
    await this.doFetch(url, { method: "post", body: data }, notify);
  public static put = async (url: string, data: any, notify: boolean | { title: string; text: string; type?: string } = false) =>
    await this.doFetch(url, { method: "put", body: data }, notify);

  public static doFetch = async (
    url: string,
    opts: { method: FetchMethod; body?: any },
    notify: boolean | { title: string; text: string; type?: string } = false,
  ) => {
    await useInfo().init();
    if (useInfo().info === null) {
      return {};
    }
    const baseUrl = useInfo().info.BASE_URL;

    const origin = useRequestURL().origin;
    try {
      const headers: any = {
        "content-type": "application/json",
        origin: origin,
      };
      if (useAuth().key() !== null) {
        headers["Authorization"] = `Bearer ${useAuth().key()}`;
      }

      const res = await $fetch.raw(`${baseUrl}${url}`, {
        method: opts.method,
        body: JSON.stringify(opts.body),
        headers: headers,
      });

      if (typeof notify !== "boolean") {
        useToast(notify.title, notify.text, notify.type || "success");
      }

      if (res.status >= 400 && notify) {
        useToast("Error", JSON.stringify(res._data) || "Unexpected error", "error");
      }

      return { body: res._data as any, headers: res.headers };
    } catch (e) {
      if (e.message.includes("401 Unauthorized")) {
        useAuth().logout();
        return {};
      }
      if (notify) {
        this.notifyError(e);
      }

      return {};
    }
  };

  private static notifyError(e: any) {
    let title = "Error";
    let message = "Unexpected error occured";

    if (e.data) {
      if (e.data?.errors[0]?.message.includes("E_INVALID_AUTH_PASSWORD")) {
        message = "Email and password do not match";
      } else if (e.data?.errors[0]?.message) {
        message = e.data.errors[0].message;
      } else if (typeof e.data === "string") {
        message = e.data;
      }
    }
    useToast(title, message, "error");
  }
}
