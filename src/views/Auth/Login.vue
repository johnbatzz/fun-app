<template>
  <v-row>
    <!-- Welcome UI -->
    <v-col
      md="7"
      class="welcome-ui d-none d-md-flex"
    >
      <h1>Welcome To Anime Fun App</h1>
    </v-col>
    <!-- Login UI -->
    <v-col 
      md="5"
      sm="12"
      xs="12"
      class="login-ui"
    >
      <form>
        <h2 class="d-xs-flex d-sm-flex d-md-none mb-10">
          Welcome To Anime Fun App
        </h2>
        <h3>Please Login</h3>
        <br>
        <v-col>
          <v-text-field
            v-model="username"
            label="Username"
            outlined
            :rules="[isValid(false)]"
            prepend-inner-icon="mdi-account"
            full-width
            :error-messages="''"
            @keyup.enter.native="login"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="password"
            label="Password"
            outlined
            :rules="[isValid(true)]"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            @keyup.enter.native="login"
          />
        </v-col>
        <v-col>
          <v-btn 
            color="#00695C"
            class="text--white"
            :disabled="isDisabled"
            width="100%"
            height="50"
            @click="login"
          >
            Login
          </v-btn>
        </v-col>
      </form>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex"
import { LOGIN, LOGOUT } from '@/store/auth'
export default {
    name: 'Login',

    data() {
        return {
            show: false,
            username: '',
            password: '',
            isInvalid: false,
            logo: '../../assets/logo.png',
        }
    },

    computed: {
        ...mapGetters(['isAuthenticated']),

        isDisabled() {
            return this.username === '' || this.password === ''
        }
    },

    methods: {
        async login() {
            let params = {
                username: this.username,
                password: this.password
            }
            // purge all the tokens before login
            this.$store.dispatch(LOGOUT);
            await this.$store.dispatch(LOGIN, params);
             if (this.isAuthenticated) {
                 this.$router.push({ name: "home" })
             } else {
                 this.isInvalid = true;
             }
        },

        isValid(hasMsg) {
			return this.isInvalid ?  hasMsg ? "Incorrect username and password." : " " : ""
		},
    }
}
</script>