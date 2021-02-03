[[_TOC_]]

# 前言

本手册分为什么是RESTful、设计流程、URI规范、Action操作规范、参数规范、状态码规范、响应规范、签名算法八大部分，根据约束力强弱，规约依次分为强制、推荐、参考三大类：

- <font color=red>【强制】</font>必须遵守，违反本约定或将会引起严重的后果；
- <font color=#ffc20e>【推荐】</font>尽量遵守，长期遵守有助于系统稳定性和合作效率的提升；
- <font color=#375830>【参考】</font>充分理解，技术意识的引导，是个人学习、团队沟通、项目合作的方向。

对于规约条目的延伸信息中，“<font color=#80752c>说明</font>”对内容做了适当扩展和解释；“<font color=green>正例：</font>”提倡什么样的编码和实现方式；“<font color=#d71345>反例：</font>”说明需要提防的雷区，以及错误案例。

# 什么是RESTful

REST（Representational State Transfer）是一种轻量级的Web Service架构风格,可以翻译成“表述性状态转移”，实现和操作明显比SOAP和XML-RPC更为简洁，可以完全通过HTTP协议实现，还可以利用缓存Cache来提高响应速度，性能、效率和易用性上都优于SOAP协议.

通俗来讲就是：资源在网络中以某种表现形式进行状态转移，RESTful即这种设计的风格

用一句话概述即：URL定位资源，用HTTP动词描述操作

REST架构遵循了CRUD原则，CRUD原则对于资源只需要四种行为就可以完成对其操作和处理：

- GET (SELECT): 从服务器取出资源（一项或多项）
- POST (CREATE): 在服务器新建一个资源
- PUT (UPDATE): 在服务器更新完整的资源（客户端提供改变后的完整资源）
- PATCH (UPDATE)：在服务器更新资源(客户端提供改变的属性)
- DELETE (DELETE): 从服务器删除资源

REST把HTTP对一个URL资源的操作限制在GET、POST、PUT和DELETE这四个之内。这种针对网络应用的设计和开发方式，可以降低开发的复杂性，提高系统的可伸缩性.

更多REST API背景知识可以参考这篇 [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)

分URI规范，Action操作规范，参数规范，状态码规范

# 设计流程

1. 确定一个API提供什么类型的资源
2. 确定资源之间的依赖关系
3. 基于类型和依赖关系确定资源的命名
4. 确定资源的结构
5. 为资源添加最少的方法

# URI 规范

1.<font color=red>【强制】</font>已确定/发布的接口禁止修改请求方法/URI/参数名/返回值结构/内容，禁止删除接口/参数/返回值中的属性。

<font color=#80752c>说明：</font>

> 如有上述变更，请新启用一个接口
> 允许新增参数，但该参数不能为必填，如必填需提供缺省值兼容旧的调用

2.<font color=red>【强制】</font>URI 中只允许用小写字母，不用大写。
<font color=green>正例：</font>

```
https://example.com/api/gaoshou/v1/users
https://example.com/api/gaoshou/v1/mails:
```

<font color=#d71345>反例：</font>

```
https://example.com/api/GaoShou/V1/Users
https://example.com/api/gaoshou/V1/Mails
```

3.<font color=red>【强制】</font>URI 中用中杠 - 分割单词不用下划杠 _ 

<font color=green>正例：</font>

```
https://example.com/api/gaoshou/v1/user-mails
```

<font color=#d71345>反例：</font>

```
https://example.com/api/gaoshou/v1/user_mails
```

4.<font color=red>【强制】</font>URI 不能以"/"结尾。

<font color=green>正例：</font>

```
/gaoshou/v1/users
```

<font color=#d71345>反例：</font>

```
/gaoshou/v1/users/
```

5.<font color=red>【强制】</font>URI 中不能包含空格。

6.<font color=red>【强制】</font>URI 不能以文件后缀结尾。

7.<font color=#ffc20e>【推荐】</font>将 API 的版本号放入 URI 中, 由于一个项目多个 APP 或微服务所以使用以下风格, 将版本号放到 APP 后面

```
https://example.com/api/:app:/:version:/:resource:
```

<font color=green>正例：</font>

```
https://example.com/api/gaoshou/v1/users
https://example.com/api/assets/v1/assets/1
```

