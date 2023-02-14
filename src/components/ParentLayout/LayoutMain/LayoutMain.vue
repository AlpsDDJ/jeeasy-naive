<template>
  <div class="main-content">
    <router-view>
      <template #default="{ Component, route }">
        <transition :name="'zoom-fade'" mode="out-in" appear>
          <keep-alive v-if="route.meta.keepAlive" :include="[]">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component :is="Component" v-else :key="route.fullPath" />
        </transition>
      </template>
    </router-view>
  </div>
</template>

<script lang="ts" setup name="LayoutMain"></script>

<style lang="less" scoped></style>
