<template>
  <div class="login-page mx-auto p-3 w-330">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          type="text"
          placeholder="请输入邮箱地址"
          :rules="emailRules"
          v-model="emailVal"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="passwordVal"
        ></validate-input>
        <div class="form-text">
          <router-link to="/signup" class="">还没有账户？去注册一个新的吧！</router-link>
        </div>
      </div>
      <template v-slot:submit>
        <button type="submit" class="btn btn-primary btn-block btn-large w-100">登录</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import { GlobalDataProps, PayloadProps } from '@/store'
import createMessage from '@/components/createMessage'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload: PayloadProps = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', payload)
          .then(() => {
            createMessage('登录成功 2秒后跳转到首页', 'success')
            setTimeout(() => {
              router.push('/')
            }, 2000)
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

<style scoped>
.w-330 {
  max-width: 330px;
}
.btn-block{
  width: 100%;
  display: block;
}
</style>
