<template>
    <div>
        <div class="list">
            <div
                v-for="(language, index) in languages"
                :key="index"
                @click="language.selected = !language.selected"
            >
                <span :class="{selected: language.selected}">{{language.name}}</span>
            </div>
        </div>
        <div>
            <div>hiện ở con: {{dataShareChild}}</div>
            <button v-on:click="updateMessage">
                CLICK ĐỂ TRUYỀN LÊN CHA
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            dataShareChild: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                languages: [
                    { name: 'PHP', selected: false},
                    { name: 'HTML', selected: false},
                    { name: 'CSS', selected: false},
                    { name: 'NOTE', selected: false},
                    { name: 'VUE', selected: false}
                ],
            }
        },
        methods: {
            updateMessage: function () {
                this.$emit("dataShareUpdate", 'Đây là data ở con => Truyên lên cho cha nó');
            },
        }
    };
</script>

<style lang="scss" scoped>
    .list {
        span{
            display: inline-block;
            border: 1px solid #ebebeb;
            padding: 4px 15px;
            margin-right: 5px;
            border-right: 4px;
        }
        .selected {
            background-color: aqua;
        }
    }
</style>
