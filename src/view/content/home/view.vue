<style lang="less" src="./view.less"></style>
<template lang="html" src="./view.html"></template>

<script>
import { getContent, getTags, delContent } from "@/api/content";

export default {
    data() {
        return {
            tabCol: [
                {
                    type: "selection",
                    width: 60,
                    align: "center"
                },
                {
                    title: "标题",
                    slot: "title"
                },
                {
                    title: "描述",
                    key: "description"
                },
                {
                    title: "内容",
                    slot: "content"
                },
                {
                    title: "分类",
                    slot: "tags"
                },
                {
                    title: "创建时间",
                    slot: "create_date"
                },
                {
                    title: "更新时间",
                    slot: "update_date"
                },
                {
                    width: 200,
                    title: "操作",
                    slot: "ctrl",
                    align: "right"
                }
            ],
            currentTag: null,
            pageIndex: 1,
            pageSize: 20,
            data: [],
            tags: [],
            total: 0,
            keyword: "",
            currentDelContentId: null
        };
    },
    methods: {
        async getContent(reload = true) {
            if (reload) this.pageIndex = 1;
            let data = await getContent({
                page_index: this.pageIndex,
                page_size: this.pageSize,
                q: this.keyword,
                tag_id: this.currentTag
            });
            data.list.forEach(item => {
                item.tagNames = item.tags.map(item => item.name).join("、");
            });
            this.data = data.list;
            this.total = data.count;
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
        tagChange(val) {
            this.getContent();
        },
        pageChange(idx) {
            this.pageIndex = idx;
            this.getContent(false);
        },
        onPageSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.getContent();
        },
        searchChange() {
            this.getContent();
        },
        // 删除文章
        delContent(item) {
            this.$Modal.confirm({
                title: "提示",
                content: `你确定要删除《${item.title}》?`,
                onOk: async () => {
                    await delContent(item._id);
                    this.$Message.success("删除成功");
                    this.getContent();
                }
            });
        },
        editContent(id) {
            this.$router.push({ name: "content_edit", query: { id } });
        },
        viewContent(id) {
            this.$router.push({ name: "content_read", query: { id } });
        },
        addContent() {
            this.$router.push({ name: "content_create" });
        }
    },
    created() {
        this.getContent();
        this.getTags();
    }
};
</script>

<style>
</style>
