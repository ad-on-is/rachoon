class InfoStore {
  info = <Ref<null | any>>ref(null);

  loading = ref(false);
  init = async () => {
    if (this.info.value !== null) return;
    this.loading.value = true;
    this.info.value = ((await useFetch("/app/info")) as any).data.value;
    const url = useRequestURL();
    if (this.info.value.BASE_URL === "") {
      this.info.value.BASE_URL = `${url.protocol}//${url.host}`;
    }
    const apiInfo = await useApi().info().get();
    this.info.value = { ...this.info.value, ...apiInfo };
    console.log(`INFO: ${JSON.stringify(this.info.value)}`);
    this.loading.value = false;
  };
}

export default defineStore("info", () => new InfoStore());
