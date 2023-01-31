export const _RES = (res :{
  success ?: number,
  message ?: string,
  data ?: any
}) => {
  const {
    success,
    message,
    data,
  } = res;
  return {
    success: success==undefined ? 1 : success,
    message: message || 'success',
    data:data || {},
  };
};

export function _PAGINATION<T>(data: { list: T[]; pageSize: number; total: number; current: number; }) {
  const {
    list,
    pageSize,
    total,
    current,
  }  = data;
  return {
    list,
    pageSize,
    total,
    totalPage: Math.ceil(total / pageSize),
    current
  };
}

