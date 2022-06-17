<template>
    <div class="task">
        <span>{{taskData.content}}</span>
    </div>
</template>

<script>
    export default {

        props: {
            taskData: {
                type: Object,
                default: {},
                // require: true
            },
        },
        data() {
            return {
            //
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>