8.<font color=red>【强制】</font>每个 URI 代表一种资源，所以不能有动词，只能有名词（特殊情况可以使用动词），而且所用的名词往往与数据库的表格名对应，名词必须是清晰简洁的英文单词，不允许用拼音替代。

<font color=green>正例：</font>

```
/gaoshou/v1/users
```

<font color=#d71345>反例：</font>

```
/gaoshou/v1/get-users
```

9.<font color=#ffc20e>【推荐】</font>一般来说, 数据库中的表都是同种记录的"集合"(Collection), 所以 API 中的名词也应该使用复数（如果没有复数形式，应使用单数）。举例来说数据库中的 Users 列表, Courses 列表。

<font color=green>正例：</font>

```
/gaoshou/v1/users
/assets/v1/assets/1
```

10.<font color=#ffc20e>【推荐】</font>避免使用笼统的表示，例如objects、values、types

11.<font color=#ffc20e>【推荐】</font>URI 中的可变部分, 一般用来传递该 API 操作的核心实体对象的唯一ID。如果没有唯一ID的单一对象则以单数单词作为对象ID。

<font color=green>正例：</font>

```
/assets/1 [GET, PUT, DELETE]
/materials/wood [GET, PUT, DELETE]
```

12.<font color=red>【强制】</font>URI 中指定5个以内资源对象的操作id可以在URI路径上用逗号,分割。更多则以batch结尾，相关参数在请求体中。

<font color=green>正例：</font>

```
/assets/1,2,3 [GET, PUT, DELETE] //id为1，2，3的资源
/assets/batch [POST, PUT]
```

13.<font color=#375830>【参考】</font>避免层级过深的 URI。在 URI 中表达层级，用于按实体关联关系进行对象导航，一般根据id导航。
过深的导航容易导致 URI 膨胀，不易维护，尽量使用查询参数代替路径中的实体导航。建议不超过3个层级。

<font color=green>正例：</font>

```
/assets/1?area=2&act=3
```

<font color=#d71345>反例：</font>

```
/assets/1/area/2/act/3
```

14.<font color=#ffc20e>【推荐】</font>如果有除id外更多的参数需要提供, GET 方法请使用 URL Parameter(例如：```"?clientId=xxxxx&appId=xxxxxx"```), PUT/POST/DELETE 方法请使用请求体传递参数。

15.<font color=red>【强制】</font>URI 传递参数列表要ENCODE，特别是UNICODE字符一定要ENCODE。

16.<font color=red>【强制】</font>URI 映射应避免 /{xx}/{xx} 的使用。

<font color=#80752c>说明：</font>

类似该路径，效率低，而且不容易理解路径
例如：```/{uid}/{lable}```
建议修改为```/user/{uid}/lable/{lableId}```
修改后直接可以根据路径理解该API意义（ID为lableId的用户的标签）

# Action操作规范

1.<font color=red>【强制】</font>通过标准HTTP方法对资源CRUD。

<font color=#80752c>说明：</font>

- GET (SELECT): 从服务器取出资源（一项或多项）
- POST (CREATE): 在服务器新建一个资源
- PUT (UPDATE): 在服务器更新完整的资源（客户端提供改变后的完整资源）
- PATCH (UPDATE)：在服务器更新资源(客户端提供改变的属性)
- DELETE (DELETE): 从服务器删除资源

2.<font color=#375830>【参考】</font>正常情况下所有R(获取数据)操作都使用 GET 方法，查询内容参数使用QueryParams（仅允许在查询请求参数非常多的情况下，如参数数量大于10个，才可以使用POST）。

3.<font color=red>【强制】</font>GET 查询从服务器取资源一项必须提供资源id，多项必须是资源集合的 URI，即复数结尾。

<font color=green>正例：</font>

```
/assets/1
/assets
```

4.<font color=red>【强制】</font>情况需要(非特殊情况，尽量避免)R(获取数据)操作使用POST 方法的 URI 必须以 query （一项）或 list （多项）结尾。

<font color=green>正例：</font>

```
/assets/query [POST]
/assets/list [POST]
```

5.<font color=#ffc20e>【推荐】</font>获取单个对象应该返回整个对象，获取多个对象应该返回一些可选项属性。

6.<font color=red>【强制】</font>所有C(创建资源)操作都使用 POST 方法。C操作一般向”资源集合“型URI发起。必须传递一个资源对象(不是属性)，这样即使对象的结构发生变化，也不需要去更新方法或者对象结构，那些弃用的字段则需要标识为“只读”。

