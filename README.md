## Web前端 1 + X

> 本次课是以 Nodejs 为基础的前端项目课程。

### 一、认识 Nodejs

Node.js® 是一个基于 [Chrome V8 引擎](https://v8.dev/) 的 JavaScript 运行时。

#### 1.1 宿主环境

以网景的 Netscape Navigator 内置的JavaScript 1.1为蓝本，由ECMA-262定义的 ECMAScript 是一种脚本语言标准，它对该脚本语言的语法、类型、语句、操作符等做出明确规定。

Javascript 是由 ECMAScript、DOM、BOM 三部分组成，浏览器实现了 ECMAScript 标准，使其能够运行于浏览器，我们称浏览器为 ECMAScript 的宿主环境。

除了可以运行于浏览器环境外，ECMAScript 还可以运行于 Adobe Flash 环境中（称为Action Script），这时 Adobe Flash 也是 ECMAScript 的宿主环境。

我们即将学习的Nodejs就是另一种可以运行 ECMAScript 的宿主环境。

#### 1.2 安装

Nodejs 开源且跨平台，在 Windows 平台，Nodejs 就是一个以 `.msi` 结尾的安装程序，分为 [32位](https://nodejs.org/dist/v12.18.3/node-v12.18.3-x86.msi) 和 [64位](https://nodejs.org/dist/v12.18.3/node-v12.18.3-x64.msi) 两个版本，双击运行根据引导程序完成安装即可。

打开 cmd 或 powershell 执行如下命令，如出现版本则为安装成功。

```bash
$ node -v;
$ npm -v;
```

#### 1.3 体验

Nodejs 程序是以 `.js` 结尾的文件，创建 `demo.js`

```javascript
let x = 10;
let y = 5;

console.log(x + y);
```

打开 cmd 或 powershell 命令行工具，执行 `demo.js`

```bash
$ node path/demo.js
```

注：Nodejs 和 JavaScript 都是基于 ECMAScript 语言规范的，二者的语法具有一致性，显著的区别是 Nodejs 中并没有 DOM 和 BOM，因此无法使用 window 或 document 相关语法。

```bash
# 语法错误
$ alert('Hello Nodejs!'); 
$ document.write('你好，世界!');
```

### 二、模块

Nodejs 在 ECMAScript 的基础上扩展并封装了许多高级特性，如文件访问、网络访问等，使得 Nodejs 成为一个很好的 Web 开发平台。

基于 Nodejs 这个平台将 Web 开发常用的一些功能进行封装，称为模块。

#### 2.1 系统模块

在安装 Nodejs 时一些模块自动被安装，这些模块大多由 Nodejs 官方维护，称这类模块为系统（核心）模块，如fs、path、os、http 等。

```javascript
// os.js
const os = require('os');
// 查看操作系统信息
console.log(os.cpus());
console.log(os.userInfo());
```

```javascript
// fs.js
const fs = require('fs');
// 文件操作
fs.writeFile('./demo.html', '<h1>hello world!</h1>', (err) => {
  // console.log(err);
  if(!err) {
	// console.log('创建成功！');
  }
});
```

`require` 是 Nodejs 提供的导入模块的函数，它的作用相当于浏览器 `<script>` 标签。

#### 2.2 用户模块

用户模块是相对于系统模块而言的，由开发者根据逻辑需要自行封装完成，以单个或多个独立文件构成，Nodejs 中的模块大多以 `.js` 或 `.json` 文件形式存在。

以 `.js` 形式存在的模块：

```javascript
// m1.js
function sayHi() {
  console.log('Hi~');
}

function walk() {
  console.log('两条腿走路...');
}
```

以 `.json` 形式存的模块：

```json
{
  "name": "小明",
  "age": 18,
  "gender": "男"
}
```

#### 2.3 第三方模块

Nodejs 有着庞大的社区支持，全世界优秀的开发人员封装了大量实用的模块，托管在[开源平台](https://www.npmjs.com/)上供大家随意下载使用。

为了方便大家上传、下载开源模块，社区还开发专门的工具 `npm`，该工具随着 Nodejs 一起被安装了。

1. 本地安装

```bash
$ npm install lodash
```

执行上述命令后，将会在 npmjs.org 平台下载 `loadash` 模块，然后在执行命令所在的目录创建 `node_modules` 目录，`lodash` 模块会被下载到 `node_modules` 目录中。

2. 全局安装

```bash
$ npm install http-server -g
```

执行上述命令后，将会在 npmjs.org 平台下载 `http-server` 模块，然后`http-server` 模块默认会被下载到 C 盘的 `node_modules` 目录中。

注：执行 `npm config list` 可查看全局安装的默认目录。

3.  本地卸载

```bash
$ npm uninstall lodash
```

执行上述命令后会将本地安装的模块从 `node_modules` 目录中删除。

4. 全局卸载

```bash
$ npm uninstall http-server -g
```

执行上述命令后会将全局安装的模块从 `node_modules` 目录中删除。

#### 2.4 加载机制

在 Nodejs 中导入或加载不同类型的模块时需要了解 Nodejs 模块的加载机制：

1. 模块路径不以 `./` 、`../` 或盘符开头时，先去查找【系统模块】，再去执行命令所在目录中的 `node_modules` 中查找，然后依次向父级目录中的 `node_modules` 中查找。

```javascript
const http = require('http'); // 系统模块能找到
// 系统模块找不到，然后去 node_modules 中查找
const path = require('my/module');
```

2. 以 `./`、`../` 开头的相对路径或以盘符开头的绝对路径查找模块，可以省文件后缀。

```javascript
// 参照当前文件去查找 user.js 模块
const user = require('./user');
// 如果上一级 cart.js 存在，则查找 cart.js 模块
// 否则查找上一级 cart 目录
const cart = require('../cart');
```

注：安装/卸载模块时也要注意目录结构关系，如果当前目录没有 `node_modules` 会递归查找父级目录中有没有 `node_modules` 。

#### 2.5 描述文件

若干模块组合起来放在统一目录中时推荐创建 `package.json` 文件，该文件中记录模块的名称、版本、依赖等信息，`package.json` 文件即可以手动创建，也能通过命令快速创建。

```bash
$ npm init
# 或
$ npm init -y
```

1. `name` 标记模块的名称，名称中不允许包含大写字母
2. `version` 标记模块的版本号

3. `main` 模块入口，默认为 `index.js`
4. `script` 自定义脚本命令，以 `npm run 命令名称` 形式调用，`npm run start` 时，可以省略 `run`
5. `dependencies` 记录所有被依赖的模块，安装模块时添加 `--save` 或 `-S` 模块会被记录在 `package.json` 中

```bash
$ npm install lodash --save
$ npm install mime -S
```

6. `devDependencies` 记录开发阶段所有被依赖的模块，安装模块时添加 `--save-dev` 或 `-D`

```bash
$ npm install gulp --save-dev
$ npm install gulp-less -D
```

### 三、HTTP服务



#### 3.1 创建服务



#### 3.2 请求和响应



#### 3.3 静态资源



#### 3.4 路由



#### 3.5 模板引擎



### 四、Express



#### 4.1 安装和启动



#### 4.2 路由



#### 4.3 请求和响应



#### 4.4 静态资源



#### 4.5 模板引擎



#### 4.6 中间件



### 五、MySQL