<script setup lang="ts">
import VPNav from '@theme/Nav/VPNav.vue'
import VPBackdrop from '@theme/VPBackdrop.vue'
import VPBackToTop from '@theme/VPBackToTop.vue'
import VPBulletin from '@theme/VPBulletin.vue'
import VPContent from '@theme/VPContent.vue'
import VPEncryptGlobal from '@theme/VPEncryptGlobal.vue'
import VPFooter from '@theme/VPFooter.vue'
import VPLocalNav from '@theme/VPLocalNav.vue'
import VPSidebar from '@theme/VPSidebar.vue'
import VPSkipLink from '@theme/VPSkipLink.vue'

import VPDocAside from '@theme/VPDocAside.vue'
import VPDocBreadcrumbs from '@theme/VPDocBreadcrumbs.vue'
import VPDocChangelog from '@theme/VPDocChangelog.vue'
import VPDocContributor from '@theme/VPDocContributor.vue'
import VPDocCopyright from '@theme/VPDocCopyright.vue'
import VPDocFooter from '@theme/VPDocFooter.vue'
import VPDocMeta from '@theme/VPDocMeta.vue'
import VPEncryptPage from '@theme/VPEncryptPage.vue'
import VPTransitionFadeSlideY from '@theme/VPTransitionFadeSlideY.vue'

import { watch } from 'vue'
import { Content, useRoute } from 'vuepress/client'
import { useCloseSidebarOnEscape, useData, useEncrypt, useSidebar } from 'vuepress-theme-plume/composables'

const {
  isOpen: isSidebarOpen,
  open: openSidebar,
  close: closeSidebar,
} = useSidebar()

const { frontmatter, isDark } = useData()
const { isGlobalDecrypted, isPageDecrypted } = useEncrypt()

const route = useRoute()
watch(() => route.path, closeSidebar)

useCloseSidebarOnEscape(isSidebarOpen, closeSidebar)
</script>

<template>
  <div
    v-if="frontmatter.pageLayout !== false && frontmatter.pageLayout !== 'custom'" class="theme-plume vp-layout"
    vp-container
  >
    <VPEncryptGlobal v-if="!isGlobalDecrypted" />

    <template v-else>
      <slot name="layout-top" />

      <VPSkipLink />

      <VPBackdrop :show="isSidebarOpen" @click="closeSidebar" />

      <VPNav>
        <template #nav-bar-title-before>
          <slot name="nav-bar-title-before" />
        </template>
        <template #nav-bar-title-after>
          <slot name="nav-bar-title-after" />
        </template>
        <template #nav-bar-content-before>
          <slot name="nav-bar-content-before" />
        </template>
        <template #nav-bar-content-after>
          <slot name="nav-bar-content-after" />
        </template>
        <template #nav-screen-content-before>
          <slot name="nav-screen-content-before" />
        </template>
        <template #nav-screen-content-after>
          <slot name="nav-screen-content-after" />
        </template>
      </VPNav>

      <VPLocalNav
        :open="isSidebarOpen"
        :show-outline="isPageDecrypted"
        @open-menu="openSidebar"
      />

      <VPSidebar :open="isSidebarOpen">
        <template #sidebar-nav-before>
          <slot name="sidebar-nav-before" />
        </template>
        <template #sidebar-nav-after>
          <slot name="sidebar-nav-after" />
        </template>
      </VPSidebar>

      <DocComment :darkmode="isDark" vp-comment vp-content />
      <VPBackToTop />
      <VPFooter>
        <template #footer-content>
          <slot name="footer-content" />
        </template>
      </VPFooter>
      <slot name="layout-bottom" />
    </template>
  </div>

  <VPBulletin>
    <template #bulletin-content>
      <slot name="bulletin-content" />
    </template>
  </VPBulletin>
</template>

<style scoped>
.vp-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
