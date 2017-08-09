use expertsys;


delete from userbase;
delete from contact;
delete from certificate;
delete from education;
delete from avoidplace;
delete from qualify_num;
delete from reviewfield;
delete from reviewexp;
delete from workexp;
delete from administrator;
delete from useraccount;

insert into administrator value('woziji','123456');
insert into giveexpertid value('2017',1);


insert into useraccount value('a11111','abc123','注册');
insert into useraccount value('b11111','ABC123','注册');
insert into useraccount value('c11111','abc123','注册');
insert into useraccount value('d11111','abc123','注册');

insert into userBase value('a11111','20170001','可用','2018-08-08','李晓明','男','1988-01-05','党员',
						   'a11111.jpg','教授','教授','4年以上','否','否','华南理工大学',' 熟悉整个软件架构',
                           '','');
insert into userBase value('b11111','','待审核','','黄晓明','男','1988-01-05','党员',
						   '','教授','教授','4年以上','否','否','华南理工大学',' 熟悉整个软件架构',
                           '','');
insert into userBase value('c11111','','待审核','','陈晓明','女','1988-01-05','党员',
						   '','教授','教授','4年以上','否','否','华南理工大学',' 熟悉整个软件架构',
                           '','');
insert into userBase value('d11111','','待审核','','钟晓明','男','1988-01-05','党员',
						   '','教授','教授','4年以上','否','否','华南理工大学',' 熟悉整个软件架构',
                           '','');

insert into contact value('a11111','广东省广州市','510006','lxm@163.com','13573965152','13573965152');
insert into contact value('b11111','广东省广州市','510006','hxm@163.com','13675975451','13675975451');
insert into contact value('c11111','广东省广州市','510006','cxm@163.com','13973265252','13973265252');
insert into contact value('d11111','广东省广州市','510006','zxm@163.com','13075965455','13075965455');

insert into certificate value('a11111','居民身份证','广州市番禺区公安局','372922201808080730');
insert into certificate value('b11111','居民身份证','广州市番禺区公安局','372922201808080731');
insert into certificate value('c11111','居民身份证','广州市番禺区公安局','372922201808080732');
insert into certificate value('d11111','居民身份证','广州市番禺区公安局','372922201808080733');

insert into education value('a11111','博士研究生','博士','5145231','华工软件工程');
insert into education value('b11111','博士研究生','博士','5145232','华工软件工程');
insert into education value('c11111','博士研究生','博士','5145233','华工软件工程');
insert into education value('d11111','博士研究生','博士','5145234','华工软件工程');

insert into qualify_num value('a11111','大学教师资格证书','424646484684');
insert into qualify_num value('b11111','大学教师资格证书','424646484685');
insert into qualify_num value('c11111','大学教师资格证书','424646484686');
insert into qualify_num value('d11111','大学教师资格证书','4246464846847');

insert into reviewfield value('a11111','高职教育评估');
insert into reviewfield value('a11111','高校教育评估');
insert into reviewfield value('b11111','高职教育评估');
insert into reviewfield value('c11111','高职教育评估');
insert into reviewfield value('d11111','高职教育评估');

insert into reviewexp value('a11111','2015-01-01','2015年广东省高职评估','2015年广东省高职评估','评估');
insert into reviewexp value('a11111','2016-01-01','2016年广东省高职评估','2016年广东省高职评估','评估');
insert into reviewexp value('b11111','2015-01-01','2015年广东省高职评估','2015年广东省高职评估','评估');
insert into reviewexp value('b11111','2016-01-01','2016年广东省高职评估','2016年广东省高职评估','评估');
insert into reviewexp value('c11111','2015-01-01','2015年广东省高职评估','2015年广东省高职评估','评估');
insert into reviewexp value('c11111','2016-01-01','2016年广东省高职评估','2016年广东省高职评估','评估');
insert into reviewexp value('d11111','2015-01-01','2015年广东省高职评估','2015年广东省高职评估','评估');
insert into reviewexp value('d11111','2016-01-01','2016年广东省高职评估','2016年广东省高职评估','评估');