<style lang="less" src="./view.less"></style>
<template lang="html" src="./view.html"></template>

<script>
import { getContent, getTags } from "@/api/content";

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
          key: "title"
        },
        {
          title: "描述",
          key: "description"
        },
        {
          title: "内容",
          key: "content"
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
          slot: "ctrl"
        }
      ],
      currentTag: null,
      pageIndex: 1,
      pageSize: 20,
      data: [],
      tags: [],
      total: 0,
      keyword: ""
    };
  },
  methods: {
    async getContent() {
      let data = await getContent({
        page_index: this.pageIndex,
        page_size: this.pageSize,
		q: this.keyword,
		tag_id: this.currentTag
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
      this.getContent();
    },
    onPageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getContent();
    },
    searchChange() {
      this.getContent();
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
