<style lang="less" src="./view.less"></style>
<template lang="html" src="./view.html"></template>

<script>
import { addContent, findContentById, updateContent } from "@/api/content";
import MarkdownEditor from "_c/markdown";

export default {
    data() {
        return {
            data: {},
            currentTagsName: []
        };
    },
    methods: {
        async findContentById() {
            this.data = await findContentById(this.$route.query.id);
            this.data.tags.forEach(item => {
                this.currentTagsName.push(item.name);
            });
        }
    },

    created() {},
    computed: {},
    components: {
        MarkdownEditor
    },
    mounted() {
        this.findContentById();
    }
};
</script>

<style>
</style>
