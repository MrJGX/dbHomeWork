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


insert into useraccount value('a11111','abc123','ע��');
insert into useraccount value('b11111','ABC123','ע��');
insert into useraccount value('c11111','abc123','ע��');
insert into useraccount value('d11111','abc123','ע��');

insert into userBase value('a11111','20170001','����','2018-08-08','������','��','1988-01-05','��Ա',
						   'a11111.jpg','����','����','4������','��','��','��������ѧ',' ��Ϥ��������ܹ�',
                           '','');
insert into userBase value('b11111','','�����','','������','��','1988-01-05','��Ա',
						   '','����','����','4������','��','��','��������ѧ',' ��Ϥ��������ܹ�',
                           '','');
insert into userBase value('c11111','','�����','','������','Ů','1988-01-05','��Ա',
						   '','����','����','4������','��','��','��������ѧ',' ��Ϥ��������ܹ�',
                           '','');
insert into userBase value('d11111','','�����','','������','��','1988-01-05','��Ա',
						   '','����','����','4������','��','��','��������ѧ',' ��Ϥ��������ܹ�',
                           '','');

insert into contact value('a11111','�㶫ʡ������','510006','lxm@163.com','13573965152','13573965152');
insert into contact value('b11111','�㶫ʡ������','510006','hxm@163.com','13675975451','13675975451');
insert into contact value('c11111','�㶫ʡ������','510006','cxm@163.com','13973265252','13973265252');
insert into contact value('d11111','�㶫ʡ������','510006','zxm@163.com','13075965455','13075965455');

insert into certificate value('a11111','�������֤','�����з�خ��������','372922201808080730');
insert into certificate value('b11111','�������֤','�����з�خ��������','372922201808080731');
insert into certificate value('c11111','�������֤','�����з�خ��������','372922201808080732');
insert into certificate value('d11111','�������֤','�����з�خ��������','372922201808080733');

insert into education value('a11111','��ʿ�о���','��ʿ','5145231','�����������');
insert into education value('b11111','��ʿ�о���','��ʿ','5145232','�����������');
insert into education value('c11111','��ʿ�о���','��ʿ','5145233','�����������');
insert into education value('d11111','��ʿ�о���','��ʿ','5145234','�����������');

insert into qualify_num value('a11111','��ѧ��ʦ�ʸ�֤��','424646484684');
insert into qualify_num value('b11111','��ѧ��ʦ�ʸ�֤��','424646484685');
insert into qualify_num value('c11111','��ѧ��ʦ�ʸ�֤��','424646484686');
insert into qualify_num value('d11111','��ѧ��ʦ�ʸ�֤��','4246464846847');

insert into reviewfield value('a11111','��ְ��������');
insert into reviewfield value('a11111','��У��������');
insert into reviewfield value('b11111','��ְ��������');
insert into reviewfield value('c11111','��ְ��������');
insert into reviewfield value('d11111','��ְ��������');

insert into reviewexp value('a11111','2015-01-01','2015��㶫ʡ��ְ����','2015��㶫ʡ��ְ����','����');
insert into reviewexp value('a11111','2016-01-01','2016��㶫ʡ��ְ����','2016��㶫ʡ��ְ����','����');
insert into reviewexp value('b11111','2015-01-01','2015��㶫ʡ��ְ����','2015��㶫ʡ��ְ����','����');
insert into reviewexp value('b11111','2016-01-01','2016��㶫ʡ��ְ����','2016��㶫ʡ��ְ����','����');
insert into reviewexp value('c11111','2015-01-01','2015��㶫ʡ��ְ����','2015��㶫ʡ��ְ����','����');
insert into reviewexp value('c11111','2016-01-01','2016��㶫ʡ��ְ����','2016��㶫ʡ��ְ����','����');
insert into reviewexp value('d11111','2015-01-01','2015��㶫ʡ��ְ����','2015��㶫ʡ��ְ����','����');
insert into reviewexp value('d11111','2016-01-01','2016��㶫ʡ��ְ����','2016��㶫ʡ��ְ����','����');