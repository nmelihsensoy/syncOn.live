<template>
    <div class="main">
        <section class="hero is-primary is-bold">
        <div class="hero-body">
            <div class="container">
            <h1 class="title">
                Watch Youtube with your friends together!
            </h1>
            <h2 class="subtitle">
                Youtube sync
            </h2>
            </div>
        </div>
        </section>
        <section class="main-buttons">
            <div class="container" v-show="!join">
                <div class="columns is-centered" >
                    <div class="column is-one-quarter">
                        <router-link :to="{ name: 'room', params: { id: roomId }}" ><a class="box has-text-centered">
                            Create Room
                        </a></router-link>
                    </div>
                    <div class="column is-one-quarter">
                        <a class="box has-text-centered" @click="join_room">
                            Join Room
                        </a>
                    </div>
                </div>
            </div>
            <div class="container" v-show="join">
                <div class="columns is-centered">
                    <div class="column is-half">
                        <div class="box">
                            <div class="field">
                                <label class="label">User Name</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="#123456">
                                </div>
                                </div>

                                <div class="field">
                                <label class="label">Room Code</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="">
                                </div>
                            </div>
                            <div class="field is-grouped is-grouped-right">
                                <p class="control">
                                    <router-link :to="{ name: 'room', params: { id: roomId }}"><a class="button is-primary">
                                    Submit
                                    </a></router-link>
                                </p>
                                <p class="control">
                                    <a class="button is-light" @click="join = false">
                                    Cancel
                                    </a>
                                </p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'home',
    data : function() {
        return{
            join : false,
            roomId : 31
        }
    },
    methods : {
        join_room : function(){
            this.join = true
        }
    }
}
</script>

<style>
    .main-buttons{
        padding-top: 50px;
    }

    .main{
        flex: 1;
    }
</style>