<font color=green>正例：</font>

```
/assets [POST]   // 新增资源
/zoos/1/employees [POST] //为id为1的动物园雇佣员工
```

7.<font color=red>【强制】</font>如果只支持一个完整对象的更新，U(更新资源)操作必须使用 PUT 方法。

<font color=green>正例：</font>

```
/animals/1 [PUT] // 更新id为1的动物
```

8.<font color=#ffc20e>【推荐】</font>如果只更新一个对象的部分属性，U(更新资源)操作使用 PATCH 方法。

9.<font color=red>【强制】</font>所有D(删除资源)操作都使用 DELETE 方法。

<font color=green>正例：</font>

```
/zoos/1/employees/2 [DELETE] // 删除id为1的动物园内id为2的雇员
/zoos/1/employees/2,4,5 [DELETE] // 删除id为1的动物园内id为2,4,5的雇员
/zoos/1/animals  // 删除id为1的动物园内的所有动物
```

10.<font color=red>【强制】</font>DELETE 方法没有请求体，接口上必须不能包含RequestBody。

11.<font color=#ffc20e>【推荐】</font>如果是立即删除，应该返回空对象；如果是启动一个删除操作，应该返回一个删除操作；如果只是标识某个资源是“被删除的”，应该返回一个更新后的资源；如果多个删除请求删除同一资源，那么只有第一个请求才应该成功，其他的返回404(not found)。

12.<font color=#375830>【参考】</font>各Action操作需要保证操作的安全性和幂等性。

<font color=#80752c>说明：</font>

- 安全性 ：不会改变资源状态，可以理解为只读的；
- 幂等性 ：执行1次和执行N次，对资源状态改变的效果是等价的。

| Action | 安全性 | 幂等性 |
|---|---|---|
| READ | 是 | 是 |
| CREATE | 否 | 否 |
| UPDATE | 否 | 是 |
| DELETE | 否 | 是 |

安全性和幂等性均不保证反复请求能拿到相同的响应。以 DELETE 为例，第一次 DELETE 返回 200 表示删除成功，第二次返回 404 提示资源不存在，这是允许的。

13.<font color=red>【强制】</font>自定义操作方法应该用于基本方法不能实现的功能性方法。可能需要一个任意请求并返回一个任意的响应，也可能是流媒体请求和响应。

14.<font color=red>【强制】</font>自定义方法应该使用 POST/PUT/PATCH 方法。

15.<font color=red>【强制】</font>自定义方法批量(超5个id)应该遵循以下规范。

| 自定义方法 | 方法 | URI 结尾 | 请求体 | 响应 |
|---|---|---|---|---|
| 批量多id查询 | POST | list | JSON 资源id数组，如[1,2,3,4,5,6] | JSON 资源列表数组 |
| 批量添加 | POST | batch-create | JSON 资源列表数组 | JSON 资源id数组 |
| 批量删除 | POST | batch-delete | JSON 资源id数组 | 空JSON对象, {} |
| 批量修改 | PUT | batch-update | JSON 资源列表数组 | 空JSON 资源列表数组 |
| 批量修改某属性 | PATCH | batch-update | JSON 资源列表数组 | JSON 资源列表数组 |

16.<font color=red>【强制】</font>自定义方法查询集合数量的 URI 应该以 count 结尾，返回体为JSON对象 ```{"count": ""}```。

17.<font color=red>【强制】</font>自定义方法对资源执行某一动作（比如发送消息，启用什么功能），如果是针对资源的，则 URI 以动作为动词结尾，如果是针对资源属性的，则 URI 以动作为动词结尾，属性作为参数。

<font color=green>正例：</font>

| 描述 | 动作 | HTTP Mapping | 请求体 | 响应体 |
|---|---|---|---|---|
| 对资源执行某一动作 | customVerb| /custom-verb [POST] | | |
| 取消某种操作 | cancel | /cancel [POST] | N/A | {"result": 0/1} |
| 从回收站中恢复一个资源 | undelete | /projects/1/undelete [POST] | N/A | {"result": 0/1} |
| 检查项目是否重名 | checkName | /projects/1/check?name= [POST] | N/A | {"result": 0/1} |

