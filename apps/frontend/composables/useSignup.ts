import slugify from 'slugify'

export default defineStore('signup', () => {
  const user = ref({
    email: null,
    password: null,
    passwordRepeat: null,
    data: {
      fullName: null,
    },
  })

  const organization = ref({
    name: null,
    slug: null,
  })

  const slug = ref(null)

  watch(organization.value, () => {
    if (organization.value.slug) {
      slug.value = organization.value.slug
    } else {
      slug.value = slugify(organization.value.name, { lower: true })
    }
  })

  const getURIParts = (url) => {
    const matches = url.match(/^(\w+?:\/\/)?([\w-\.]+(?=\/?))?:?(\d*)?([^:]*)/)
    return matches
      ? {
          scheme: matches[1],
          host: matches[2],
          port: matches[3],
          pathname: matches[4],
        }
      : {
          scheme: 'https://',
          host: 'rachoon.work',
          port: '',
          pathname: '',
        }
  }

  const signUp = async (e: Event) => {
    e.preventDefault()
    const res = await useHttp.post('/api/register', {
      user: user.value,
      organization: { ...organization.value, slug: slug.value },
    })

    if (res) {
      const uriParts = getURIParts(window.location.href)
      const port = uriParts.port ? `:${uriParts.port}` : ''
      //   useAuth().loginEmailPassword(user.value.email, user.value.password)
      window.location.href = `${uriParts.scheme}${slug.value}.${uriParts.host.replace('app.', '')}${port}/login`
    }
  }

  return {
    user,
    organization,
    slug,
    signUp,
  }
})
