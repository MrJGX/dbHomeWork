use expertsys;


drop table if exists userBase;
drop table if exists contact;
drop table if exists certificate;
drop table if exists education;
drop table if exists qualify_num;
drop table if exists reviewField;
drop table if exists reviewExp;
drop table if exists workExp;
drop table if exists avoidPlace;
drop table if exists administrator;
drop table if exists userAccount;
drop table if exists giveExpertID;



create table giveExpertID(
	preID	varchar(4),
    postMaxID  int(4),
    primary key(preID,postMaxID)
);


create table userAccount(
	
    username    varchar(20) binary ,
	password	varchar(20) binary not null,
    inStoreType varchar(6),
    
    primary key(username)
    
);



create table userBase(
	username		 varchar(20) binary ,
    
    expertID 		 varchar(20) binary,
    state			 varchar(6)
		check(state in('����','��д��','�����','ʧЧ','�Ѳ���','����ֹ')),
    validTime	     varchar(10),
    
    name 	 		 varchar(20),
    gender			 varchar(4)
		check(gender in ('��','Ů')),
	birthday 		 varchar(10),
    politics		 varchar(20),
    picLocation 	 varchar(40),#���˻���Ϊǰ׺
    workTitle		 varchar(10),
    workDuty		 varchar(10),
    workDuration	 varchar(10),
    ifRetire		 varchar(4)
		check(ifRetire in ('��','��')),
	ifPartTime		 varchar(4)
		check(ifPartTime in ('��','��')),
	workplace		 varchar(100),
    speciality 		 varchar(600),
    performance 	 varchar(600),
    other			 varchar(600),
    
    primary key(username),
    foreign key(username) references userAccount(username) on delete cascade
);


create table contact(
	username    varchar(20) binary ,
	address 	varchar(100),
    zipCode		varchar(10),
    email		varchar(30),
    mobilePhone	varchar(15),
    homePhone	varchar(15),
    
    primary key(username,address,zipCode,email,mobilePhone,homePhone),
    foreign key(username) references userAccount(username) on delete cascade
);


create table certificate(
	username    varchar(20) binary ,
    Ctype		varchar(20)
		check(type in ('�������֤','�۰�ͨ��֤','���񻧿ڲ�')),
    issue		varchar(20),
    CID			varchar(30),
    
    primary key(CID,username),
    foreign key(username) references userAccount(username) on delete cascade
);


create table education(
	
    username   	    varchar(20) binary ,
    educationBack	varchar(15),
		check(educationBack in ('Сѧ','����','����',
        '��ר','��ѧ','˶ʿ�о���','��ʿ�о���')),
	degree			varchar(15)
		check(degree in('ѧʿ','˶ʿ','��ʿ')),
	
    EID  		    varchar(20),
    schoolMajor		varchar(40),
    
    primary key(EID,username),
	foreign key(username) references userAccount(username) on delete cascade
        
);


create table qualify_num(
	username	varchar(20) binary ,
    qualify		varchar(40),
    num			varchar(20),
    
    primary key(username,qualify,num),
    foreign key(username) references userAccount(username) on delete cascade
);


create table reviewField(
	username	varchar(20) binary ,
    field		varchar(15),
    
    primary key(username,field),
    foreign key(username) references userAccount(username) on delete cascade
);


create table reviewExp(
	username	varchar(20) binary ,
    reviewDate	varchar(10),
    reviewName	varchar(40),
    description	varchar(40),
    reviewType  varchar(6)
		check (reviewType in ('����','����')),
    
	primary key(username,reviewDate,reviewName,description),
    
    foreign key(username) references userAccount(username) on delete cascade
);

create table workExp(
	username	varchar(20) binary ,
    startDate	varchar(10),
    endDate		varchar(10),
    expPlace	varchar(100),
    expDuty		varchar(20),
    certifier	varchar(20),
    
    primary key(username,startDate,endDate,expPlace,expDuty,certifier),
    foreign key(username) references userAccount(username) on delete cascade
);

create table avoidPlace(
	username	varchar(20) binary ,
    avoidName	varchar(40),
    ifworkplace	varchar(4)
		check(ifworkplace in('��','��')),
        
    primary key(username,avoidName),    
    foreign key(username) references userAccount(username) on delete cascade
);




create table administrator (
	username	varchar(20) binary ,
    password 	varchar(20)binary not null,
    
    primary key(username)

);