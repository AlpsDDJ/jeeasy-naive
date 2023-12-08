export const useCacheStore = defineStore('cache', {
  state: () => ({
    pool: {}
  }),
  actions: {
    setValue(key: DataKey, value: any) {
      this.pool[key] = value
    },
    getValue(key: DataKey) {
      return this.pool[key]
    },
    remove(key: DataKey) {
      delete this.pool[key]
    },
    clear() {
      this.pool = {}
    }
  },
  getters: {},
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'cahce', // 修改存在缓存中的key值
        storage: sessionStorage /// 修改存储方式为localStorage，默认sessionStorage
        // paths: ['darkTheme'] // 只持久化'curTheme'，此时刷新页面curTheme数据会被保留，其他state将会重置
      }
    ]
  }
})
