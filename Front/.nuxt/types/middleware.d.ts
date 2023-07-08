import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "D:/Dokumenty/CDV/2023/wi1/Front/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}