---
title: 新版本系统无法连接至全新安装的 Windows Server 2012 R2 问题修复
badge: 
  text: Outdated
  type: 'info'
tags:
  - Windows
  - Server
  - RDP
  - zh-CN
createTime: 2025/02/07 20:43:24
permalink: /article/wvn4249v/
---

::: info Outdated

本文所涉及内容可能已经过时，仅供参考，不建议在生产环境中使用。

:::

## 问题出现

今天在使用 RDP 连接到全新安装未打 Hotfix 的 Windows Server 2012 R2 时遇到了下面这个问题：

![01](/images/tutorial/winsvr_rdp_cerdssp/01.png)

后经过了解，是服务器端未安装相应的补丁（`2018-05 月度汇总`），但用户端（Windows 11 24H2）已包含此补丁的修补内容，才导致出现该问题。[^first]

![02](/images/tutorial/winsvr_rdp_cerdssp/02.png)

当然，这个问题可以通过在服务器端安装 `2018-05 月度汇总` 解决，但是有没有其他办法让新系统连接到没有打该补丁的系统呢？

## 解决方法一：修改组策略

> [!important]
>
> 家庭版的 Windows 没有 `本地组策略编辑器`，请先检查你的系统 SKU，并选择适合你的解决方法。

Step1:

按下键盘的 <kbd>Win</kbd> + <kbd>R</kbd>，输入 `gpedit.msc` 进入 `本地组策略编辑器`。

Step2:

在组策略编辑器中定位到下面的位置，并找到 `加密数据库修正` 策略：

`计算机配置 -> 管理模板 -> 系统 -> 凭据分配`

> [!tip]
> 在繁体中文版的 Windows 中，该策略名字为 `加密預示修復`，可以在下面的位置找到：
>
> `電腦設定 -> 系統管理範本 -> 系統 -> 認證委派`

![03](/images/tutorial/winsvr_rdp_cerdssp/03.png)

Step3:

双击查看该策略，将该策略启用，并将保护级别修改为 `易受攻击`。

![04](/images/tutorial/winsvr_rdp_cerdssp/04.png)

修改完成后关闭 `本地组策略编辑器`，再次尝试连接即可。

## 解决方法二：修改注册表

如果你使用的是家庭版 Windows，没有组策略编辑器，也可以通过修改注册表的方式来达到同样的效果。

Step1:

按下键盘的 <kbd>Win</kbd> + <kbd>R</kbd>，输入 `regedit` 进入 `注册表编辑器`。

Step2:

根据下面的路径，找到 `AllowEncryptionOracle` 值：

 `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\CredSSP\Parameters`

如果找不到 `CredSSP` 项及其子项，请根据上述目录手动创建。

![06](/images/tutorial/winsvr_rdp_cerdssp/06.png)

Step3:

修改 `AllowEncryptionOracle` 值为 `2`。

如果找不到该值，请在 `Parameters` 项下手动创建一个 `DWORD (32位)值`，命名为 `AllowEncryptionOracle`，并将该值设置为 `2`。

![07](/images/tutorial/winsvr_rdp_cerdssp/07.png)

修改完成后关闭 `注册表编辑器`，再次尝试连接即可。

## 解决方法三：修改服务器端设置

如果不想修改用户端设置，我们也可以修改服务器端的设置，这样做的好处是更换其他设备尝试连接时，不需要每次都修改用户端设置。但可能降低安全性（不打补丁本来也没有安全性可言）。

Step1:

在控制面板中找到 `系统`，并点击左侧的 `远程设置`。

![08](/images/tutorial/winsvr_rdp_cerdssp/08.png)

Step2:

在弹出的窗口中，找到如图所示的选项，取消该项目的勾选状态。

![09](/images/tutorial/winsvr_rdp_cerdssp/09.png)

之后再次尝试连接即可。

## 再次尝试连接

修改完成后，我们可以再次通过 RDP 连接服务器端，此时可以成功连接，问题解决：

![05](/images/tutorial/winsvr_rdp_cerdssp/05.png)

[^first]: CVE-2018-0886 的 CredSSP 更新 - Microsoft Support [link](https://support.microsoft.com/zh-hk/topic/cve-2018-0886-%E7%9A%84-credssp-%E6%9B%B4%E6%96%B0-5cbf9e5f-dc6d-744f-9e97-7ba400d6d3ea)