18.<font color=#ffc20e>【推荐】</font>比较复杂的接口不能确定是使用 POST 还是 PUT 时，要看具体的业务层代码，看看接口产生的结果是否幂等，如果幂等用 PUT，相反用 POST。

# 参数规范

1.<font color=red>【强制】</font>接口请求体和响应体接受参数格式均为JSON("application/json")。请求头为 ```Content-Type：application/json;charset=UTF-8```

2.<font color=red>【强制】</font>Query和JSON中参数中用驼峰命名。

3.<font color=#ffc20e>【推荐】</font>默认将Date的输入输出转为Long型时间戳(精确到毫秒)。

4.<font color=red>【强制】</font>对象和方法命名语义需与内部保持一致，不允许自行创造。比如不要把Member叫做Person。

5.<font color=red>【强制】</font>所有批量查询接口均需要分页。

6.<font color=#ffc20e>【推荐】</font>常见参数约定，查询可以捎带以下参数。

|描述|示例|备注|
|---|---|---|
| 过滤条件 | ?type=1&age=16 | 允许一定的 URI 冗余，如 /projects/1 与 /projects?id=1 |
| 排序 | ?sort=age&orde=asc | 指定返回结果按照哪个属性排序，以及排序顺序 |
| 投影 | ?whiteList=id,name,email | 指定返回字段 |
| 分页 | ?page=2&limit=100 | 指定第几页，以及每页的记录数 |
| 分页 | ?offset=10 | 指定返回记录的开始位置，如果NoSql可以是游标 |
| 搜索 | ?keyword=localhost | 模糊搜索 |

7.<font color=#ffc20e>【推荐】</font>经常使用的、复杂的查询可以标签化，这样可以降低维护成本。

<font color=green>正例：</font>

```
/trades?status=closed&sort=created,desc [GET]

```

快捷方式：

```
/trades#recently-closed [GET]
或者
/trades/recently-closed [GET]
```

8.<font color=red>【强制】</font>所有的接口都会上传一部分基本信息，方便后台认证和统计信息，这部分信息会在每个接口的Header里。
HEADER要求添加内容如下:

| HEADER KEY | Value | 描述 |
| :--: | :--: | :--: |
| t | ${token} | (可选)如果已经登录的接口需要传用户的Token，未登录接口不需要 |
| a | ${app} | (必填)APPID，不同应用区分不同的应用id，用以数据隔离，不许私自定义，需要申请 |
| v | ${version} | (必填)应用版本号，纯数字格式，按照排期统一规划，用以不同版本数据隔离 |
| ev | ${version} | (可选)运行应用环境版本号，纯数字格式，可用于Web页面统计原生环境版本号，一般由客户端通过url传入 |
| n | ${versionName} | (可选)应用版本名, 字符串 |
| en | ${versionName} | (可选)运行应用环境版本名, 字符串，可用于Web页面统计原生环境版本名，一般由客户端通过url传入 |
| p | ${platform} | (必填)平台，Android为 1;IOS为 2;Web为 3 |
| ep | ${platform} | (可选)运行应用环境平台，Android为 1;IOS为 2，一般由客户端通过url传入 |
| m | ${model} | (可选)设备描述信息，如MI 2，iPhone 4，Web页面一般由客户端通过url传入 |
| s | ${sdk} | (可选)系统SDK版本, Web页面一般由客户端通过url传入 |
| u | ${uuid} | (必填)设备唯一标识, Web页面一般由客户端通过url传入 |
| d | ${time} | (必填)时间戳, 请求接口当前时间戳。<font color=#80752c>说明：</font>每次请求都带上当前时间的时间戳, 服务器收到请求后对比时间差，超过一定时长（如5分钟），则认为请求失效。时间戳超时机制是防御DOS攻击的有效手段。 |
| r | ${random} | (可选)随机字符串, 每个请求生成的随机字符串。<font color=#80752c>说明：</font>每次请求都带上客户端随机字符串, 服务器收到请求后对比是否请求过, 如果以前请求过, 则认为请求失效。用以防止重放攻击。 |
| c | ${md5-check} | (可选)校验信息。<font color=#80752c>说明：</font>不同的接口可以选择不同程度的校验算法。请参考[签名算法](#签名算法)。 |
| ct | ${md5-check-type} | (可选)校验信息类型。根据不同校验类型区分，1: 明文模式，2: 参数校验模式，3: RSA签名校验模式 |
| h | ${channel} | (可选)渠道唯一标识，可用于标注某个渠道来源 |
| o | ${origin} | (可选)来源唯一标识，可用于标注某个第三方调用 |
| i | ${activity} | (可选)活动唯一标识，可用于标注某个活动 |
| Referer | ${Referer} | (可选)请求接口来自的页面 |
| User-Agent | ${User-Agent} | (可选)浏览器信息 |

