<style lang="less" src="./view.less"></style>
<template lang="html" src="./view.html"></template>

<script>
import { addContent, gather, getTags } from "@/api/content";
import MarkdownEditor from "_c/markdown";
import GatherModal from "../gather/view.vue";

export default {
    data() {
        return {
            data: {},
            editor: null,
            showGattherModal: false,
            showSubmitModal: false,
            loading: true,
            currentTags: [],
            tags: []
        };
    },
    methods: {
        async addContent(data) {
            await addContent(Object.assign(data, { tags: this.currentTags }));
        },
        onGatherSuccess(data) {
            this.data = data;
            this.titleChange();
        },
        titleChange() {
            window.localStorage.markdownContentTitle = this.data.title;
        },
        async onOk() {
            if (!this.currentTags.length) {
                this.$Message.error("请选择文章类别!");
                this.loading = false;
                this.showSubmitModal = true;
            } else {
                await this.addContent(this.data);
                this.$Message.success("新增成功");
                this.showSubmitModal = false;
            }
            setTimeout(() => (this.loading = true), 0);
        },
        async getTags() {
            let data = await getTags();

            this.tags = data.map(item => {
                return {
                    value: item._id,
                    label: item.name
                };
            });
        },
        currentTagsChange() {
            console.log(this.currentTags);
        }
    },

    created() {
        this.data.title = window.localStorage.markdownContentTitle || "";
        this.getTags();
    },
    computed: {
        markdownOptions() {
            return { status: false };
        }
    },
    components: {
        MarkdownEditor,
        GatherModal
    },
    mounted() {
        this.editor = this.$refs.markdown.editor;
        this.editor.toggleFullScreen();
        this.editor.toggleSideBySide();
    }
};
</script>

<style>
</style>
