<style lang="less" src="./view.less"></style>
<template lang="html" src="./view.html"></template>

<script>
import {
    addTag,
    addContent,
    gather,
    getTags,
    findContentById,
    updateContent
} from "@/api/content";
import MarkdownEditor from "_c/markdown";
import GatherModal from "../gather/view.vue";

export default {
    data() {
        return {
            data: {},
            showSubmitModal: false,
            loading: true,
            currentTags: [],
            tags: [],
            edit: true,
            showGattherModal: false,
            currentTagsName: [],
            tag: ""
        };
    },
    methods: {
        async addContent(data) {
            await addContent(Object.assign(data, { tags: this.currentTags }));
        },
        async updateContent(data) {
            await updateContent(
                Object.assign(data, { tags: this.currentTags }),
                this.$route.query.id
            );
        },
        async findContentById() {
            let data = await findContentById(this.$route.query.id);
            data.statusId = !!data.statusId;

            this.data = data;
            this.data.tags.forEach(item => {
                this.currentTags.push(item._id);
                this.currentTagsName.push(item.name);
            });
        },
        async onOk() {
            if (!this.currentTags.length) {
                this.$Message.error("请选择文章类别!");
                this.loading = false;
                this.showSubmitModal = true;
            } else {
                let data = JSON.parse(JSON.stringify(this.data));
                data.statusId = Number(this.data.statusId);
                this.edit
                    ? await this.updateContent(data)
                    : await this.addContent(data);
                this.$Message.success(`${this.edit ? "保存" : "新增"}成功`);
                this.showSubmitModal = false;
                this.$router.back();
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
        onGatherSuccess(data) {
            this.data = data;
        },
        async addTag() {
            if (!this.tag) return;
            let data = await addTag({ name: this.tag });
            if (data) {
                let { _id: value, name: label } = data;
                setTimeout(async () => await getTags(), 1000);
                this.currentTags.push(value);
                this.tags.push({ value, label });
                this.$Message.success("tag新增成功");
                this.tag = "";
            }
        }
    },

    created() {
        this.edit = +this.$route.query.edit === 1;

        if (this.edit) {
            this.findContentById();
        }
        this.getTags();
    },
    components: {
        MarkdownEditor,
        GatherModal
    },
    mounted() {}
};
</script>

<style>
</style>