**应用Id对应表**

| Code | 应用 |
| :--: | :--: |
| 0 | 后台专用 |
| 1 | 超级万学 |
| 2 | 考研高手 |
| 3 | 创世界 |
| 4 | 超级万学-创新创业 |
| 5 | 创新创业 |
| 12 | 神龙考研 |

9.<font color=#ffc20e>【推荐】</font>正常返回体应该包含HTTP请求状态码和服务器响应时间戳。结果以 result 为关键字返回。

<font color=green>正例：</font>

```json
	{
		"status": "返回成功状态码，成功即为200",
		"timestamp": "响应时间戳",
		"result": "返回的数据"
	}
```


| key | type | desc |
| :---- | :---- | :---- |
| status | int | 返回成功状态码，成功即为200 |
| timestamp | long | 响应时间戳 |
| result | Object | 返回的数据 |

10.<font color=red>【强制】</font>禁止采用前端 URI 传递的当前用户Id，必须从Header中取Token，通过Token获取当前用户Id。

# 状态码规范

1.<font color=red>【强制】</font>接口调用成功时返回HTTP状态码为2xx，返回数据结果为标准Json格式。如调用错误会返回除2xx之外的其他HTTP状态码，返回数据结果也为标准Json格式。

2.<font color=#ffc20e>【推荐】</font>随着系统发展，总有一些API失效或者迁移，对失效的API，返回404 Not Found 或 410 Gone；对迁移的API，返回 301重定向。

3.<font color=#ffc20e>【推荐】</font>服务器向用户返回的状态码和提示信息, 常见的有以下一些。

| HTTP CODE | 含义 | 方法 | 描述 |
| --- | --- | --- | --- |
| 200 | OK | [GET] | 服务器成功返回用户请求的数据, 该操作是幂等的(Idempotent)。 |
| 201 | Created，被创建 | [POST/PUT/PATCH] | 用户新建或修改数据成功。 |
| 202 | Accepted，被采纳 | [*] | 表示一个请求已经进入后台排队(异步任务)。 |
| 204 | No Content，被采纳 | [DELETE] | 用户删除数据成功。 |
| 206 | Partial Content，部分内容 | [GET] | 一般为分片下载内容 |
| 301 | Moved Permanently，永久移动 | [GET] | 请求的资源已被永久的移动到新URI，返回信息会包括新的URI，请求会自动定向到新URI。今后任何新的请求都应使用新的 URI 代替 |
| 302 | Found，找到 | [GET] | 与301类似。但资源只是临时被移动。客户端应继续使用原有 URI |
| 304 | Not Modified，未修改 | [GET] | 所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源 |
| 400 | Bad Request，错误请求 | [POST/PUT/PATCH] | 用户发出的请求有错误, 服务器没有进行新建或修改数据的操作, 该操作是幂等的。常用于参数校验。 |
| 401 | Unauthorized，未授权 | [*] | 表示用户没有权限(令牌、用户名、密码错误)。常见于未登录需要登录，如果登录后还没有权限应该返403。 |
| 403 | Forbidden，拒绝请求 | [*] | 表示用户得到授权(与401错误相对), 但是访问是被禁止的。 |
| 404 | Not Found，未找到 | [*] | 用户发出的请求针对的是不存在的记录, 服务器没有进行操作, 该操作是幂等的。 |
| 405 | Method Not Allowed，方法不允许 | [*] | 请求中的方法未找到或被禁止。 |
| 406 | Not Acceptable，不被采纳 | [GET] | 用户请求的格式不可得(比如用户请求JSON格式, 但是只有XML格式)。 |
| 409 | Conflict，资源冲突 | [PUT] | 完成 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突。 |
| 410 | Gone，资源已经不存在 | [GET] | 用户请求的资源被永久删除, 且不会再得到的。410不同于404，如果资源以前有现在被永久删除了可使用410代码。 |
| 422 | Unprocesable entity，非法对象 | [POST/PUT/PATCH] | 当创建一个对象时, 发生一个验证错误。 |
| 500 | Internal Server Error，服务器内部错误 | [*] | 服务器发生错误, 用户将无法判断发出的请求是否成功。非业务异常，一般由框架抛出。 |
| 501 | Not Implemented，未实现 | [*] | 服务器不支持请求的功能，无法完成请求。 |
| 503	| Service Unavailable，服务不可用 | [*] | 由于超载(接口被限流)或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中。 |

