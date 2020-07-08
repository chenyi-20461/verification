# sharding-springboot-mybatis

#### 介绍
sharding-springboot-mybatis

分库分表，两个库：test_order0和test_order1,每个库里面三张表:t_address/t_user0/t_user1

雪花算法根据主键id取模hash；库分片算法：id%2；表分片算法：id/2%2;

包含inline配置算法和自定义class方式算法demo。

作者：2356899074@qq.com
