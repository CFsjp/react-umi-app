import { useRef, useState, useMemo, useEffect } from 'react'
import { debounce } from 'utils'

/**
 * @description table 数据更新 hooks
 * @param api 请求api
 * @returns [tableData, onPageChange, onQueryChange]
 */
 export default function useTableRequset(api) {
  /* 是否是第一次请求 */
  const fisrtRequest = useRef(true)
  /* 保存分页信息 */
  const [pageOptions, setPageOptions] = useState({
    totalElements: 0,
    pageSize: 10,
    number: 1
  })
  const [query, setQuery] = useState({})
  /* 保存表格数据 */
  const [tableData, setTableData] = useState({
    content: [],
    totalElements: 0,
    pageSize: 10,
    number: 1
  })

  /* 请求数据 ,数据处理逻辑根后端协调着来 */
  const getList = useMemo(() => {
    return async payload => {
      if (!api) return
      payload.pageNum = payload.number || 1
      const data = await api(payload || { ...query, ...pageOptions })
      if (data.code === 200) {
        setTableData(data.data)
        fisrtRequest.current = false
      } 
    }
  }, [api, pageOptions, query])

  const onPageChange = useMemo(() => (options) => setPageOptions({ ...options }), [])

  const onQueryChange = useMemo(() => debounce((options) => setQuery({ ...options }), 500), [])

  useEffect(() => {
    if (fisrtRequest.current) { 
      getList({ ...query, ...pageOptions })
    }
  }, [getList, pageOptions, query])

  /* 改变分页，重新请求数据 */
  useEffect(() => {
    if (!fisrtRequest.current) { 
      getList({ ...query, ...pageOptions })
    }
  }, [getList, pageOptions, query])

  /* 改变查询条件。重新请求数据 */
  useEffect(() => {
    if (!fisrtRequest.current) { 
      getList({ ...query, ...pageOptions, pageNum: 1 })
    }
  }, [getList, pageOptions, query])
  /* 处理分页逻辑 */

  return [tableData, onPageChange, onQueryChange]
}
