<template>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" @click="$router.push({ name: 'home' })">
            <h3 class="title is-3">Youtube-Sync</h3>
            </a>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
            <router-link :to="{ name: 'home' }" class="navbar-item" exact>
                Home
            </router-link>

            <router-link :to="{ name: 'about' }" class="navbar-item">
                About
            </router-link>
            </div>

            <div v-if="this.$route.name === 'room'" class="navbar-start" style="flex-grow: 1; justify-content: center;">
                <div class="field has-addons navbar-item">
                    <div class="control">
                        <input class="input" type="text" placeholder="add video to queue">
                    </div>
                    <div class="control">
                        <a class="button is-dark">
                        Add
                        </a>
                    </div>
                </div>
            </div>

            <div v-if="this.$route.name !== 'room'" class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                    <a class="button is-primary">
                        <strong>Create Room</strong>
                    </a>
                    <a class="button is-link">
                        <strong>Join Room</strong>
                    </a>
                    </div>
                </div>
            </div>
            <div v-if="this.$route.name === 'room'" class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                    <a class="button is-info">
                        <strong>Invite Friend</strong>
                    </a>
                    <a class="button is-danger">
                        <strong>Close Room</strong>
                    </a>
                    </div>
                </div>
            </div>
        </div>
        </nav>
</template>

<script>
export default {
    name : 'NavBar',
    methods : {
        isActive: function () {
            return 'is-active';
        }
    }
}
//<router-link to="/">
</script>

<style>
    .navbar{
        border-top: 1px solid #00D1B2;
    }
</style>
