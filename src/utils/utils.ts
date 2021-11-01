import moment from "moment"
import { NextFunction, Response } from "express"
import { MysqlError } from "mysql"

type IResult<T> = {
  code: number;
  message?: string;
  data: T
}

// 响应处理
export const handleResponse = <T>(code: number, data: T, message?: string): IResult<T> => {
  return {
    code,
    data,
    message: message || undefined
  }
}

// 错误处理
export const handleError = (err: MysqlError | null, res: Response): void | Response => {
  if (err) {
    console.log('错误信息:', err.message)
    return res.json(handleResponse<string>(500, err.message))
  }
}

// 转换时间格式
export const handleFilterDate = (date: string, format: string = 'YYYY-MM-DD hh:mm:ss'): string => {
  return moment(date).format(format)
}

// 检测是否有传ID
export const checkId = (req: IIdBodyRequest, res: Response, next: NextFunction): void => {
  let { id } = req.query

  if (!id) {
    res.json(handleResponse<string>(500, '请输入ID!'))
  } else {
    next();
  }
};

// 搜索条件处理
interface IFuzzySearchQuery {
  [key: string]: string | undefined
}
interface IFuzzySearchResult {
  searchKeys: string;
  searchDatas: string[];
}
export const handleFuzzySearch = (query: IFuzzySearchQuery, sqlSelect: string[]): IFuzzySearchResult => {
  let searchKeys: string = ''
  const searchDatas: string[] = []
  sqlSelect && sqlSelect.forEach(item => {
    if (query[item]) {
      searchKeys += searchKeys.length === 0 ? `WHERE ${item} LIKE ?` : ` AND ${item} LIKE ?`
      searchDatas.push(`%${query[item]}%`)
    }
  })
  return { searchKeys, searchDatas }
}