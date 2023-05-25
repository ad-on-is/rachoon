import { Dashboard } from '~~/models/dashboard'
import { Client, ClientType } from '~~/models/client'
import { InvoiceOrOffer, InvoiceOrOfferType } from '~~/models/invoiceOrOffer'
import { OrganizationType } from '~~/models/organization'
import { User, UserType } from '~~/models/user'
import { Project, ProjectType } from '~~/models/project'
import { TimeTrack } from '~~/models/timeTrack'

export default function useApi() {
	return {
		clients: (endpoint: string = '/api/clients') => {
			return {
				get: async (id: string): Promise<ClientType> => (await useHttp.get(`${endpoint}/${id}`)) as ClientType,
				getAll: async (): Promise<Client[]> => ((await useHttp.get(`${endpoint}`)) as []).map((d) => new Client(d)),
				count: async (): Promise<number> => Number(await useHttp.get(`${endpoint}/?count=true`)),
				delete: async (id: string) => await useHttp.del(`${endpoint}/${id}`),
				saveOrUpdate: async (client: ClientType, update: boolean = false) => {
					if (update) {
						return await useHttp.put(`${endpoint}/${client.id}`, client)
					} else {
						const c = await useApi().clients().count()
						client.number = useSettings().settings.numberFormat('clients', c + 1)
						return (await useHttp.post(`${endpoint}`, client, {
							title: client.number,
							text: 'Client saved successfully',
							type: 'success',
						})) as ClientType
					}
				},
			}
		},

		users: (endpoint: string = '/api/users') => {
			return {
				get: async (id: string): Promise<UserType> => (await useHttp.get(`${endpoint}/${id}`)) as UserType,
				getAll: async (): Promise<User[]> => ((await useHttp.get(`${endpoint}`)) as []).map((d) => new User(d)),
				delete: async (id: string) => await useHttp.del(`${endpoint}/${id}`),
				saveOrUpdate: async (user: UserType, update: boolean = false) => {
					if (update) {
						return await useHttp.put(`${endpoint}/${user.id}`, user)
					} else {
						return (await useHttp.post(`${endpoint}`, user, {
							title: user.data.fullName,
							text: 'User saved successfully',
							type: 'success',
						})) as UserType
					}
				},
			}
		},

		invoicesOrOffers: (type: string, endpoint: string = '/api/invoicesoroffers') => {
			return {
				saveOrUpdate: async (invoiceOrOffer: InvoiceOrOfferType, update: boolean = false): Promise<InvoiceOrOfferType> => {
					if (update) {
						await useHttp.put(`${endpoint}/${invoiceOrOffer.id}`, invoiceOrOffer, {
							title: `${type} ${invoiceOrOffer.number}`,
							text: 'Successfully updated',
						})
						return invoiceOrOffer
					} else {
						const c = await useApi().invoicesOrOffers(type).count()
						invoiceOrOffer.number = useSettings().settings.numberFormat(type + 's', c + 1)
						return (await useHttp.post(`${endpoint}?type=${type}`, invoiceOrOffer, {
							title: invoiceOrOffer.number,
							text: `${type} saved successfully`,
							type: 'success',
						})) as InvoiceOrOfferType
					}
				},
				getAll: async (): Promise<InvoiceOrOffer[]> => ((await useHttp.get(`${endpoint}?type=${type}`)) as []).map((d) => new InvoiceOrOffer(d)),
				get: async (id: string): Promise<InvoiceOrOffer> => new InvoiceOrOffer(await useHttp.get(`${endpoint}/${id}`)),
				delete: async (id: string) => await useHttp.del(`${endpoint}/${id}`),
				count: async (): Promise<number> => Number(await useHttp.get(`${endpoint}/?count=true&type=${type}`)),
				setStatus: async (id: string, status: string) =>
					await useHttp.put(`/api/invoicesoroffers/status/${id}`, { status: status }, { title: 'Status changed', text: 'Successfully marked as ' + status }),
			}
		},
		organization: (endpoint: string = '/api/organizations') => {
			return {
				getCurrent: async () => await useHttp.get('/'),
				save: async (organization: OrganizationType) =>
					await useHttp.post(endpoint, organization, {
						title: 'Settings',
						text: 'Successfully saved',
						type: 'success',
					}),
			}
		},
		profile: (endpoint: string = '/api/profile') => {
			return {
				get: async () => new User(await useHttp.get(endpoint)),
				save: async (user: UserType) => useHttp.post(endpoint, user, { title: 'Save profile', text: 'Profile saved successfully' }),
				savePassword: async (password: string) =>
					useHttp.post(`${endpoint}?pwOnly=true`, { password: password }, { title: 'Save password', text: 'Password saved successfully', type: 'success' }),
			}
		},
		projects: (
			userOrClient?: { client?: ClientType; user?: UserType },
			cEndpoint = (): string => `/api/clients/${userOrClient.client.id}/projects`,
			uEndpoint = (): string => `/api/users/${userOrClient.user.id}/projects`,
			endpoint: string = '/api/projects'
		) => {
			return {
				getAll: async (): Promise<Project[]> => ((await useHttp.get(endpoint)) as []).map((d) => new Project(d)),
				count: async (): Promise<number> => Number(await useHttp.get(`${endpoint}/?count=true`)),
				delete: async (id: string) => await useHttp.del(`${endpoint}/${id}`),
				assignToUser: async (id: string) => await useHttp.put(`${uEndpoint()}/${id}`, {}),
				unassignFromUser: async (id: string) => await useHttp.del(`${uEndpoint()}/${id}`),
				getAllForClient: async (): Promise<Project[]> => ((await useHttp.get(cEndpoint())) as []).map((d) => new Project(d)),
				getAllForUser: async (): Promise<Project[]> => ((await useHttp.get(uEndpoint())) as []).map((d) => new Project(d)),
				saveOrUpdate: async (project: ProjectType, update: boolean = false): Promise<Project> => {
					if (update) {
						return new Project(await useHttp.post(`${endpoint}/${project.id}`, project))
					} else {
						return new Project(await useHttp.post(cEndpoint(), project))
					}
				},
			}
		},
		timeTracks: (project?: ProjectType, pEndpoint = (id: string, cId: string): string => `/api/clients/${cId}/projects/${id}/timetracks`, endpoint: string = '/api/timetracks') => {
			return {
				getAll: async (filter?: { clientId?: string; startDate?: Date; endDate?: Date }): Promise<TimeTrack[]> =>
					(
						(await useHttp.get(
							`/api/timetracks?clientId=${filter?.clientId || ''}&startDate=${filter?.startDate?.toISOString() || ''}&endDate=${filter?.endDate?.toISOString() || ''}`
						)) as []
					).map((d) => new TimeTrack(d)),
				saveOrUpdate: async (timeTrack: TimeTrack, update: boolean = false): Promise<TimeTrack> => {
					if (update) {
						return new TimeTrack(
							await useHttp.put(`${endpoint}/${timeTrack.id}`, timeTrack, {
								title: 'TimeTrack updated',
								text: 'The time entry has been updated',
							})
						)
					} else {
						return new TimeTrack(
							await useHttp.post(pEndpoint(project.id, project.client.id), timeTrack, {
								title: 'TimeTrack logged',
								text: 'The time entry has been saved',
							})
						)
					}
				},
			}
		},
		dashboard: () => {
			return {
				get: async () => new Dashboard(await useHttp.get('/api/dashboard')),
			}
		},
		render: async (html: string, preview: boolean = false): Promise<string[] | string> => {
			const res = (await useHttp.post(`/api/render${preview ? '?preview=true' : ''}`, {
				html: html,
			})) as string[]

			if (preview) return res

			return res[0]
		},
	}
}
