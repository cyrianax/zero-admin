<style lang="less" src="./view.less"></style>
<template lang="html" src="./view.html"></template>

<script>
import { gather } from "@/api/content";
import MarkdownEditor from "_c/markdown";

export default {
    props: {
        value: Boolean
    },
    data() {
        return {
            loading: true,
            url: ""
        };
    },
    methods: {
        async onOk() {
            let data = await gather({ url: this.url });
            this.visibleChange((this.loading = false));
            this.$Message.success("采集成功");
            this.$emit("on-gather-success", {
                title: data.title,
                content: data.md
            });
            this.loading = true;
        },
        visibleChange(val) {
            this.$emit("input", val);
        }
    },
    created() {},
    computed: {},
    components: {},
    mounted() {}
};
</script>

<style>
</style>
