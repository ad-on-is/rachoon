import useApi from './useApi'

export default defineStore('settings', () => {
  const settings = useProfile().me.organization.settings
  const organizationData = useProfile().me.organization.data
  async function save() {
    await useApi().organization().save(useProfile().me.organization)
  }

  async function selectFile(e) {
    const file = e.target.files[0]

    /* Make sure file exists */
    if (!file) return
    const readData = (f): Promise<any> =>
      new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(f)
      })
    const data = await readData(file)
    const size = data.length / 1024
    if (size > 16) {
      useNotification().notify({
        title: 'Invalid image',
        text: 'The image is too large.',
        type: 'error',
      })
      return
    } else {
      useProfile().me.organization.data.logo = data as string
    }
  }

  return {
    settings,
    save,
    selectFile,
  }
})
