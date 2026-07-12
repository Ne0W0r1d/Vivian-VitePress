export interface LinkList {
    // 标题
    title: string
    // 描述
    desc: string
    // 列表
    list: Link[]
}

export interface Link {
    // 站点名称
    name: string
    // 站点链接
    link: string
    // 头像/站点logo
    avatar: string
    // 站点描述
    descr: string
    // 站点缩略图
    siteshot?: string
}
