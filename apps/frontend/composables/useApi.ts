import { Dashboard } from "~~/models/dashboard";
import { Client } from "~~/models/client";
import { Document, DocumentStatus, DocumentType } from "~~/models/document";
import { Organization } from "~~/models/organization";
import { Token, User } from "~~/models/user";
import { Template } from "~/models/template";
import Paginator from "~/models/paginator";

export type getAllFunc<T> = (page: number, perPage: number, sort?: any, filter?: any) => Promise<Paginator<T>>;

export default function useApi() {
  const paginate = async <T>(url: string, Model: new (data: any) => T) => {
    const { body, headers } = await useHttp.get(url);
    const data = body.map((d: any) => new Model(d));

    return new Paginator<T>({
      total: Number(headers?.get("x-total") || "0"),
      perPage: Number(headers?.get("x-per-page") || "0"),
      page: Number(headers?.get("x-page") || "0"),
      pages: Number(headers?.get("x-pages") || "0"),
      rows: data,
    });
  };

  const parseSort = (sort?: any): string => {
    if (!sort) return "";
    const sorts: string[] = [];

    Object.keys(sort).forEach((key) => {
      sorts.push(`sort[${key}]=${sort[key]}`);
    });
    return `&${sorts.join("&")}`;
  };

  const parseFilter = (filter?: any): string => {
    if (!filter) return "";
    const filters: string[] = [];
    Object.keys(filter).forEach((key) => {
      const op = filter[key].operator.replace("=", "%3D");
      filters.push(`filter[${key}][${op}]=${filter[key].value}`);
    });
    return filters.join("&");
  };

  return {
    clients: (endpoint: string = "/api/clients") => {
      return {
        get: async (id: string): Promise<Client> => new Client((await useHttp.get(`${endpoint}/${id}`)).body!),
        getAll: async (page: number = 1, perPage: number = 5, sort?: any, filter?: any, search: string = ""): Promise<Paginator<Client>> =>
          await paginate<Client>(
            `${endpoint}?page=${page}&perPage=${perPage}${parseSort(sort)}&${parseFilter(filter)}&q=${search}`,
            Client,
          ),
        getForAutoComplete: async (q: string = ""): Promise<Client[]> =>
          (await useHttp.get(`${endpoint}/autocomplete?q=${q}`)).body.map((d: any) => new Client(d)),
        count: async (): Promise<number> => Number((await useHttp.get(`${endpoint}/?count=true`)).body!),
        delete: async (id: string) => (await useHttp.del(`${endpoint}/${id}`)).body,
        saveOrUpdate: async (client: Client, update: boolean = false) => {
          const notif = {
            title: client.number,
            text: "Client saved successfully",
            type: "success",
          };
          if (update) {
            return new Client((await useHttp.put(`${endpoint}/${client.id}`, client, notif)).body);
          } else {
            return new Client((await useHttp.post(`${endpoint}`, client, notif)).body);
          }
        },
      };
    },

    number: (type: string | DocumentType, endpoint: string = "/api/number") => {
      return {
        get: async (): Promise<string> => (await useHttp.get(`${endpoint}/${type}`)).body,
      };
    },

    templates: (endpoint: string = "/api/templates") => {
      return {
        get: async (id: string): Promise<Template> => new Template((await useHttp.get(`${endpoint}/${id}`)).body),
        duplicate: async (id: string): Promise<Template> => new Template((await useHttp.get(`${endpoint}/duplicate/${id}`)).body),
        getDefault: async (): Promise<Template> => new Template((await useHttp.get(`${endpoint}/default`)).body),
        getAll: async (
          page: number = 1,
          perPage: number = 5,
          sort?: any,
          filter?: any,
          search: string = "",
        ): Promise<Paginator<Template>> =>
          await paginate<Template>(
            `${endpoint}?page=${page}&perPage=${perPage}&${parseSort(sort)}&${parseFilter(filter)}&q=${search}`,
            Template,
          ),

        // getAll: async (): Promise<Template[]> => ((await useHttp.get(`${endpoint}`)).body as []).map((d) => new Template(d)),
        delete: async (id: string) => (await useHttp.del(`${endpoint}/${id}`)).body,
        saveOrUpdate: async (template: Template, update: boolean = false) => {
          const notif = {
            title: template.title,
            text: "Template saved successfully",
            type: "success",
          };
          if (update) {
            return new Template((await useHttp.put(`${endpoint}/${template.id}`, template, notif)).body);
          } else {
            return new Template((await useHttp.post(`${endpoint}`, template, notif)).body);
          }
        },
      };
    },

    users: (endpoint: string = "/api/users") => {
      return {
        get: async (id: string): Promise<User> => new User((await useHttp.get(`${endpoint}/${id}`)).body),
        // getAll: async (): Promise<User[]> => ((await useHttp.get(`${endpoint}`)).body as []).map((d) => new User(d)),
        getAll: async (page: number = 1, perPage: number = 5, sort?: any, filter?: any, search: string = ""): Promise<Paginator<User>> =>
          await paginate<User>(`${endpoint}?page=${page}&perPage=${perPage}&${parseSort(sort)}&${parseFilter(filter)}&q=${search}`, User),

        delete: async (id: string) => (await useHttp.del(`${endpoint}/${id}`)).body,
        saveOrUpdate: async (user: User, update: boolean = false) => {
          const notif = {
            title: user.data.fullName,
            text: "User saved successfully",
            type: "success",
          };
          if (update) {
            return new User((await useHttp.put(`${endpoint}/${user.id}`, user, notif)).body);
          } else {
            return new User((await useHttp.post(`${endpoint}`, user, notif)).body);
          }
        },
      };
    },

    tokens: (endpoint: string = "/api/tokens") => {
      return {
        new: async (name: string): Promise<Token> => new Token((await useHttp.post(`${endpoint}`, { name: name })).body),
        getAll: async (): Promise<Token[]> => (await useHttp.get(`${endpoint}`)).body.map((t: any) => new Token(t)),
        delete: async (id: string) => (await useHttp.del(`${endpoint}/${id}`)).body,
      };
    },

    documents: (type: DocumentType, endpoint: string = "/api/documents") => {
      return {
        saveOrUpdate: async (document: Document, update: boolean = false): Promise<Document> => {
          if (update) {
            await useHttp.put(`${endpoint}/${document.id}`, document, {
              title: `${DocumentType[type]} ${document.number}`,
              text: "Successfully updated",
            });
            return document;
          } else {
            return new Document(
              (
                await useHttp.post(`${endpoint}?type=${type}`, document, {
                  title: document.number,
                  text: `${DocumentType[type]} saved successfully`,
                  type: "success",
                })
              ).body,
            );
          }
        },
        getAll: async (
          page: number = 1,
          perPage: number = 5,
          sort?: any,
          filter?: any,
          search: string = "",
        ): Promise<Paginator<Document>> =>
          await paginate<Document>(
            `${endpoint}?type=${type}&page=${page}&perPage=${perPage}&${parseSort(sort)}&${parseFilter(filter)}&q=${search}`,
            Document,
          ),

        get: async (id: string): Promise<Document> => new Document((await useHttp.get(`${endpoint}/${id}`)).body),
        duplicate: async (id: string): Promise<Document> => (await useHttp.get(`${endpoint}/duplicate/${id}`)).body,
        delete: async (id: string) => (await useHttp.del(`${endpoint}/${id}`)).body,
        count: async (): Promise<number> => Number((await useHttp.get(`${endpoint}/?count=true&type=${type}`)).body),
        setStatus: async (id: string, status: DocumentStatus) =>
          await useHttp.put(
            `/api/documents/status/${id}`,
            { status: status },
            {
              title: "Status changed",
              text: "Successfully marked as " + status,
            },
          ),
      };
    },
    organization: (endpoint: string = "/api/organizations") => {
      return {
        getCurrent: async (slug: string = "") => (await useHttp.get(`/api${slug !== "" ? `?slug=${slug}` : ""}`, false)).body,
        save: async (organization: Organization) =>
          new Organization(
            (
              await useHttp.post(endpoint, organization, {
                title: "Settings",
                text: "Successfully saved",
                type: "success",
              })
            ).body,
          ),
      };
    },
    profile: (endpoint: string = "/api/profile") => {
      return {
        get: async () => new User((await useHttp.get(endpoint)).body),
        save: async (user: User) =>
          new User(
            (
              await useHttp.post(endpoint, user, {
                title: "Save profile",
                text: "Profile saved successfully",
              })
            ).body,
          ),
        savePassword: async (password: string) =>
          await useHttp.post(
            `${endpoint}?pwOnly=true`,
            { password: password },
            {
              title: "Save password",
              text: "Password saved successfully",
              type: "success",
            },
          ),
      };
    },
    dashboard: () => {
      return {
        get: async () => new Dashboard((await useHttp.get("/api/dashboard")).body),
      };
    },
    auth: (slug: string = "", endpoint: string = "/api/auth") => {
      return {
        loginEmailPassword: async (email: string, password: string) =>
          (await useHttp.post(`${endpoint}${slug !== "" ? `?slug=${slug}` : ""}`, { email: email, password: password }, true)).body as {
            token?: string;
          },
        logout: async (id: string) => (await useHttp.del(`${endpoint}/${id}`)).body,
      };
    },

    info: () => {
      return {
        get: async (): Promise<any> => (await useHttp.get("/api/info")).body,
      };
    },
    render: async (html: string, preview: boolean = false): Promise<string[] | string> => {
      const res = (await useHttp.post(
        `/api/render${preview ? "?preview=true" : ""}`,
        {
          html: html,
        },
        true,
      )) as string[];

      if (preview) return res;

      return res[0];
    },
  };
}
