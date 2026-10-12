---
title: Mac mini通过Ethernet链接时无法AirPlay到HomePod mini
description: Mac mini通过Ethernet链接时无法AirPlay到HomePod mini
pubDate: 2026-10-12T09:00:00
---
最近我的M6 Mac mini到货了，但是发现如果无法AirPlay到我的HomePod mini上。

系统版本macOS27.0.1
## 具体表现为

- 无论何种情况都能在Control Center中发现我的两个HomePod mini以及其他AirPlay设备。
- 只通过Wi-Fi链接到家里的局域网时，一切正常。
- 只通过Ethernet链接到家里的局域网时，可以选择HomePod mini作为播放源，但是只要开始播放内容，HomePod mini顶部白光亮起，但是没有声音。三秒后切回Mac mini自己的扬声器进行播放。
- 同时通过Wi-Fi和Ethernet链接到家里的局域网时，和只通过Ethernet链接到家里的局域网时表现相同。

## 通过查找

> https://www.reddit.com/r/mac/comments/1wtojub/mac_mini_ethernet_airplay_homepod_mini/

> https://www.reddit.com/r/MacOS/comments/10kbh2r/macos_airplay_to_homepods_over_ethernet/

均为相同案例。

![截屏2026-10-12 10.53.16](/images/截屏2026-10-12 10.53.16.png) ![截屏2026-10-12 10.53.27](/images/截屏2026-10-12 10.53.27.png) ![截屏2026-10-12 10.54.03](/images/截屏2026-10-12 10.54.03.png) ![截屏2026-10-12 10.54.07 1](/images/截屏2026-10-12 10.54.07 1.png) ![截屏2026-10-12 11.01.00 1](/images/截屏2026-10-12 11.01.00 1.png)

4年都没解决吗，Apple！

而且更为抽象的是貌似只在1Gbps及以上的Ethernet端口会出现问题，然而这一代的M6 Mac mini标配2.5Gbps……

高贵的Apple 印度工程师测试开发用的都是带扬声器的Studio DisPlay是把。

无论如何，我会持续跟进这个问题看会不会解决，现在貌似只能祈祷AI神力了。