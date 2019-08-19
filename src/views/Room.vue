<template>
<div class="main">
    <NavBar @urlSended = "urlSended"></NavBar>
    <div class="room">
        <div class="container">
            <div class="columns">
                <div class="column is-three-fifths">
                    <vue-plyr ref="plyr">
                        <div class="plyr__video-embed">
                            <iframe
                            src="https://www.youtube.com/embed/bTqVqk7FSmY?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1"
                            allowfullscreen allowtransparency >
                            </iframe>
                        </div>
                        </vue-plyr>
                </div>
                <div class="column">
                    <nav class="panel">
                        <p class="panel-heading">
                            Playlist
                        </p>
                        <div class="panel-main-scroll">
                            <a class="panel-block is-active">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-64x64">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-5">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>
                            </a>
                            <a v-for="(video, index) in videoList" v-bind:key="index" class="panel-block">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-5">{{ video }}</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="panel-block custom1">
                            <button class="button is-link is-outlined">
                            clear playlist
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>   
</div>
</template>

<script>
import io from "socket.io-client";
import NavBar from '../components/NavBar';

export default {
    name: 'room',
    components:{
        NavBar
    },
    data : function() {
        return{
            roomId : this.$route.params.id,
            socket : {},
            videoList : [],
            test : null,
            videoUrl : ''
        }
    },
    methods : {
        urlSended : function(data){
            this.videoList.push(data);
            /*
            this.player.source = {
                type: 'video',
                sources: [
                    {
                        src: data,
                        provider: 'youtube',
                    },
                ],
            };
            */
        }
    },
    created (){ 
        this.socket = io("http://192.168.0.31:3000")
    },
    mounted(){
        this.socket.on("test", data => {
            test = data
        });
    },
    computed: {
        player () { return this.$refs.plyr.player }
    }
}
</script>

<style>
    .room{
        width: 960px;
        margin: 40px auto;
    }

    .panel-main-scroll{
        max-height: 250px;
        overflow: auto;
    }

    .users{
        margin-bottom: 20px;
    }

    .custom1{
        border-top: 1px solid #000;
    }
</style>
