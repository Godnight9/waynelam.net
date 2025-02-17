---
title: 透过 TSforge 方案激活 Windows Embedded 8 Standard
tags:
  - Windows
  - Embedded
  - Activate
  - zh-CN
createTime: 2025/02/17 23:08:54
permalink: /article/j0zgus80/
---

::: info Attention

本文所涉及内容包含系统激活相关内容，请注意潜在的法律风险。

:::

## 引言

2 月 14 日，Massgrave 团队更新了 MAS 3.0 并引入了一种全新的激活方案 TSforge，该方案将伪造数据（全零 CID）写入系统储存区，欺骗 SPP 已经安装了正确的 Key 和 CID，从而达到激活目的。该方案在发生硬件改动后仍可以保持激活状态，但重新安装系统后将恢复未激活。该方案更适合低版本 Windows 的激活。

理论上，该方法适用于所有支持电话激活，并由系统 SPP 管理的产品，详细的支持列表如下：

> Windows 7 and later
>
> Windows Server 2008 R2 and later
>
> Office 2013 and later (requires Windows 8 or later)
>
> Windows addons (ESU, APPXLOB, etc.)
>
> Windows and Office KMS Hosts (CSVLK)

WE8S 由于取消了 WES7 所采用的静态激活方案，并且 Microsoft 未提供该系统的 GVLK，因此激活较为困难。此方案的出现，将使得 WE8S 的激活不再有难度。下面，我将全新安装一个 WE8S，并尝试激活。

## 安装 WE8S

本文将使用 Image Builder Wizard（IBW）安装 WE8S，IBW 可以在下面的链接中下载：

[Download from Official Microsoft Download Center](https://www.microsoft.com/en-US/download/details.aspx?id=37019)

IBW 分为 64 位元和 32 位元两个版本，分别为 3 个压缩分卷和 2 个压缩分卷。我们选择自己的需要的版本，下载下面的文件：

::: tabs
@tab 64 位元

```files
Standard_8_64Bit_Bootable_IBW.part1.exe
Standard_8_64Bit_Bootable_IBW.part2.rar
Standard_8_64Bit_Bootable_IBW.part3.rar
```

@tab 32 位元
```files
Standard_8_32Bit_Bootable_IBW.part1.exe
Standard_8_32Bit_Bootable_IBW.part2.rar
```
:::

全部下载完成后，解压下载得到的压缩分卷，得到一个 ISO 格式的光盘映像。从该光盘映像引导，即可进入 PE 环境下的 IBW，如下图所示，我们将在此环境下进行安装。

![01](/images/tutorial/tsforge_activate_we8s/01.png)

进入 IBW 后，点击 Install now，并根据提示输入 Key，此处输入 180 天试用 Key 即可。

![02](/images/tutorial/tsforge_activate_we8s/02.png)

同意 EULA 后来到如下界面，可以选择自带的 Retail 或 ThinClient 模板，也可以自定义组件，此处为了方便，选择 Retail 模板。

![03](/images/tutorial/tsforge_activate_we8s/03.png)

从官方页面下载的 IBW 内置了多国语言包，其中包括简繁中文，可以在下图的界面选择要安装的语言。

![04](/images/tutorial/tsforge_activate_we8s/04.png)

之后选择磁盘开始安装即可，经过重启后等待片刻将进入 OOBE。此处如果使用的是试用 Key 将出现下图的提示，不必理会，继续完成 OOBE 即可。

![WES8-2025-02-17-17-39-47](/images/tutorial/tsforge_activate_we8s/05.png)

完成 OOBE 后将进入 Start 屏幕，此时系统已经安装完成。

![05](/images/tutorial/tsforge_activate_we8s/06.png)

## 激活 WE8S

:::important

在激活前请确保网络畅通，本文将通过在线加载 MAS 脚本的方式激活系统。

:::

进入桌面后，按下 <kbd>Win</kbd> + <kbd>X</kbd> 打开快捷菜单，打开命令提示符（管理员）。

![WES8-2025-02-17-17-44-37](/images/tutorial/tsforge_activate_we8s/07.png)

输入 `powershell` 进入 PowerShell 环境后，输入下面的命令加载 MAS 脚本：

```powershell
irm https://get.activated.win | iex
```

![07](/images/tutorial/tsforge_activate_we8s/08.png)

等候片刻，直到出现下面所示的界面，证明已经成功加载。

![08](/images/tutorial/tsforge_activate_we8s/09.png)

依次按下键盘的 <kbd>3</kbd> 和 <kbd>1</kbd>，应当出现下图所示的界面：

![09](/images/tutorial/tsforge_activate_we8s/10.png)

继续等待，直到界面变为下图所示的界面。

![10](/images/tutorial/tsforge_activate_we8s/11.png)

此时激活进程已经结束，可以关闭该窗口。可以通过在命令提示符或 PowerShell 中输入下面的命令来验证是否成功激活：

```cmd
slmgr -xpr
```

如果成功激活，弹窗内容应如下图所示。

![11](/images/tutorial/tsforge_activate_we8s/12.png)

桌面右下角的水印将在重启后消失，查看系统信息，也为激活状态。WE8S 至此已经成功激活。

![12](/images/tutorial/tsforge_activate_we8s/13.png)
