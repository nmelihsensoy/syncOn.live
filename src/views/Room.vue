<template>
    <div class="room">
        <div class="container">
            <div class="columns">
                <div class="column">
                    <vue-plyr>
                        <div data-plyr-provider="youtube" data-plyr-embed-id="ka9pZuRAN3E"></div>
                    </vue-plyr>
                </div>
                <div class="column">
                    playlist
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
            test
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

</style>
