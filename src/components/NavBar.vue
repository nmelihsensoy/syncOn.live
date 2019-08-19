<template>
    <b-navbar type="is-light is-spaced">
        <template slot="brand">
            <b-navbar-item href="/">
                <h1>Youtube Sync</h1>
            </b-navbar-item>
        </template>
        <template slot="end">
            <router-link to="/"><b-navbar-item>
                Home
            </b-navbar-item></router-link>
            <router-link to="/about"><b-navbar-item>
                About
            </b-navbar-item></router-link>
        </template>
    </b-navbar>
</template>

<script>
export default {
    
}
</script>

<style>

</style>
