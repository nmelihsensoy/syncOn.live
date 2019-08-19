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

export default {
    name: 'room',
    data : function() {
        return{
            roomId : this.$route.params.id
        }
    }
}
</script>

<style>

</style>
