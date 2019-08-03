<template>
    <mavon-editor
        :value="value"
        @input="inputChange"
        defaultOpen="preview"
        :subfield="edit"
        :toolbarsFlag="edit"
        :boxShadow="false"
    ></mavon-editor>
</template>

<script>
import { mavonEditor } from "mavon-editor";
require("mavon-editor/dist/css/index.css");
export default {
    name: "MarkdownEditor",
    props: {
        value: {
            type: String,
            default: ""
        },
        options: {
            type: Object,
            default: () => {
                return {};
            }
        },
        edit: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            editor: null
        };
    },
    methods: {
        inputChange(val) {
            this.$emit("input", val);
        }
    },
    mounted() {},
    components: {
        mavonEditor
    },
    watch: {
        value: {
            handler() {}
        }
    }
};
</script>

<style lang="less">
.markdown-body {
    height: 100%;
    z-index: 99 !important;
}
</style>