4.<font color=red>【强制】</font>不要发生了错误但给2xx响应，客户端可能会缓存成功的 HTTP 请求。

5.<font color=#375830>【参考】</font>正确设置 HTTP 状态码，不要自定义。

6.<font color=#375830>【参考】</font>对非业务类异常，线上可以统一文案如"服务器端错误，请稍后再试"。

# 响应规范

1.<font color=red>【强制】</font>如果状态码是4xx, 就应该向用户返回出错信息。出错信息格式如下。

```json
{
  "status":400,	
  "error": "自定义错误码",
  "msg": "错误描述",
  "timestamp": 123456,
  "exception": "报错Exception类型",
  "show":1	
}
```

| Key | Type | 描述 |
|---|---|---|
| status | Int | (可选)同 HTTP 状态码，一般为方便日志统计 |
| error | String | (必填)自定义错误码，可以通过错误码定位到具体错误，一般全系统唯一 |
| msg | String | (必填)错误具体描述 |
| timestamp | Long | (可选)服务器时间戳 |
| exception | String | (可选)报错Exception类型, 如IOException，一般不面向前端 |
| show | Int | (可选)0: 前端不需展示; 1: 前端可Toast展示; 2: 前端可对话框展示; 默认 0 |

2.<font color=red>【强制】</font>如果状态码是2xx，服务器向用户返回的结果应该将 reslut 作为键名, 返回对象作为键值。一般格式如下。

```json
{
  "status": "返回状态码",
  "timestamp": "时间戳",
  "result": "返回的对象"
}
```

| Key | Type | 描述 |
|---|---|---|
| status | Int | (可选)同 HTTP 状态码，一般为方便日志统计 |
| timestamp | Long | (可选)服务器时间戳 |
| result | Object | 返回的对象 |

2.<font color=red>【强制】</font>针对不同操作, 服务器向用户返回的结果应该符合以下规范。

| Key | Type | 描述 |
|---|---|---|
| GET | /assets | 返回资源对象的列表(数组) |
| GET | /assets/resource | 返回单个资源对象 |
| POST | /assets | 返回新生成的资源对象 |
| PUT | /assets/resource | 返回完整的资源对象 |
| PATCH | /assets/resource | 返回完整的资源对象 |
| DELETE | /assets/resource | 返回一个空对象{} |

# 签名算法

按照不同接口的功能，可以把接口安全级别分为明文模式、参数校验模式、RSA签名校验模式。

## 明文模式

明文模式，的校验信息生成规则为: 时间戳+[random_str]+[token|uuid]+[url]+app盐 取md5值。

协议中包含字段random_str，主要保证签名不可预测。推荐生成随机数算法如下：调用随机数函数生成，将得到的值转换为字符串。

```[token|uuid]```: 如果有token则传token，如果没有则传设备uuid，如果都没有则不传。

```[url]```: 为完整的接口链接。

## 参数校验模式

参数校验模式，是在明文模式基础上对RequestBody的参数进行签名，校验信息生成规则为: 时间戳+[random_str]+[token|uuid]+[url]+[请求RequestBody字典排序串]+app盐 取md5值。

设所有发送或者接收到的数据为集合M，将集合M内非空参数值的参数按照参数名ASCII码从小到大排序（字典序），使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串stringA。

特别注意以下重要规则：
 - 参数名ASCII码从小到大排序（字典序）；
 - 如果参数的值为空不参与签名；
 - 如果参数的值为对象，则默认设置为空对象```{}```；
 - 参数名区分大小写；
 - 接口可能增加字段，验证签名时必须支持增加的扩展字段；

## RSA签名校验模式

RSA签名校验模式，是在参数校验模式基础上对生成的签名信息RSA加密。此模式一般用于第三方服务器之间的高安全要求校验。原则就是RSA密钥保存是可靠安全的。




