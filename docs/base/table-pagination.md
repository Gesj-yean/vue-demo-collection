# 表格-分页器组件封装

待完善。。。

## TablePagination.vue
```js
<script>
/* eslint-disable */

export default {
  name: 'tablePagination',
  props: {
    query: {
      type: Object,
      default: () => ({})
    },
    tableOption: {
      type: Object,
      default: () => ({})
    },
    pageSizes: {
      type: Array,
      default: () => [100, 200, 300, 400]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 15,
      total: 0,
      tableData: [{
        meeting_topic: 'aaa',
        meeting_number_str: 'bbb',
        meeting_start_time_date: 'ccc',
        computer_name: 'ddd'
      }]
    }
  },
  render() {
    const {tableOption, tableData, $attrs} = this
    const {currentPage, pageSizes, pageSize, total, layout } = this
    const {handleSizeChange, handleCurrentChange} = this

    // todo: table column support render and component
    
    return (
      <div>
        <zm-table
          {...{props:$attrs}}
          data={tableData}
          style="width: 100%">
          { tableOption.column.map(item => (
            <zm-table-column {...{props:item}}></zm-table-column>
          )) }
        </zm-table>
        <zm-pagination
          class="pagenation-wrapper"
          size-change={handleSizeChange}
          current-change={handleCurrentChange}
          current-page={currentPage}
          page-sizes={pageSizes}
          page-size={pageSize}
          layout={layout}
          total={total}>
        </zm-pagination>
      </div>
    )
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>

<style lang="scss" scoped>
.pagenation-wrapper {
  margin-top: 32px;
}
</style>
```

## table.js
```js
/**
 * @file The summary of table configs
 */

/* eslint-disable */
export const localRecordingTableOption = vm => ({
  column: [
    {
      type: "selection"
    },
    {
      fixed: 'left',
      prop: "meeting_topic",
      label: "topic",
      'min-width': 150,
    },
    {
      prop: "meeting_number_str",
      label: "ID",
      'min-width': 150
    },
    {
      prop: "meeting_start_time_date",
      label: "Start Time",
      'min-width': 150
    },
    {
      prop: "computer_name",
      label: "Computer Name",
      'min-width': 150
    },
    {
      prop: "location",
      label: "Location",
      'min-width': 150
    },
    {
      fixed: "right",
      'min-width': 150,
      render: (h, scope) => {
        return '1111'
      }
    }
  ],
})
```

## Usage

```html
<TablePagination :tableOption="localRecordingTableOption"></TablePagination>
```