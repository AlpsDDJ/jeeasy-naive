<template>
  <n-layout class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <img :src="LoginImg" alt="" />
        </div>
        <div class="view-account-top-desc">Jeeasy Naive</div>
      </div>
      <div class="view-account-form">
        <n-form ref="formRef" label-placement="left" size="large" :model="loginModel">
          <n-form-item path="username">
            <n-input v-model:value="loginModel.username" placeholder="请输入用户名">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <!--                  <PersonOutline />-->
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input v-model:value="loginModel.password" type="password" show-password-on="click" placeholder="请输入密码">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <!--                  <LockClosedOutline />-->
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex justify-between">
              <div class="flex-initial">
                <!--                <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>-->
              </div>
              <div class="flex-initial order-last">
                <a href="javascript:">忘记密码</a>
              </div>
            </div>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" size="large" block :loading="loginLoading" @click="loginHandle"> 登录 </n-button>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex view-account-other">
              <div class="flex-initial">
                <!--                <span>其它登录方式</span>-->
              </div>
              <div class="flex-initial mx-2">
                <a href="javascript:">
                  <n-icon size="24" color="#2d8cf0">
                    <!--                    <LogoGithub />-->
                  </n-icon>
                </a>
              </div>
              <div class="flex-initial mx-2">
                <a href="javascript:">
                  <n-icon size="24" color="#2d8cf0">
                    <!--                    <LogoFacebook />-->
                  </n-icon>
                </a>
              </div>
              <div class="flex-initial" style="margin-left: auto">
                <!--                <a href="javascript:">注册账号</a>-->
              </div>
            </div>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </n-layout>
</template>
<script lang="ts" setup>
  // import Logo from '@/assets/image/logo.png'
  import LoginImg from '@/assets/image/login/img.png'
  import { LoginForm } from '@/store/modules/user/type'
  import { useUserStore } from '@/store/modules/user'
  // import { PageEnum } from '@/enums/PageEnum'

  defineOptions({
    name: 'Login'
  })

  const userStore = useUserStore()
  const router = useRouter()

  const loginModel: LoginForm = reactive({
    username: 'admin',
    password: '123456'
  })
  const loginLoading = ref(false)

  const loginHandle = async () => {
    loginLoading.value = true
    const success = await userStore.doLogin(loginModel)
    loginLoading.value = false
    if (success) {
      const { redirect = PageEnum.BASE_HOME } = router.currentRoute.value.query
      await router.push({ path: redirect as string })
    }
  }
</script>
<style scoped lang="less">
  .view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    &-container {
      flex: 1;
      padding: 32px 12px;
      max-width: 384px;
      min-width: 320px;
      margin: 0 auto;
    }
    &-top {
      padding: 32px 0;
      text-align: center;
      &-desc {
        font-size: 14px;
        color: #808695;
      }
    }
    &-other {
      width: 100%;
    }
    .default-color {
      color: #515a6e;
      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
  }
  @media (min-width: 768px) {
    .view-account {
      //background-image: url('@/assets/image/login/login-bg.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }
    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }
</style>
