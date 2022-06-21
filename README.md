

## Rita Components of React


### ✨ 特性：

- 📦 开箱即用的 React 组件。
- 🔒 基于 typescript 开发，提供完整的类型定义文件。
- 🎪 提炼自企业级产品的交互语言和设计风格。
- ⚡ 小巧而精干的设计体系。


🚀 启动更快：采用 vite 替换 webpack cli，项目启动速度提升十倍。

🚀 打包更快：采用 rollup 打包，打包速度更快，出产体积更小。

🚀 依赖安装快更：采用 pnpm 替换 npm 进行包管理，依赖安装速度更快。

### 安装

#### 使用 npm 安装

`npm install rita-components --save`

#### 示例

```javascript
import { KDivider } from "rita-components"

ReactDOM.render(<KDivider />, mountNode)
```

##### 引入样式文件

```javasctipt
import 'rita-components/dist/index.css'
```

### 按需加载

默认支持 `tree shaking`
