<template>
  <div>
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sing Up</h1>
            <p class="text-xs-center">
              <router-link :to="{name: 'link'}">Have an account?</router-link>
            </p>
            <mcv-validation-errors
                v-if="validationErrors"
                :validation-errors="validationErrors"
            />
            <form @submit.prevent="onSubmit">
              <fieldset class="form-group">
                <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Username"
                    v-model="username"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Email"
                    v-model="email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                    type="password"
                    class="form-control form-control-lg"
                    placeholder="Password"
                    v-model="password"
                />
              </fieldset>
              <button
                  class="btn btn-lg btn-primary pull-xs-right"
                  :disabled="isSubmitting"
              >
                Sing Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import McvValidationErrors from "@/components/ValidationErrors";
import {actionTypes} from "@/store/modules/auth";

export default {
  name: "McvRegister",
  components: {
    McvValidationErrors,
  },
  data () {
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
  },
  methods: {
    onSubmit() {
      console.log("submitted form");
      this.$store.dispatch(actionTypes.register, {
        email: this.email,
        username: this.username,
        password: this.password
      }).then(user => {
        console.log('successfully register user', user)
        this.$router.push({name: 'globalFeed'})
      })
    },
  },
};
</script>

<style scoped>

</style>