<template>
    <v-container>
        <v-app-bar
            app
            hide-on-scroll
            color="#00695C"
        >
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        text
                        v-bind="attrs"
                        v-on="on"
                        class="text--white"
                    >
                        <span>Hi {{name}} </span>
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                </template>
                <v-list
                    dense
                >
                    <v-list-item
                        v-for="(item, index) in items"
                        :key="index"
                        @click="item.callback"
                    >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { LOGOUT } from '@/store/auth'
export default {
    name: 'AppBar',
    computed: {
        ...mapGetters(['currentUser']),

        name() {
            return this.currentUser.firstName + " " + this.currentUser.lastName;
        },

        items() {
            return [{
                title: 'Logout',
                callback: this.logout
            }]
        }
    },

    methods: {
        logout() {
            console.log("logout")
            this.$store.dispatch(LOGOUT).then(() => this.$router.push( { name: 'login'}))
        }
    }
}
</script>
