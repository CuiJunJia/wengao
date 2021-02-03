


db.stus.find().pretty().count();

db.stus.findOne();

db.stus.update(
{name:"update崔峻嘉"},
{$set:{"age":30}}
);

/*
   指定一个实体添加一个属性
*/
db.stus.update({name:"update崔峻嘉"},{$set:{address:"山西运城"}});
db.stus.replaceOne({name:"崔一哥"},{name:"cuijunjianew"})
db.stus.update({name:"崔一哥"},{$set:{hobby:{city:["beijing","henan","shanghai"],movie:["shangwang","play compulate game"]}}})
db.stus.find({name:"崔一哥"});
db.stus.find({'hobby.movie':"play compulate game"})
db.stus.update({name:"崔一哥"},{$push:{"hobby.movie":"play basktball"}});

var arr = [];
for(var i = 1; i <= 20000; i++){
    arr.push({num:i})
}

db.numbers.insert(arr);
db.numbers.find({num:500});
db.numbers.find({num:{$gt:500}})
db.numbers.find({num:{$lt:300}})
db.numbers.find({num:{$gt:1,$lt:10}})
db.numbers.find({num:{$lte:10}})
db.numbers.find().limit(10);

db.numbers.remove({});
db.numbers.drop();

//一对一
db.WifeAndHusband.insert([
    {
        name:"huangrong",
        husband:{
            name:"guojing"
        }
    },
    {
        name:"panjinlian",
        husband:{
            name:"wudalang"
        }
    }
])

db.WifeAndHusband.find();

//一对多 多对一
db.users.insert([
{
    name:"cuijunjia"
},
{
    name:"cuidage"
}
])

db.users.find();

db.orders.insert(
{
    list:["zhurou","niurou"],
    user_id:ObjectId("5f06b02f702dbf9747f9dcb5")
}
);
db.orders.find();

var user_id = db.users.findOne({name:"cuidage"})._id;
user_id
db.orders.find({user_id:user_id})

//多对多
db.teachers.insert([
    {
        name:"cuijunjia"
    },
    {
        name:"cuidage"
    },
    {
        name:"cuierge"
    }
])

db.teachers.find();

db.students.insert([
    {
        name:"xiaoa",
        t_ids:[ObjectId("5f06b2ce702dbf9747f9dcb9"),ObjectId("5f06b2ce702dbf9747f9dcba")]
    },
    {
        name:"xiaob",
        t_ids:[ObjectId("5f06b2ce702dbf9747f9dcb9"),ObjectId("5f06b2ce702dbf9747f9dcba"),ObjectId("5f06b2ce702dbf9747f9dcbb")]
    }
])

db.teachers.find();
db.students.find()

//为员工工资低于1000的 加400
db.emp.updateMany({sal:{$lte:1000}},{$inc:{sal:400}});


