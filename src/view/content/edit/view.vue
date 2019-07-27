<style lang="less" src="./view.less"></style>
<template lang="html" src="./view.html"></template>

<script>
import { addContent, findContentById, updateContent } from "@/api/content";
import MarkdownEditor from "_c/markdown";

export default {
    data() {
        return {
            data: {},
            editor: null
        };
    },
    methods: {
        async findContentById() {
            this.data = await findContentById(this.$route.query.id);
        }
    },

    created() {
        console.log(this.$route);
    },
    computed: {
        markdownOptions() {
            return {};
        }
    },
    components: {
        MarkdownEditor
    },
    mounted() {
        this.editor = this.$refs.markdown.editor;
        this.findContentById();
    }
};
</script>

<style>
</style>
