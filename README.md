# RPA

[TOC]

React 集成开发环境。

> 参考资料：
>
> - Umi [Umi](https://umijs.org/zh-CN/docs/getting-started)
> - React [react](https://react.docschina.org)
> - Dva [Dva](https://dvajs.com)

## 目录结构说明

```
RPA
  - config - 公共配置文件
  - .husky - git commit 提交校验
  - mock - mock数据
  - .umirc.ts - umi配置文件

  - src - 主业务代码目录
    - api - 公共数据的请求方法
    - assets - 共用的静态资源
    - components - 共用的组件
    - json - 地图等公用json文件
    - layouts - 公共页面
    - model - 状态管理库
    - pages - 页面代码目录
      - creator - creator页面
      - overview - 总览页面
      - plan - 计划模块
      - procedure - 流程模块
      - task - 任务模块
      - user - 用户模块
    - styles - 全局的样式配置
    - utils - 工具函数存放目录
```

## 注意事项

- **所有业务功能都放在对应的模块文件夹下**

### 规范

**为了保护项目的可维护性，可扩展性以及高效的编码，编写方式务必保持一致。**

> 以下规则不包含所有的规则，例如一些默认规则。

#### 单一职责

对所有的组件，指令，过滤器，接口请求方法等应用**单一职责原则(SRP)**。

- 坚持每个组件或者模块只做一件事。
- 坚持把文件大小限制在 400 行以内。
- 坚持定义小函数，考虑在 75 行以内。

#### 文件命名

保持不同类型的文件命名风格一致。

- 组件名使用多个单词，例如组件名带上该模块的前缀。
- 在描述性名字中，用横杠来分割单词。
- 尽量使用功能的特性去命名。

#### 代码编写

##### JS

- 坚持使用大写驼峰来命名类。
- 坚持使用 const 声明变量。
- 坚持使用小写驼峰来命名属性与方法。
- 坚持将自定义的模块导入与第三方的模块导入中间空一行。
- 坚持在非头部的注释上面增加一行空行。

##### CSS

- 坚持使用类名去命名样式。
- 坚持使用公共的样式类，避免重复的样式属性。
- 坚持在每个组件使用一个容器类包含所有的子类。
- 坚持在父子组件之间不发生样式类名的重复。

> 建议 [BEM 命名规范](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83)：理论上讲，每行 css 代码都只有一个选择器。

##### HTML

- 坚持考虑尽可能的扁平化布局。
- 坚持使用语义化的标签，而不是为了该标签的样式。
- 坚持将带计算逻辑的模版变量转换为 `computed` 或者 通用的 `filters`。
- 避免使用内联样式。

#### 代码提交

- 坚持在提交代码前校验代码，解决每一个警告。
- 坚持一次 commit 只进行一个功能的更改。
- 坚持使用 `type(subtype): description` 形式提交 commit，`type` 如下：
  - `feat` 新增的功能
  - `chore` 构建过程或辅助工具的变动
  - `refactor` 重构（即不是新增功能，也不是修改 bug 的代码变动）
  - `style` 修改格式，不影响逻辑
  - `fix` 修复问题
  - `revert` 回滚
  - `docs` 编写文档
  - `test` 测试类

## 开始

- `yarn` 安装依赖
- `yarn start` 开启本地服务器
- `yarn build` 打包
- `yarn lint-staged` 运行代码规范校验
