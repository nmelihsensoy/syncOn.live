<template>
    <div class="room">
        <div class="container">
            <div class="columns">
                <div class="column is-three-fifths">
                    <vue-plyr>
                        <div data-plyr-provider="youtube" data-plyr-embed-id="ka9pZuRAN3E"></div>
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
                            <a class="panel-block">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-5">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>
                            </a>
                            <a class="panel-block">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-5">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>
                            </a>
                            <a class="panel-block">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-5">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>
                            </a>
                            <a class="panel-block">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-5">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>
                            </a>
                            <a class="panel-block">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-5">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>
                            </a>
                            <a class="panel-block">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-5">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>
                            </a>
                            <a class="panel-block">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-5">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>
                            </a>
                            <a class="panel-block">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-5">John Smith</p>
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
</template>

<script>
import io from "socket.io-client";

export default {
    name: 'room',
    data : function() {
        return{
            roomId : thiss.$route.params.id,
            socket : {},
            dropdown : 'is-active'
        }
    },
    created (){ 
        this.socket = io("http://192.168.0.31:3000")
    },
    mounted(){
        this.socket.on("test", data => {
            test = data
        });
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
